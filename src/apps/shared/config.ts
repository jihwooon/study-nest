import { randomUUID } from 'node:crypto'

import * as Joi from 'joi'

export const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'local').required(),
  LOG_DIRECTORY: Joi.string().required(),
  LOG_DAYS_TO_KEEP: Joi.string().required(),
  LOG_FILE_LEVEL: Joi.string().required(),
  LOG_CONSOLE_LEVEL: Joi.string().required(),
  SERVICE_APPLICATIONS_HOST: Joi.string().required(),
  SERVICE_APPLICATIONS_PORT: Joi.number().required(),
  SERVICE_APPLICATIONS_HEALTH_PORT: Joi.number().required(),
  MYSQL_HOST: Joi.string().required(),
  MYSQL_DATABASE: Joi.string().required(),
  MYSQL_USER: Joi.string().required(),
  MYSQL_PASSWORD: Joi.string().required(),
  MYSQL_PORT: Joi.number().required(),
})

export const isLocal = () => process.env.NODE_ENV === 'local'

export function generateRandomUUID() {
  return randomUUID().toString().slice(0, 5)
}
