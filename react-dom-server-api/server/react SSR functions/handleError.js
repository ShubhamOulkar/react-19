import { throwError } from "../utils/throwError.js";

const isProduction = process.env.NODE_ENV === "production";

export const handleError = (error) => {
  if (isProduction) {
    // Generic error in production
    throwError(error.message, 500);
  } else {
    // Detailed error in development
    throwError(error.stack, 500);
  }
};
