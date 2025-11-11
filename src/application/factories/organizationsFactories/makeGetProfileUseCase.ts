import { GetProfileUseCase } from '../../useCases/organizations/GetProfileUseCase.js';
import { makeOrganizationRepository } from '../makeOrganizationRepository.js';

export function makeGetProfileUseCase() {
  return new GetProfileUseCase(makeOrganizationRepository());
}

