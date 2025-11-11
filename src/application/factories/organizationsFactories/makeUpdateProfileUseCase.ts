import { UpdateProfileUseCase } from '../../useCases/organizations/UpdateProfileUseCase.js';
import { makeOrganizationRepository } from '../makeOrganizationRepository.js';

export function makeUpdateProfileUseCase() {
  return new UpdateProfileUseCase(makeOrganizationRepository());
}

