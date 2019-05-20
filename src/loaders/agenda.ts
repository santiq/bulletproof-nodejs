import * as Agenda from 'agenda';
import config from '../config';

export default ({ mongoConnection }) => {
  return new Agenda({
    mongo: mongoConnection,
    collection: config.agenda.dbCollection,
    processEvery: config.agenda.pooltime,
    maxConcurrency: config.agenda.concurrency,
  }) as any;
  /**
   * This voodoo magic is proper from agenda.js so I'm not gonna explain too much here.
   * https://github.com/agenda/agenda#mongomongoclientinstance
   */
};
