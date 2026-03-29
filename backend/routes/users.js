import User from '../models/user.js'; 
import { Router } from 'express';
export const router = Router();

router.post('/signup', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    // This will catch your "Wrong email format" or "You must enter a valid URL" errors
    res.status(400).json({ message: error.message });
  }
});