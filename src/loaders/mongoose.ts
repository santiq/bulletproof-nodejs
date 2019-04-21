import * as mongoose from 'mongoose'
import config from '../config'

export default async (): Promise<any> => {
  const connection = await mongoose.connect(config.databaseURL, { useNewUrlParser: true, useCreateIndex: true });
  return connection.connection.db;
}
