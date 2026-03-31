import { Router } from "express";
import  usersRouter from "./users.js";
import  clothingItemsRouter  from "./clothingItems.js"; 

const router = Router();
router.use("/user", usersRouter);  
router.use("/item", clothingItemsRouter);

export default router;