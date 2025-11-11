import { SignUpUseCase } from '../../useCases/auth/SignUpUseCase.js';
import { makeOrganizationRepository } from '../makeOrganizationRepository.js';
import { makeHashProvider } from '../makeHashProvider.js';

export function makeSignUpUseCase() {

  return new SignUpUseCase(
    makeOrganizationRepository(),
    makeHashProvider(),
  );
}

