import type {
  Response as ExpressResponse,
  NextFunction,
  Request,
} from 'express';
import APIResponse from '../lib/APIResponse';
import AppError from '../lib/AppError';
import logger from '../lib/logger';

const error = (
  err: Error | AppError | unknown,
  req: Request,
  res: ExpressResponse,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.warn('Handled error', {
      status: err.status,
      message: err.message,
      path: req.path,
      method: req.method,
    });
    return APIResponse.error(res, err.status, err.message);
  }

  logger.error('Unexpected error', {
    error: err instanceof Error ? err.message : 'Unknown error',
    stack: err instanceof Error ? err.stack : undefined,
    path: req.path,
    method: req.method,
  });
  return APIResponse.error(res, 500, 'Something went wrong. Please try again later.');
};

export default error;
