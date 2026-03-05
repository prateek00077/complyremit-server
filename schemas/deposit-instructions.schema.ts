import Joi from 'joi';

export const getDepositInstructionsSchema = Joi.object({
  asset: Joi.string().required(),
  network: Joi.string().optional(),
});
