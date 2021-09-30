export class OperationalError extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleKnownExceptions = (err, res) => {
  const { statusCode, message } = err;
  return res.status(statusCode).json({ error: true, info: message });
};

const handleUnknownExceptions = (err, res) => {
  return res.status(500).json({ error: true, info: "Something went wrong." });
};

export const handleError = (err, res) => {
  err instanceof OperationalError
    ? handleKnownExceptions(err, res)
    : handleUnknownExceptions(err, res);
};

// Import and use in app.js
/**

import customErrorHandler from './src/api/middlewares/errorHandler.ts';
app.use((err, req, res, next) => {
  customErrorHandler(err, res);
});

*/
