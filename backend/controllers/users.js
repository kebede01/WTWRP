import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { NODE_ENV, JWT_SECRET } = process.env;
export const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
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

      res.status(201).send({
        data: userObject,
      });
    })

    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({
          error: "Invalid user data provided.",
        });
      } else if (err.name === "syntaxError") {
        return res.status(400).send({
          error: "Invalid JSON syntax. Please check your quotes and commas.",
        });
      } else if (err.code === 11000) {
        return res.status(409).send({
          error: "A user with that email already exists.",
        });
      } else {
        return res.status(500).send({
          error: "An error occurred while creating the user.",
        });
      }
    });
};

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      error: "Email and password are required!",
    });
  }
  User.findUserByCredentials(email, password)
    .then((user) => {
     
      if (!user) {
        return res.status(401).send({
          error: "Invalid email or password!",
        });
      }
      // we're creating a token
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "super-strong-secret",
        { expiresIn: "7d" } // 1 hour is short for a cookie; 7d is more common
      );
      // Set the Cookie
      res.cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7, // 7 days in milliseconds
        httpOnly: true,           // Security: JavaScript cannot read this cookie
        sameSite: "Lax",          // Security: CSRF protection
        secure: NODE_ENV === "production", // Security: Only send over HTTPS in prod
      });
      // Send a success message (No token in the body!)
      return res.status(200).send({ message: "Login successful" });
    })
     .catch((err) => {
      console.error(err);
      if (err.message.includes("Incorrect email or password")) {
        return res.status(401).send({ error: err.message });
      }
      if (err.name === "ValidationError") {
        return res.status(400).send({
          error: "Invalid data provided for login.",
        });
      }
      res.status(500).send({ error: "An error occurred during login." });
    });
};

export const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,   
    sameSite: "Lax",
    secure: NODE_ENV === "production",
  });
  res.status(200).send({ message: "Logout successful" });
}
export const getAllUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => {
      res.status(200).send({
        data: users,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          error: "No users found.",
        });
      } else {
        res.status(500).send({
          error: "An error occurred while fetching users.",
        });
      }
    });
};

export const getCurrentUser = (req, res) => {
  const { _id} = req.user; // we get the userId from the auth middleware
  User.findById(_id)
    .orFail()
    .then((user) => {
      res.status(200).send({
        data: user,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          error: "User not found.",
        });
      } else if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid user ID format.",
        });
      } else {
        res.status(500).send({
          error: "An error occurred while fetching the user.",
        });
      }
    });
};

export const updateProfile = (req, res) => {
  const { _id} = req.user; // we get the userId from the auth middleware
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { returnDocument: "after", runValidators: true },
  )
    .orFail()
    .then((updatedUser) => {
      res.status(200).send({
        data: updatedUser,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          error: "User not found.",
        });
      } else if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid user ID format.",
        });
      } else if (err.name === "syntaxError") {
        return res.status(400).send({
          error: "Invalid JSON syntax. Please check your quotes and commas.",
        });
      } else if (err.name === "ValidationError") {
        return res.status(400).send({
          error: "Invalid data provided for update.",
        });
      } else {
        res.status(500).send({
          error: "An error occurred while updating the user.",
        });
      }
    });
};

export const deleteProfile = (req, res) => {
  const { _id } = req.user; // we get the userId from the auth middleware
  User.findByIdAndDelete(_id)
    .orFail()
    .then(() => {
      res.status(200).send({
        message: "User profile deleted successfully.",
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          error: "User not found.",
        });
      } else if (err.name === "syntaxError") {
        return res.status(400).send({
          error: "Invalid JSON syntax. Please check your quotes and commas.",
        });
      } else if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid user ID format.",
        });
      } else {
        res.status(500).send({
          error: "An error occurred while deleting the user.",
        });
      }
    });
};
