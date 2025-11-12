import { SignInUseCase } from '../../useCases/auth/SignInUseCase.js';
import { makeOrganizationRepository } from '../makeOrganizationRepository.js';
import { makeHashProvider } from '../providersFactories/makeHashProvider.js';
import { makeTokenJwtProvider } from '../providersFactories/makeTokenJwtProvider.js';

export function makeSignInUseCase() {
  return new SignInUseCase(
    makeOrganizationRepository(),
    makeHashProvider(),
    makeTokenJwtProvider(),
    process.env.JWT_SECRET!
  );
}

