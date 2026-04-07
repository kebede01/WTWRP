import ClothingItem from "../models/clothingItem.js";

export const createClothingItem = (req, res) => {
  const id = req.user._id;
  const { name, weather, image } = req.body;
  ClothingItem.create({
    name,
    weather,
    image,
    owner: id,
  })
    .then((clothingItem) => {
      res.status(201).send({
        data: clothingItem,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(400).send({
          error: "Invalid clothing item data provided.",
        });
      } else if (err.name === "SyntaxError") {
        return res.status(400).send({
          error: "Invalid JSON syntax. Please check your quotes and commas.",
        });
      } else if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid item ID format.",
        });
      } else {
        return res.status(500).send({
          error: "An error occurred while creating the clothing item.",
        });
      }
    });
};
export const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  const { _id } = req.user;
  ClothingItem.findById(itemId)
    .orFail()
    .then((clothingItem) => {
     if (!clothingItem.owner.equals(_id)) {
  const forbiddenError = new Error("You are not the owner of this clothing item.");
  forbiddenError.name = "ForbiddenError";
  throw forbiddenError;
}
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then(() => {
      res.status(200).send({
        message: "Clothing item deleted successfully.",
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          error: "Clothing item not found.",
        });
      } else if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid item ID format.",
        });
      } else if (err.name === "SyntaxError") {
        return res.status(400).send({
          error: "Invalid JSON syntax. Please check your quotes and commas.",
        });
      } else if (err.name === "ForbiddenError") {
        return res.status(403).send({ error: err.message });
      } else {
        res.status(500).send({
          error: "An error occurred while deleting the user.",
        });
      }
    });
};

export const getClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((clothingItem) => {
      res.status(200).send({
        data: clothingItem,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          error: "Clothing item not found.",
        });
      } else if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid item ID format.",
        });
      } else if (err.name === "SyntaxError") {
        return res.status(400).send({
          error: "Invalid JSON syntax. Please check your quotes and commas.",
        });
      } else {
        res.status(500).send({
          error: "An error occurred while deleting the user.",
        });
      }
    });
};

export const getClothingItems = (req, res) => {
  const { _id } = req.user;
  ClothingItem.find({ owner: _id })
    .orFail()
    .then((clothingItems) => {
      res.status(200).send({
        data: clothingItems,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          error: "No clothing items found for this user.",
        });
      } else if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid user ID format.",
        });
      } else {
        res.status(500).send({
          error: "An error occurred while deleting the user.",
        });
      }
    });
};

export const updateClothingItem = (req, res) => {
  const { itemId } = req.params;
  const { name, weather, image } = req.body;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { name, weather, image },
    { returnDocument: "after", runValidators: true },
  )
    .orFail()
    .then((updatedClothingItem) => {
      res.status(200).send({
        data: updatedClothingItem,
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({
          error: "Clothing item not found.",
        });
      } else if (err.name === "CastError") {
        return res.status(400).send({
          error: "Invalid item ID format.",
        });
      } else if (err.name === "ValidationError") {
        return res.status(400).send({
          error: "Invalid clothing item data provided.",
        });
      } else if (err.name === "SyntaxError") {
        return res.status(400).send({
          error: "Invalid JSON syntax. Please check your quotes and commas.",
        });
      } else {
        res.status(500).send({
          error: "An error occurred while updating the clothing item.",
        });
      }
    });
};
export const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: "after" }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      } 
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID format" });
      }
      res.status(500).send({ message: "An error occurred on the server" });
    });
};

export const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { returnDocument: "after" }
  )
    .orFail()
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      } 
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID format" });
      }
      res.status(500).send({ message: "An error occurred on the server" });
    });
};