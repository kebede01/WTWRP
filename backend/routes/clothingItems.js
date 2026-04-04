import { Router } from "express";
import {
  createClothingItem,
  deleteClothingItem,
  getClothingItem,
  getClothingItems,
  updateClothingItem,
} from "../controllers/clothingItems.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", getClothingItems);
router.use(auth); // Apply the auth middleware to all routes below this line
router.post("/", createClothingItem);
router.get("/:itemId", getClothingItem);

router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId", updateClothingItem);
export default router;
