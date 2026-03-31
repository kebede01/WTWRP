import { Router } from "express";
import { createClothingItem, deleteClothingItem, getClothingItem, getClothingItems} from "../controllers/clothingItems.js";


const router = Router();
router.post("/", createClothingItem);
router.get("/", getClothingItems);
 

router.get("/:itemID", getClothingItem);

router.delete("/:itemID", deleteClothingItem);
export default router;