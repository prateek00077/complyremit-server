import { oneMoneyClient } from '../lib/onemoney-client';

export const getDepositInstructions = async (
  customerId: string,
  asset: string,
  network?: string,
): Promise<unknown> => {
  const query: Record<string, string> = { asset };
  if (network) {
    query['network'] = network;
  }

  const path = `/v1/customers/${customerId}/deposit_instructions`;
  return oneMoneyClient.get(path, query);
};
