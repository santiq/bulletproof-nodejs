import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALGO,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * Agenda.js stuff
   */
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY, 10),
  },

  /**
   * Agendash config
   */
  agendash: {
    user: 'agendash',
    password: '123456'
  },
  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  /**
   * Mailgun email credentials
   */
  emails: {
    apiKey: process.env.MAILGUN_API_KEY,
    apiUsername: process.env.MAILGUN_USERNAME,
    domain: process.env.MAILGUN_DOMAIN
  }
};
