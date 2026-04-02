// import User from '../models/user.js'; 
import { Router } from 'express';
import { getCurrentUser, updateProfile } from '../controllers/users.js';


 const router = Router();

router.get('/me', getCurrentUser);
router.put('/me', updateProfile);

export default router;