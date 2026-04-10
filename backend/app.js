import "dotenv/config"; // This MUST be the first import
import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"; // <--- Add this line!
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { errors } from "celebrate";
import indexRouter from "./routes/index.js";
import { createUser, login } from "./controllers/users.js";
import errorHandler from "./middleware/error-handler.js";
import { logout } from "./controllers/users.js";
import { limiter, authLimiter } from "./utils/rateLimit.js";
import { validateUserSignUp, validateUserSignIn } from "./middleware/validation.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { PORT = 4000, MONGO_URI } = process.env;

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = [
  "http://localhost:3000",
  "https://wtwrp-monolith-app.uc.r.appspot.com" // Add your actual GAE URL here
];

app.use(
  cors({
    origin: isProduction ? allowedOrigins : "http://localhost:3000",
    credentials: true,
  }),
);

// Use path.join with .. to go from /backend up to the root /WTWRP
const rootPath = path.join(__dirname, '..');
// 1. Keep this if you have a separate backend public folder for images
app.use(express.static(path.join(__dirname, "public"))); 

// 2. ADD THIS for the frontend (the modules Vite built)
// This assumes 'dist' is one level up from your 'backend' folder
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// Add this line specifically for Google Cloud/App Engine
app.set('trust proxy', 1);
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
app.use(requestLogger);
app.post("/api/signup", authLimiter, validateUserSignUp, createUser);
app.post("/api/login", authLimiter, validateUserSignIn, login);
app.post("/api/logout", logout);
app.use("/api", indexRouter); 

// --- PRODUCTION FRONTEND SERVING ---
if (isProduction) {
 const distPath = path.resolve(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  
//   // This must be the LAST route
// app.get(/^(?!\/api).+/, (req, res) => {
//   res.sendFile(path.join(__dirname, '../dist/index.html'));
// });
  
  if (process.env.NODE_ENV === 'production') {
  app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(rootPath, 'dist', 'index.html'));
  });
}
}
app.use(errorLogger); // enabling the error logger
app.use(errors());

app.use(errorHandler); 
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  });
}


export default app;