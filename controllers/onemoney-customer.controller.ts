import type { Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import APIResponse from '../lib/APIResponse';
import AppError from '../lib/AppError';
import { oneMoneyCustomerService as customerService, userService } from '../services';

export const createCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const authReq = req as AuthRequest;

  if (authReq.dbUser?.oneMoneyCustomerId) {
    throw new AppError(409, 'User already has an associated payment account');
  }

  const idempotencyKey = req.headers['idempotency-key'] as string;
  const result = await customerService.createCustomer(req.body, idempotencyKey) as {
    customer_id: string;
    status: string;
  };

  await userService.linkPaymentAccount(authReq.user.clerkUserId, result.customer_id, result.status);

  APIResponse.created(res, 'Customer created successfully', result);
};

export const getCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result = await customerService.getCustomer((req as AuthRequest).customerId!);
  APIResponse.success(res, 'Customer retrieved successfully', result);
};

export const updateCustomer = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const idempotencyKey = req.headers['idempotency-key'] as string;
  const result = await customerService.updateCustomer(
    (req as AuthRequest).customerId!,
    req.body,
    idempotencyKey,
  );
  APIResponse.success(res, 'Customer updated successfully', result);
};

// TOS Handlers
export const createTosLink = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const idempotencyKey = req.headers['idempotency-key'] as string;
  const result = await customerService.createTosLink(req.body, idempotencyKey);
  APIResponse.created(res, 'TOS link created successfully', result);
};

export const signTos = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { sessionToken } = req.params as { sessionToken: string };
  const idempotencyKey = req.headers['idempotency-key'] as string;
  const result = await customerService.signTos(sessionToken, idempotencyKey);
  APIResponse.success(res, 'TOS signed successfully', result);
};
