import { OrganizationNotFoundError } from '../../errors/OrganizationNotFoundError.js';
import type { IOrganizationRepository } from '../../interfaces/repositories/OrganizationRepository.js';
import type { IOrganization } from '../../interfaces/entities/Organization.js';
import type { UpdateProfileDTO } from '../../../server/validations/organizationSchemas.js';

export class UpdateProfileUseCase {
  constructor(private readonly organizationRepository: IOrganizationRepository) {}

  async execute(organizationId: string, data: UpdateProfileDTO) {
    const updatedOrganization = await this.organizationRepository.update(
      organizationId, 
      data as Partial<IOrganization>
    );

    if (!updatedOrganization) {
      throw new OrganizationNotFoundError();
    }

    const { hashedPassword, ...organizationWithoutPassword } = updatedOrganization;

    return organizationWithoutPassword;
  }
}

