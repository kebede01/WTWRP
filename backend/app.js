import fs from 'fs'; // Add this import at the top of app.js
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { errors } from "celebrate";
import indexRouter from "./routes/index.js";
import { createUser, login, logout } from "./controllers/users.js";
import errorHandler from "./middleware/error-handler.js";
import { limiter, authLimiter } from "./utils/rateLimit.js";
import { validateUserSignUp, validateUserSignIn } from "./middleware/validation.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const { PORT = 8080, MONGO_URI } = process.env;
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Define distPath clearly: go up one level from /backend to reach /dist
const distPath = path.resolve(__dirname, '..', 'dist');

// --- 1. SETTINGS & MIDDLEWARE ---
app.set('trust proxy', 1);

const allowedOrigins = [
  "http://localhost:3000",
  "https://wtwrp-monolith-app.uc.r.appspot.com"
];

app.use(cors({
  origin: isProduction ? allowedOrigins : "http://localhost:3000",
  credentials: true,
}));

app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);


app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});
// --- 2. API ROUTES (Handle these before static files) ---
app.post("/api/signup", authLimiter, validateUserSignUp, createUser);
app.post("/api/login", authLimiter, validateUserSignIn, login);
app.post("/api/logout", logout);
app.use("/api", indexRouter);

// --- 3. PRODUCTION FRONTEND SERVING ---
if (isProduction) {
  // 1. Log the path once when the server starts so we can see it in logs
  console.log('Dist folder is at:', distPath);

  // 2. THE VIDEO ROUTE (No try/catch, just direct streaming)
 app.get('/modal-css-part2.mp4', (req, res) => {
    const videoPath = path.resolve(distPath, 'modal-css-part2.mp4');
    
    // Check if file exists first
    if (!fs.existsSync(videoPath)) {
      console.error("Video file physically missing at:", videoPath);
      return res.status(404).send("Video not found");
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    // If the browser supports partial content (ranges)
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // If no range, stream the whole thing in chunks
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });

  // 3. STATIC ASSETS
  app.use(express.static(distPath));

  // 4. SPA CATCH-ALL
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// --- 4. DB & ERROR HANDLING ---
(async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
  });
}

export default app;