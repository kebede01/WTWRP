import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import isURL from "validator/lib/isURL.js";

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
    minlength: 12,
  },
});

//Custom method added to the user schema statics propertyto compare a given password with the stored hashed password
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        const error = new Error("Incorrect email or password");
        error.name = "AuthError"; 
        return Promise.reject(error);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Incorrect email or password");
          error.name = "AuthError"; 
          return Promise.reject(error);
        }
        return user; // now user is available
      });
    });
};

export default mongoose.model("user", userSchema);
