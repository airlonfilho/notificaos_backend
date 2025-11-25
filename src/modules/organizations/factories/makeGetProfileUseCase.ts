import { GetProfileUseCase } from '../useCases/GetProfileUseCase.js';
import { makeOrganizationRepository } from './makeOrganizationRepository.js';

export function makeGetProfileUseCase() {
  return new GetProfileUseCase(makeOrganizationRepository());
}

