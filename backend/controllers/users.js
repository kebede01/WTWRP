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
    .select("+password")
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
      } else {
        const userObject = user.toObject();
        delete userObject.password;
        return res.status(200).send({
          data: userObject,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({
        error: "An error occurred while processing your request.",
      });
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
 res.send({ message: "Hello, GET USER PROFILE World!" });
};
 
export const updateProfile = (req, res) => {
  res.send({ message: "Hello, UPDATE PROFILE World!" });
 }