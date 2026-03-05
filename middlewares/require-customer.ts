import type { RequestHandler } from 'express';
import type { AuthRequest } from './auth';
import AppError from '../lib/AppError';

const requireCustomer: RequestHandler = (req, _res, next) => {
  const authReq = req as AuthRequest;
  const customerId = authReq.dbUser?.oneMoneyCustomerId;

  if (!customerId) {
    return next(new AppError(404, 'No payment account associated with this user'));
  }

  authReq.customerId = customerId;
  next();
};

export default requireCustomer;
