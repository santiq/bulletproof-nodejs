import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';

const app = Router();
auth(app);
user(app);

export default app;