import { AuthenticationMiddleware } from '../../server/middlewares/AuthenticationMiddleware.js';
import { makeTokenJwtProvider } from './makeTokenJwtProvider.js';

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware(makeTokenJwtProvider());
}

