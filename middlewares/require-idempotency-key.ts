import type { NextFunction, Request, Response } from 'express';
import AppError from '../lib/AppError';

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default function requireIdempotencyKey(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const key = req.headers['idempotency-key'] as string;
  if (!key) {
    return next(new AppError(400, 'Idempotency-Key header is required'));
  }
  if (!UUID_REGEX.test(key)) {
    return next(new AppError(400, 'Idempotency-Key must be a valid UUID'));
  }
  next();
}
