import 'dotenv/config'; // Loads variables from .env into process.env
import express from 'express';
import cors from 'cors';
import path from 'path'; // <--- Add this line!
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import  indexRouter  from "./routes/index.js";
import { createUser, login } from "./controllers/users.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { PORT = 4000, MONGO_URI } = process.env;

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

(async () => { 
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
})();

app.use((req, res, next) => {
  req.user = {
    _id: "99cbfb4a305b3bcadddd3090" // Your hardcoded ID
  };
  next(); // This is crucial! It passes the request to the next function.
});; // Temporary hardcoded user ID for testing
app.post("/signup", createUser);
app.post("/login", login);
app.use("/", indexRouter); // Use the index router for all routes starting with "/"

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
})
   


