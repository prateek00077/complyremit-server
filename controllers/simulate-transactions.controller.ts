import type { Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { simulateTransactionsService } from '../services';
import APIResponse from '../lib/APIResponse';

export const simulateTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const customerId = (req as AuthRequest).customerId!;
  const idempotencyKey = req.headers['idempotency-key'] as string;
  const result = await simulateTransactionsService.simulateTransaction(
    customerId,
    req.body,
    idempotencyKey,
  );
  APIResponse.success(res, 'Transaction simulated', result);
};
