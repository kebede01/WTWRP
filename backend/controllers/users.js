import User from "../models/user.js";
export const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  if (!email || !password) {
return res.status(400).send({ error: "Email and password are required" });
  }

  User.create({
    name,
    avatar,
    email,
    password,
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
      }
        else if (err.name === "syntaxError") {
      return res.status(400).send({
      error: "Invalid JSON syntax. Please check your quotes and commas.",
      });
      }
      else if (err.code === 11000) {
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
  User.findOne({ email })
    .select("+password").orFail()
    .then((user) => {
      console.log("Found User Object:", user);
      if (!user) {
        return res.status(401).send({
          error: "Invalid email or password!",
        });
      } else if (user.password !== password) {
        return res.status(401).send({
          error: "Invalid email or password!",
        });
      }
      
      else {
        const userObject = user.toObject();
        delete userObject.password;
        return res.status(200).send({
          data: userObject,
        });
      }
    })
    .catch((err) => {
      console.error(err);
          if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid user ID format.",
        });
          }
            else if (err.name === "syntaxError") {
      return res.status(400).send({
      error: "Invalid JSON syntax. Please check your quotes and commas.",
      });
    }
          else if (err.name === "ValidationError") {
            return res.status(400).send({
              error: "Invalid data provided for update.",
            });
          } else {
            return res.status(500).send({
        error: "An error occurred while processing your request.",
      });}
     
    });
};
 
export const getAllUsers = (req, res) => {
  User.find({}).orFail().then((users) => {
  
    res.status(200).send({
      data: users,
    });
  }).catch((err) => {
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
  }
  );
};

export const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId).orFail().then((user) => {
    res.status(200).send({
      data: user,
    });
  }).catch((err) => {
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
  User.findByIdAndUpdate(userId, { name, avatar }, { returnDocument: 'after', runValidators: true }).orFail()
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
      }
        else if (err.name === "syntaxError") {
      return res.status(400).send({
      error: "Invalid JSON syntax. Please check your quotes and commas.",
      });
    }
      else if (err.name === "ValidationError") {
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
  User.findByIdAndDelete(userId).orFail()
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
      }
      else if (err.name === "syntaxError") {
        return res.status(400).send({
          error: "Invalid JSON syntax. Please check your quotes and commas.",
        });
      }
      else if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid user ID format.",
        });
      } else {
        res.status(500).send({
          error: "An error occurred while deleting the user.",
        });
      }
      
    });
}