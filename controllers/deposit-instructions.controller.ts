import type { Request, Response } from 'express';
import type { AuthRequest } from '../middlewares/auth';
import { depositInstructionsService } from '../services';
import APIResponse from '../lib/APIResponse';

export const getDepositInstructions = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { asset, network } = req.query as { asset: string; network?: string };
  const instructions = await depositInstructionsService.getDepositInstructions(
    (req as AuthRequest).customerId!,
    asset,
    network,
  );
  APIResponse.success(res, 'Deposit instructions retrieved', instructions);
};
