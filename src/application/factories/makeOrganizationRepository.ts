import { OrganizationRepository } from '../../infra/database/repositories/OrganizationRepository.js';

export function makeOrganizationRepository() {
  return new OrganizationRepository();
}



