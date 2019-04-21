import { Document } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document,
    }
  }
}