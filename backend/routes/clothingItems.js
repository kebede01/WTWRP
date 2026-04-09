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
import { validateCreateClothingInput, validateItemId} from "../middleware/validation.js";
const router = Router();


router.use(auth); // Apply the auth middleware to all routes below this line
router.get("/me", getClothingItems);
router.post("/", validateCreateClothingInput, createClothingItem);
router.get("/:itemId", validateItemId, getClothingItem);

router.delete("/:itemId", validateItemId, deleteClothingItem);

router.post("/:itemId/likes", validateItemId, likeItem); 
router.delete("/:itemId/likes", validateItemId, dislikeItem); 
export default router;
