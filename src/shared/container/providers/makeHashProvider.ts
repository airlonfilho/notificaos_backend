import { HashProvider } from './HashProvider.js';

export function makeHashProvider() {
  const SALT = 10;
  return new HashProvider(SALT);
}

