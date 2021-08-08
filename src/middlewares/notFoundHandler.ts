import { RequestHandler } from 'express';
import { ApiError } from '../utils/apiError';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const notFoundHandler: RequestHandler = (_, __, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
};
