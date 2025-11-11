import { HashProvider } from '../../infra/providers/HashProvider.js';

export function makeHashProvider() {
  const SALT = 10;
  return new HashProvider(SALT);
}

