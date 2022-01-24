import type { Connection } from 'mongoose';
import Agenda from 'agenda';
import config from '@/config';

export default ({ mongoConnection }: { mongoConnection: Connection }) => {
  return new Agenda({
    mongo: mongoConnection.getClient().db(config.agenda.dbCollection) as any,
    processEvery: config.agenda.pooltime,
    maxConcurrency: config.agenda.concurrency,
  });
};
