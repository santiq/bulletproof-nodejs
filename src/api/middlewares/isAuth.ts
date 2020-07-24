// Imports
import jwt from 'jsonwebtoken'

// App Imports
import config from '../../config';
import User from '../../models/user';

// Authentication middleware
export default async function(request, response, next) {
  let header = request.headers.authentication;

  if (header && header !== null) {
    try {
      const token = header.split(' ');
      const userToken = jwt.verify(token[1], config.jwtSecret);
      let user = await User.findOne({ _id: userToken.id });

      if (user) {
        request.auth = {
          isAuthenticated: true,
          user,
        }
      }
    } catch (e) {
      console.warn('Invalid token detected.')
    }
  } else {
    request.auth = {
      isAuthenticated: false,
      user: null,
    }
  }

  next();
}


// import jwt from 'express-jwt';
// import config from '../../config';

// /**
//  * We are assuming that the JWT will come in a header with the form
//  *
//  * Authorization: Bearer ${JWT}
//  *
//  * But it could come in a query parameter with the name that you want like
//  * GET https://my-bulletproof-api.com/stats?apiKey=${JWT}
//  * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
//  */
// const getTokenFromHeader = req => {
//   /**
//    * @TODO Edge and Internet Explorer do some weird things with the headers
//    * So I believe that this should handle more 'edge' cases ;)
//    */
//   if (
//     (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
//     (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
//   ) {
//     return req.headers.authorization.split(' ')[1];
//   }
//   return null;
// };

// const isAuth = jwt({
//   secret: config.jwtSecret, // The _secret_ to sign the JWTs
//   userProperty: 'token', // Use req.token to store the JWT
//   getToken: getTokenFromHeader, // How to extract the JWT from the request
// });

// export default isAuth;
