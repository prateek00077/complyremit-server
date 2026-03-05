import Joi from 'joi';

export const simulateTransactionSchema = Joi.object({
  asset: Joi.string().required(),
  network: Joi.string().required(),
  amount: Joi.string().required(),
  simulate_status: Joi.string().optional(),
});
