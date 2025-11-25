import { AuthenticationMiddleware } from '../../../server/middlewares/AuthenticationMiddleware.js';
import { makeTokenJwtProvider } from '../../../shared/container/providers/makeTokenJwtProvider.js';

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware(makeTokenJwtProvider());
}
