import ClothingItem from "../models/clothingItem.js";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "../utils/errors.js";
export const createClothingItem = (req, res, next) => {
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
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("Invalid clothing item data provided."),
        );
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format."));
      }
      return next(err);
    });
};

export const deleteClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  const { _id } = req.user;
  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Clothing item not found."))
    .then((clothingItem) => {
      // Check ownership
      if (!clothingItem.owner.equals(_id)) {
        throw new ForbiddenError(
          "You are not the owner of this clothing item.",
        );
      }
      // Return the deletion promise
      return clothingItem.deleteOne();
    })
    .then(() => {
      res.status(200).send({
        message: "Clothing item deleted successfully.",
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format."));
      }
      return next(err);
    });
};

export const getClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(() => new NotFoundError("Clothing item not found."))
    .then((clothingItem) => {
      res.status(200).send({
        data: clothingItem,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format."));
      }
      return next(err);
    });
};

export const getClothingItems = (req, res, next) => {
  const { _id } = req.user;
  ClothingItem.find({ owner: _id })
    .then((clothingItems) => {
      res.status(200).send({
        data: clothingItems,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format."));
      }
      return next(err);
    });
};

export const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: "after" },
  )
    .orFail(() => new NotFoundError("Clothing item not found."))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format."));
      }
      return next(err);
    });
};

export const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { returnDocument: "after" },
  )
    .orFail(() => new NotFoundError("Clothing item not found."))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID format."));
      }
      return next(err);
    });
};
