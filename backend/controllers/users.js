import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { SECRET_KEY } = process.env;
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
      return res.status(200).send({
        data: jwt.sign(
          { _id: user._id },
          SECRET_KEY,
          { expiresIn: 3600 }, // this token will expire an hour after creation
        ),
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return res.status(401).send({ error: err.message });
      }
      res.status(500).send({ error: "An error occurred during login." });
    });
};

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

export const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
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
  const { userId } = req.params;
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    userId,
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
  const { userId } = req.params;
  User.findByIdAndDelete(userId)
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
