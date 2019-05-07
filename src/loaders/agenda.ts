import * as Agenda from 'agenda';
import config from '../config';
import { Collection } from 'mongoose';

export default ({ mongoConnection }) => {
  const agenda = new Agenda() as any;

  /**
   * This voodoo magic is proper from agenda.js so I'm not gonna explain too much here.
   * https://github.com/agenda/agenda#mongomongoclientinstance
   */
  (async () => {
    await agenda._ready;

    try {
      (agenda._collection as Collection).ensureIndex(
        {
          disabled: 1,
          lockedAt: 1,
          name: 1,
          nextRunAt: 1,
          priority: -1,
        },
        {
          name: 'findAndLockNextJobIndex',
        },
      );
    } catch (err) {
      console.log('🔥 Failed to create Agenda index!');
      console.log(err);
      throw err;
    }

    console.log('✌️ Agenda index ensured');
  })();

  agenda
    .mongo(mongoConnection, config.agenda.dbCollection)
    .processEvery(config.agenda.pooltime)
    .maxConcurrency(config.agenda.concurrency);

  return agenda;
};
