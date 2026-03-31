// import User from '../models/user.js'; 
import { Router } from 'express';
import { getUser, getAllUsers, updateProfile } from '../controllers/users.js';


 const router = Router();

// Define the actual routes here!

router.get('/', getAllUsers);
router.get('/me', getUser);
router.patch('/me', updateProfile);
export default router;