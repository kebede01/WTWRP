import ClothingItem from "../models/clothingItem.js";
import {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ServerError,
} from "../utils/errors.js";
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
      let error = err; // Initialized as the safety net

      // Only "translate" if it isn't already one of our custom classes
      if (!(err instanceof ApiError)) {
        if (err.name === "ValidationError") {
          error = new BadRequestError("Invalid clothing item data provided.");
        } else if (err.name === "CastError") {
          error = new BadRequestError("Invalid user ID format.");
        } else {
          error = new ServerError(
            err.message || "An unexpected error occurred.",
          );
        }
      }

      return res.status(error.statusCode).send({
        message: error.message,
      });
    });
};

export const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  const { _id } = req.user;
  ClothingItem.findById(itemId)
    .orFail(new NotFoundError("Clothing item not found."))
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
      console.error(err);
      let error = err; // Start with the original error
      if (!(err instanceof ApiError)) {
        if (err.name === "DocumentNotFoundError") {
          error = new NotFoundError("Clothing item not found.");
        } else if (err.name === "CastError") {
          error = new BadRequestError("Invalid item ID format.");
        } else {
          // FIXED: use 'err' not 'error'
          error = new ServerError(
            err.message || "An unexpected error occurred.",
          );
        }
      }
      return res.status(error.statusCode).send({
        message: error.message,
      });
    });
};

export const getClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail(new NotFoundError("Clothing item not found."))
    .then((clothingItem) => {
      res.status(200).send({
        data: clothingItem,
      });
    })
    .catch((err) => {
      console.error(err);
      let error = err;

      if (!(err instanceof ApiError)) {
        if (err.name === "DocumentNotFoundError") {
          error = new NotFoundError("Clothing item not found.");
        } else if (err.name === "CastError") {
          error = new BadRequestError("Invalid item ID format.");
        } else {
          error = new ServerError(
            err.message || "An unexpected error occurred.",
          );
        }
      }
      return res.status(error.statusCode).send({
        message: error.message,
      });
    });
};

export const getClothingItems = (req, res) => {
  const { _id } = req.user;
  ClothingItem.find({ owner: _id })
    .then((clothingItems) => {
      res.status(200).send({
        data: clothingItems,
      });
    })
    .catch((err) => {
      console.error(err);
      let error = err;
      if (!(err instanceof ApiError)) {
        if (err.name === "CastError") {
          error = new BadRequestError("Invalid user ID format.");
        } else {
          error = new ServerError(
            err.message || "An unexpected error occurred.",
          );
        }
      }
      return res.status(error.statusCode).send({
        message: error.message,
      });
    });
};


export const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { returnDocument: "after" },
  )
    .orFail(new NotFoundError("Clothing item not found.")) 
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      let error = err;
      if (!(err instanceof ApiError)) {
        // We "translate" Mongoose names into our Status Codes
        if (err.name === "DocumentNotFoundError") {
          error = new NotFoundError("Clothing item not found.");
        } else if (err.name === "CastError") {
          error = new BadRequestError("Invalid item ID format.");
        } else {
          error = new ServerError(err.message || "Server Error");
        }
      }
      return res.status(error.statusCode).send({
        message: error.message,
      });
    });
};

export const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { returnDocument: "after" },
  )
    .orFail(new NotFoundError("Clothing item not found.")) 
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(err);
      let error = err;
      if (!(err instanceof ApiError)) {
        if (err.name === "DocumentNotFoundError") {
          error = new NotFoundError("Clothing item not found.");
        } else if (err.name === "CastError") {
          error = new BadRequestError("Invalid item ID format.");
        } else {
          error = new ServerError(err.message || "Server Error");
        }
      }
      return res.status(error.statusCode).send({
        message: error.message,
      });
    });
};
