import paseto from 'paseto';
import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '@/interfaces/IUser';
import { Logger } from 'winston';
const { V3: { decrypt } } = paseto
import config from '@/config';
/**
 * We are assuming that the PASTEO will come in a header with the form
 *
 * Authorization: Bearer ${PASTEO}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://my-bulletproof-api.com/stats?apiKey=${PASTEO}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
 */
const getTokenFromHeader = req => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

// from https://stackoverflow.com/a/54733755
export function set<T>(obj: T, path: string | string[], value: unknown): T {
  if (typeof obj !== 'object') {
    return obj;
  }

  if (typeof path === 'string') {
    path = path.toString().match(/[^.[\]]+/g) || [];
  }

  path.slice(0, -1).reduce((a, c, i) => // Iterate all of them except the last one
  {
    return Object(a[c]) === a[c] // Does the key exist and is its value an object?

      // Yes: then follow that path
      ? a[c]
      // No: create the key. Is the next key a potential array-index?
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      : a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1]
        ? [] // Yes: assign a new array object
        : {};
  }, // No: assign a new plain object
    obj)[path[path.length - 1]] = value; // Finally assign the value to the last key
  return obj; // Return the top-level object to allow chaining
}
;

const isAuth = async (req, res, next) => {
   try {
   let token : string | null = getTokenFromHeader(req);
  const payload = await decrypt(token, config.pasteoKey)
  set(req,"token",payload);
  setImmediate(next);  
  } catch (e) {
    setImmediate(next,e);
  }
  
}

export default isAuth;
