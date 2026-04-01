// import User from '../models/user.js'; 
import { Router } from 'express';
import { getUser, updateProfile } from '../controllers/users.js';


 const router = Router();

// Define the actual routes here!


router.get('/me', getUser);
router.put('/me', updateProfile);

export default router;