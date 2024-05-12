import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  NODE_ENV: Joi.string().required().valid('development', 'local'),
  MONGODB_URI: Joi.string().required(),
  AUTH0_ISSUER_DOMAIN: Joi.string().required(),
  AUTH0_AUDIENCE: Joi.string().required(),
  AUTH0_CLIENT_ID: Joi.string().required(),
  AUTH0_CLIENT_SECRET: Joi.string().required(),
});
