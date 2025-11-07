import type { Organization } from '../entities/Organization.js';
import type { CreateOrganizationDTO } from '../dtos/CreateOrganizationDTO.js';

export interface IOrganizationRepository {
  create(data: CreateOrganizationDTO): Promise<Organization>;
  findById(id: string): Promise<Organization | null>;
  findByLoginPhone(loginPhone: string): Promise<Organization | null>;
  update(id: string, data: Partial<Organization>): Promise<Organization | null>;
  delete(id: string): Promise<boolean>;
}

