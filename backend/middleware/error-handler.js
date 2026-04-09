import { ApiError } from "../utils/errors.js";

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  if (!(err instanceof ApiError)) {
    console.error("CRITICAL SYSTEM ERROR:", err);
  }
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
};

export default errorHandler;
