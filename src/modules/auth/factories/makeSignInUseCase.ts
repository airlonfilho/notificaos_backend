import { SignInUseCase } from '../useCases/SignInUseCase.js';
import { makeOrganizationRepository } from '../../organizations/factories/makeOrganizationRepository.js';
import { makeHashProvider } from '../../../shared/container/providers/makeHashProvider.js';
import { makeTokenJwtProvider } from '../../../shared/container/providers/makeTokenJwtProvider.js';

export function makeSignInUseCase() {
  return new SignInUseCase(
    makeOrganizationRepository(),
    makeHashProvider(),
    makeTokenJwtProvider(),
    process.env.JWT_SECRET!
  );
}

