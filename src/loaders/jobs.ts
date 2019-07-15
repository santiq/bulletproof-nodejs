import config from '../config';
import EmailSequenceJob from '../jobs/emailSequence';

export default ({ agenda }) => {
  agenda.define(
    'send-email',
    { priority: 'high', concurrency: config.agenda.concurrency },
    // @TODO Could this be a static method? Would it be better?
    new EmailSequenceJob().handler,
  );

  agenda.start();
};
