import jwt from 'jsonwebtoken';

/**
 * @description - function to decode token
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 * @param {String} token
 *
 * @returns {Object} Object
 */
const decodeToken = (request, response, next, token) => {
  jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
    if (!error) {
      request.token = decode;
      return next();
    }
    return response.status(401).send('Invalid request token');
  });
};

/**
 * @description - User's Authentication Middleware
 *
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 *
 * @returns {Object} Object
 */
const authMiddleware = (request, response, next) => {
  let token = request.headers['x-access-token']
      || request.headers.Authorization
      || request.headers.token
      || request.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (token) {
    return decodeToken(request, response, next, token);
  }

  return response.status(401).send('please assign a access token as header');
};


export default authMiddleware;