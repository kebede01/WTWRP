import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
  ServerError,
} from "../utils/errors.js";
const { NODE_ENV, JWT_SECRET } = process.env;
export const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    const error = new BadRequestError("Email and password are required.");
    return res.status(error.statusCode).send({
      message: error.message,
    });
  }
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({ message: "Password does not meet security requirements." });
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
      console.error(err);
      let error = err;
      if (!(err instanceof ApiError)) {
        // 3. Handle MongoDB Duplicate Key Error (Code 11000)
        if (err.code === 11000) {
          error = new ConflictError("A user with that email already exists.");
        } else if (err.name === "ValidationError") {
          // Check if the password specifically caused the validation error
          if (err.errors.password) {
            error = new BadRequestError(
              "Password does not meet security requirements.",
            );
          } else {
            // Fallback for other validation errors (like invalid email or name)
            error = new BadRequestError("Invalid user data provided.");
          }
        } else {
          error = new ServerError(
            err.message || "An unexpected error occurred.",
          );
        }
      }
      return res.status(error.statusCode).send({
        message: error.message,
      });
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new BadRequestError("Email and password are required.");
    return res.status(error.statusCode).send({ message: error.message });
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
      console.error(err);
      let error = err;
      if (!(err instanceof ApiError)) {
        if (err.name === "DocumentNotFoundError") {
          error = new UnauthorizedError("Incorrect email or password");
        } else if (err.name === "CastError" || err.name === "ValidationError") {
          error = new BadRequestError("Invalid login data provided.");
        } else {
          error = new ServerError(
            err.message || "An unexpected error occurred.",
          );
        }
      }

      return res.status(error.statusCode).send({ message: error.message });
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

export const getCurrentUser = (req, res) => {
  const { _id } = req.user; // we get the userId from the auth middleware
  User.findById(_id)
    .orFail(new NotFoundError("User not found."))
    .then((user) => {
      res.status(200).send({
        data: user,
      });
    })
    .catch((err) => {
      console.error(err);
      let error = err;
      // This catches the NotFoundError you passed into .orFail()
      if (!(err instanceof ApiError)) {
        if (err.name === "CastError") {
          error = new BadRequestError("Invalid user ID format.");
        } else {
          error = new ServerError(
            err.message || "An unexpected error occurred.",
          );
        }
      }

      return res.status(error.statusCode).send({
        message: error.message,
      });
    });
};

export const updateProfile = (req, res) => {
  const { _id } = req.user; // we get the userId from the auth middleware
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { returnDocument: "after", runValidators: true },
  )
    .orFail(new NotFoundError("User not found."))
    .then((updatedUser) => {
      res.status(200).send({
        data: updatedUser,
      });
    })
    .catch((err) => {
      console.error(err);
      let error = err;
      if (!(err instanceof ApiError)) {
        if (err.name === "CastError") {
          error = new BadRequestError("Invalid user ID format.");
        } else if (err.name === "ValidationError") {
          error = new BadRequestError("Invalid data provided for update.");
        } else {
          error = new ServerError(
            err.message || "An unexpected error occurred.",
          );
        }
      }

      return res.status(error.statusCode).send({
        message: error.message,
      });
    });
};
