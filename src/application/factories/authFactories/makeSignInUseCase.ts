import { SignInUseCase } from '../../useCases/auth/SignInUseCase.js';
import { makeOrganizationRepository } from '../makeOrganizationRepository.js';
import { makeHashProvider } from '../makeHashProvider.js';
import { makeTokenJwtProvider } from '../makeTokenJwtProvider.js';

export function makeSignInUseCase() {
  return new SignInUseCase(
    makeOrganizationRepository(),
    makeHashProvider(),
    makeTokenJwtProvider(),
    process.env.JWT_SECRET!
  );
}

