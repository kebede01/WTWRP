import { Router } from "express";
import { createClothingItem, deleteClothingItem, getClothingItem, getClothingItems, updateClothingItem} from "../controllers/clothingItems.js";


const router = Router();
router.post("/", createClothingItem);
router.get("/", getClothingItems);
 

router.get("/:itemId", getClothingItem);

router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId", updateClothingItem);
export default router;