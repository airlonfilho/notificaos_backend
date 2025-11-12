import { AuthenticationMiddleware } from '../../../server/middlewares/AuthenticationMiddleware.js';
import { makeTokenJwtProvider } from '../providersFactories/makeTokenJwtProvider.js';

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware(makeTokenJwtProvider());
}

