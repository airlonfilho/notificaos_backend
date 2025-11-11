import { OrganizationNotFoundError } from '../../errors/OrganizationNotFoundError.js';
import type { IOrganizationRepository } from '../../interfaces/repositories/OrganizationRepository.js';

export class GetProfileUseCase {
  constructor(private readonly organizationRepository: IOrganizationRepository) {}

  async execute(organizationId: string) {
    const organization = await this.organizationRepository.findById(organizationId);

    if (!organization) {
      throw new OrganizationNotFoundError();
    }

    const { hashedPassword, ...organizationWithoutPassword } = organization;

    return organizationWithoutPassword;
  }
}

