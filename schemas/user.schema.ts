import Joi from 'joi';

export const createUserSchema = Joi.object({}).options({ stripUnknown: true });
