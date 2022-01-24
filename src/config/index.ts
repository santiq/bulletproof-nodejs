import Joi from 'joi';
import dotenv from 'dotenv';


const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const envVarsSchema = Joi.object()
.keys({
    // Set the NODE_ENV to 'development' by default
    NODE_ENV: Joi.string().valid('production', 'development').default('development'),
    PORT: Joi.number().default(3000),
    MONGODB_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    JWT_ALGO: Joi.string().required(),
    LOG_LEVEL: Joi.string().default('silly'),
    AGENDA_DB_COLLECTION: Joi.string().default('agenda'),
    AGENDA_CONCURRENCY: Joi.number(),
    AGENDADASH_USER: Joi.string().required(),
    AGENDADASH_PWD: Joi.string().required(),
    API_PREFIX: Joi.string().default('/api'),
    MAILGUN_API_KEY: Joi.string().required(),
    MAILGUN_USERNAME: Joi.string().required(),
    MAILGUN_DOMAIN: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

process.env.NODE_ENV = envVars.NODE_ENV;

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,

  /**
   * Your favorite port
   */
  port: envVars.PORT,

  /**
   * That long string from mlab
   */
  databaseURL: envVars.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: envVars.JWT_SECRET,
  jwtAlgorithm: envVars.JWT_ALGO,

  /**
   * Used by winston logger
   */
  logs: {
    level: envVars.LOG_LEVEL,
  },

  /**
   * Agenda.js stuff
   */
  agenda: {
    dbCollection: envVars.AGENDA_DB_COLLECTION,
    pooltime: envVars.AGENDA_POOL_TIME,
    concurrency: envVars.AGENDA_CONCURRENCY,
  },

  /**
   * Agendash config
   */
  agendash: {
    user: envVars.AGENDADASH_USER,
    password: envVars.AGENDADASH_PWD,
  },
  /**
   * API configs
   */
  api: {
    prefix: envVars.API_PREFIX,
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: envVars.MAILGUN_API_KEY,
    apiUsername: envVars.MAILGUN_USERNAME,
    domain: envVars.MAILGUN_DOMAIN,
  },
};
