import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} from "../utils/errors.js";
const { NODE_ENV, JWT_SECRET } = process.env;
export const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required."));
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  if (!passwordRegex.test(password)) {
    return next(
      new BadRequestError(
        "Password must be at least 12 characters, include uppercase, lowercase, a number, and a special character.",
      ),
    );
  }
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      // Convert to plain object and delete password
      const userObject = user.toObject();
      delete userObject.password;

      return res.status(201).send({
        data: userObject,
      });
    })
    .catch((err) => {
      // 3. Handle MongoDB Duplicate Key Error (Code 11000)
      if (err.code === 11000) {
        return next(
          new ConflictError("A user with that email already exists."),
        );
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data provided."));
      }
      return next(err);
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required."));
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
        { expiresIn: "7d" },
      );

      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: "Lax",
        secure: NODE_ENV === "production",
      });

      return res.status(200).send({ message: "Login successful" });
    })
    .catch((err) => {
      if (err.name === "AuthError") {
        return next(new UnauthorizedError("Incorrect email or password"));
      }
      if (err.name === "CastError" || err.name === "ValidationError") {
        return next(new BadRequestError("Invalid login data provided."));
      }
      return next(err);
    });
};

export const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "Lax",
    secure: NODE_ENV === "production",
  });
  res.status(200).send({ message: "Logout successful" });
};

export const getCurrentUser = (req, res, next) => {
  const { _id } = req.user; // we get the userId from the auth middleware
  User.findById(_id)
    .orFail(() => new NotFoundError("User not found."))
    .then((user) => {
      res.status(200).send({
        data: user,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format."));
      }
      return next(err);
    });
};

export const updateProfile = (req, res, next) => {
  const { _id } = req.user; // we get the userId from the auth middleware
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { returnDocument: "after", runValidators: true },
  )
    .orFail(() => new NotFoundError("User not found."))
    .then((updatedUser) => {
      res.status(200).send({
        data: updatedUser,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format."));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided for update."));
      }
      return next(err);
    });
};
