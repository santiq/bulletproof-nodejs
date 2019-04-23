import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default' 
    model: require('../models/user').default
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [
      userModel,
      // salaryModel,
      // whateverModel
    ]
  });
  console.log('✌️ Dependency Injector loaded');

  await jobsLoader({ agenda });
  console.log('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  console.log('✌️ Express loaded');
}

