import { oneMoneyClient } from '../lib/onemoney-client';
import type {
  CreateCustomerRequest,
  CustomerResponse,
  UpdateCustomerRequest,
  CreateTosLinkRequest,
  CreateTosLinkResponse,
  SignTosResponse,
} from '../types/onemoney-customer.types';

export const createCustomer = async (
  body: CreateCustomerRequest,
  idempotencyKey: string
): Promise<CustomerResponse> => {
  return oneMoneyClient.post('/v1/customers', body, idempotencyKey);
};

export const getCustomer = async (
  customerId: string
): Promise<CustomerResponse> => {
  return oneMoneyClient.get(`/v1/customers/${customerId}`);
};

export const updateCustomer = async (
  customerId: string,
  body: UpdateCustomerRequest,
  idempotencyKey: string
): Promise<CustomerResponse> => {
  return oneMoneyClient.put(`/v1/customers/${customerId}`, body, idempotencyKey);
};

export const createTosLink = async (
  body: CreateTosLinkRequest,
  idempotencyKey: string
): Promise<CreateTosLinkResponse> => {
  return oneMoneyClient.post('/v1/customers/tos_links', body, idempotencyKey);
};

export const signTos = async (
  sessionToken: string,
  idempotencyKey: string
): Promise<SignTosResponse> => {
  return oneMoneyClient.post(`/v1/customers/tos_links/${sessionToken}/sign`, {}, idempotencyKey);
};
