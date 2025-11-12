import { TokenJwtProvider } from '../../../infra/providers/TokenJWTProvider.js';

export function makeTokenJwtProvider() {
  return new TokenJwtProvider();
}



