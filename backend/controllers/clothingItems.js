import ClothingItem from "../models/clothingItem.js";

export const createClothingItem = (req, res) => {
  res.send({ message: "Hello, CREATE CLOTHING ITEM World!" });
 
};

export const deleteClothingItem = (req, res) => {
  res.send({ message: "Hello, DELETE CLOTHING ITEM World!" });
 
};

export const getClothingItem = (req, res) => { 
  res.send({ message: "Hello, GET CLOTHING ITEM World!" });
};

export const getClothingItems = (req, res) => {
  res.send({ message: "Hello, GET ALL CLOTHING ITEMS World!" });
}