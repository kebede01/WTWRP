class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    // Set the name to the class name (e.g., "BadRequestError")
    this.name = this.constructor.name; 
    // Mark as an expected operational error
    this.isOperational = true; 

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
class BadRequestError extends ApiError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ConflictError extends ApiError {
  constructor(message = "Conflict occurred") {
    super(message, 409);
    
  }
}

class ForbiddenError   extends ApiError {
  constructor(message = "Forbidden") {
    super(message, 403);
    
  }
}

class NotFoundError extends ApiError {
  constructor(message = "Resource not found") {
    super(message, 404);
    
  }
}



class ServerError  extends ApiError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
    // Usually, 500s are NOT operational; they are bugs.
    this.isOperational = false;
  }
}
export {
  ApiError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ServerError
};