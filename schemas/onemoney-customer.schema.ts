import Joi from 'joi';

const addressSchema = Joi.object({
  street_line_1: Joi.string().max(200).required(),
  street_line_2: Joi.string().max(200).optional(),
  city: Joi.string().max(100).required(),
  state: Joi.string().max(100).required(),
  country: Joi.string().length(2).required(),
  subdivision: Joi.string().max(100).optional(),
  postal_code: Joi.string().max(20).required(),
});

const identifyingInfoSchema = Joi.object({
  type: Joi.string().max(100).required(),
  issuing_country: Joi.string().length(2).required(),
  national_identity_number: Joi.string().max(100).required(),
  image_front: Joi.string().optional(),
  image_back: Joi.string().optional(),
});

const associatedPersonSchema = Joi.object({
  first_name: Joi.string().max(100).required(),
  middle_name: Joi.string().max(100).optional(),
  last_name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  residential_address: addressSchema.required(),
  birth_date: Joi.string().isoDate().required(),
  primary_nationality: Joi.string().length(2).required(),
  has_ownership: Joi.boolean().required(),
  ownership_percentage: Joi.number().min(0).max(100).when('has_ownership', {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  has_control: Joi.boolean().required(),
  is_signer: Joi.boolean().required(),
  is_director: Joi.boolean().required(),
  identifying_information: Joi.array().items(identifyingInfoSchema).min(1).required(),
  country_of_tax: Joi.string().length(2).required(),
  tax_type: Joi.string().max(50).required(),
  tax_id: Joi.string().max(100).required(),
  poa: Joi.string().optional(),
  poa_type: Joi.string().max(50).optional(),
});

const documentSchema = Joi.object({
  doc_type: Joi.string().max(100).required(),
  file: Joi.string().required(),
  description: Joi.string().max(500).optional(),
});

export const createCustomerSchema = Joi.object({
  email: Joi.string().email().required(),
  business_legal_name: Joi.string().max(200).required(),
  business_description: Joi.string().max(500).required(),
  business_type: Joi.string().max(100).required(),
  business_industry: Joi.string().max(100).required(),
  business_registration_number: Joi.string().max(100).required(),
  date_of_incorporation: Joi.string().isoDate().required(),
  incorporation_country: Joi.string().length(2).required(),
  incorporation_state: Joi.string().max(100).required(),
  registered_address: addressSchema.required(),
  primary_website: Joi.string().uri().max(500).optional(),
  publicly_traded: Joi.boolean().optional(),
  tax_id: Joi.string().max(100).required(),
  tax_type: Joi.string().max(50).required(),
  tax_country: Joi.string().length(2).required(),
  signed_agreement_id: Joi.string().uuid().required(),
  associated_persons: Joi.array().items(associatedPersonSchema).min(1).required(),
  documents: Joi.array().items(documentSchema).min(1).required(),
  account_purpose: Joi.string().max(200).required(),
  source_of_funds: Joi.array().items(Joi.string().max(100)).min(1).required(),
  source_of_wealth: Joi.array().items(Joi.string().max(100)).min(1).required(),
  estimated_annual_revenue_usd: Joi.string().max(50).optional(),
  expected_monthly_fiat_deposits: Joi.string().max(50).optional(),
  expected_monthly_fiat_withdrawals: Joi.string().max(50).optional(),
}).options({ stripUnknown: true });

export const updateCustomerSchema = Joi.object({
  email: Joi.string().email().optional(),
  business_legal_name: Joi.string().max(200).optional(),
  business_description: Joi.string().max(500).optional(),
  business_type: Joi.string().max(100).optional(),
  business_industry: Joi.string().max(100).optional(),
  business_registration_number: Joi.string().max(100).optional(),
  date_of_incorporation: Joi.string().isoDate().optional(),
  incorporation_country: Joi.string().length(2).optional(),
  incorporation_state: Joi.string().max(100).optional(),
  registered_address: addressSchema.optional(),
  primary_website: Joi.string().uri().max(500).optional(),
  publicly_traded: Joi.boolean().optional(),
  tax_id: Joi.string().max(100).optional(),
  tax_type: Joi.string().max(50).optional(),
  tax_country: Joi.string().length(2).optional(),
}).options({ stripUnknown: true });

export const createTosLinkSchema = Joi.object({
  redirect_url: Joi.string().uri().required(),
}).options({ stripUnknown: true });
