import { Router, Request, Response} from 'express';
import middlewares from '../middlewares';
const route = Router();

export default (app) => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, async (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });

};
