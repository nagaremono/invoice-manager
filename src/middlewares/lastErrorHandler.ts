import { ErrorRequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ENV } from '../config/env';
import { ApiError } from '../utils/apiError';
import logger from '../utils/logger';

export const errorConverter: ErrorRequestHandler = (err, _, __, next) => {
  if (err instanceof ApiError === false) {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const message = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR;
    const ext = err.ext || [];

    next(new ApiError(statusCode, message, ext));
  }
  next(err);
};

export const lastErrorHandler: ErrorRequestHandler = (
  err: ApiError,
  _,
  res,
  next
) => {
  if (ENV.NODE_ENV === 'development') {
    logger.error(err);
  }
  res.status(err.statusCode).json({
    result: 'error',
    statusCode: err.statusCode,
    message: err.error,
    ext: err.ext,
    ...(ENV.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
