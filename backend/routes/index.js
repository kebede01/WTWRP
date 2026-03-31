import { Router } from "express";
import  usersRouter from "./users.js";
import  clothingItemsRouter  from "./clothingItems.js"; 

const router = Router();
router.use("/user", usersRouter);  
router.use("/item", clothingItemsRouter);
// This is a catch-all route for any undefined routes.
router.use((req, res) => {
  res.status(404).send({
    error: "Route not found.",
  });
});


export default router;