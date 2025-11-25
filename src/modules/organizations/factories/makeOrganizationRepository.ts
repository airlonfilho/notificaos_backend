import { OrganizationRepository } from '../repositories/OrganizationRepository.js';

export function makeOrganizationRepository() {
  return new OrganizationRepository();
}
