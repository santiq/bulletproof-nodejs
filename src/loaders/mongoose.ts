import mongoose from 'mongoose';
import type { Connection } from 'mongoose';
import config from '@/config';

export default async (): Promise<Connection> => {
  const connection = await mongoose.connect(config.databaseURL);
  return connection.connection;
};
