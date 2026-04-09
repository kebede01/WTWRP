// import User from '../models/user.js'; 
import { Router } from 'express';
import { getCurrentUser, updateProfile } from '../controllers/users.js';
import auth from '../middleware/auth.js';
import { validateUpdateProfile } from '../middleware/validation.js';
 const router = Router();
router.use(auth); // Apply the auth middleware to all routes below this line
router.get('/me', getCurrentUser);
router.put('/me', validateUpdateProfile, updateProfile);


export default router;