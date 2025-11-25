import { SignUpUseCase } from '../useCases/SignUpUseCase.js';
import { makeOrganizationRepository } from '../../organizations/factories/makeOrganizationRepository.js';
import { makeHashProvider } from '../../../shared/container/providers/makeHashProvider.js';

export function makeSignUpUseCase() {

  return new SignUpUseCase(
    makeOrganizationRepository(),
    makeHashProvider(),
  );
}

