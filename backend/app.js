import "dotenv/config"; // Loads variables from .env into process.env
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; // <--- Add this line!
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import indexRouter from "./routes/index.js";
import { createUser, login } from "./controllers/users.js";
import auth from "./middleware/auth.js";
import { logout } from "./controllers/users.js";
import { limiter, authLimiter } from "./utils/rateLimit.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { PORT = 4000, MONGO_URI } = process.env;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.static(path.join(__dirname, "public"))); //Now images don't count toward the 100-request limit
app.use(limiter); // Apply the rate limiter middleware to all routes below this line
app.use(express.json());
app.use(cookieParser());

(async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();

app.post("/signup", authLimiter, createUser);
app.post("/login", authLimiter, login);
app.post("/logout", logout);
app.use("/", indexRouter); // Use the index router for all routes starting with "/"

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
});
