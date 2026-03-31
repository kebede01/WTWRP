import mongoose from "mongoose";
import validator from "validator";

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    enum: ["warm", "hot", "cold"],
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(image) {
        return validator.isURL(image);
      },
      message: "You must enter a valid URL",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    default: [],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
export default mongoose.model("clothingItem", clothingItemSchema);
