import 'dotenv/config'; // Loads variables from .env into process.env
import express from 'express';

const { PORT = 4000 } = process.env;

const app = express();

app.listen(PORT, () => {
  // if everything works fine, the console will show which port the application is listening to
  console.log(`App listening at port ${PORT}`);
})



