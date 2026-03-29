import mongoose from "mongoose";
import isEmail from 'validator/lib/isEmail.js';
import isURL from 'validator/lib/isURL.js';






const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (avatar) => isURL(avatar),
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => isEmail(email),
      message: "Wrong email format",
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});



module.exports = mongoose.model("user", userSchema);
