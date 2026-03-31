// import User from '../models/user.js'; 
import { Router } from 'express';
import { getUser, getAllUsers, updateProfile, deleteProfile } from '../controllers/users.js';


 const router = Router();

// Define the actual routes here!

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.patch('/:userId', updateProfile);
router.delete('/:userId', deleteProfile);
export default router;