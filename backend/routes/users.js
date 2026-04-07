// import User from '../models/user.js'; 
import { Router } from 'express';
import { getCurrentUser, updateProfile } from '../controllers/users.js';
import auth from '../middleware/auth.js';

 const router = Router();
router.use(auth); // Apply the auth middleware to all routes below this line
router.get('/me', getCurrentUser);
router.put('/me', updateProfile);


export default router;