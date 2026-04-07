import { Router } from "express";
import {
  createClothingItem,
  deleteClothingItem,
  getClothingItem,
  getClothingItems,

  likeItem,
  dislikeItem,
} from "../controllers/clothingItems.js";
import auth from "../middleware/auth.js";

const router = Router();


router.use(auth); // Apply the auth middleware to all routes below this line
router.get("/me", getClothingItems);
router.post("/", createClothingItem);
router.get("/:itemId", getClothingItem);

router.delete("/:itemId", deleteClothingItem);

router.post("/:itemId/likes", likeItem); 
router.delete("/:itemId/likes", dislikeItem); 
export default router;
