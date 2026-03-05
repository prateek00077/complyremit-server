import { oneMoneyClient } from '../lib/onemoney-client';

export const simulateTransaction = async (
  customerId: string,
  body: Record<string, unknown>,
  idempotencyKey?: string,
): Promise<unknown> => {
  const path = `/v1/customers/${customerId}/simulate-transactions`;
  return oneMoneyClient.post(path, body, idempotencyKey);
};
