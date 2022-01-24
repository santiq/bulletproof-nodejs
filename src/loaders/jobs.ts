import config from '@/config';
import EmailSequenceJob from '@/jobs/emailSequence';
import Agenda from 'agenda';

enum JobPriority {
  highest = 20,
  high = 10,
  normal = 0,
  low = -10,
  lowest = -20
}

export default ({ agenda }: { agenda: Agenda }) => {
  agenda.define(
    'send-email',
    { priority: JobPriority.high, concurrency: config.agenda.concurrency },
    // @TODO Could this be a static method? Would it be better?
    new EmailSequenceJob().handler,
  );

  agenda.start();
};
