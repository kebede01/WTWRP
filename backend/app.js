import 'dotenv/config'; // Loads variables from .env into process.env
import express from 'express';
import cors from 'cors';
import path from 'path'; // <--- Add this line!
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { PORT = 4000 } = process.env;

const app = express();
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
// (2) Enable CORS for all origins
app.use(cors());

// app.use("/", router);

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
})
   


