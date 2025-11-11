import type { IOrganization } from '../entities/Organization.js';
import type { CreateOrganizationDTO } from '../dtos/CreateOrganizationDTO.js';

export interface IOrganizationRepository {
  create(data: CreateOrganizationDTO): Promise<IOrganization>;
  findById(id: string): Promise<IOrganization | null>;
  findByLoginPhone(loginPhone: string): Promise<IOrganization | null>;
  update(id: string, data: Partial<IOrganization>): Promise<IOrganization | null>;
  delete(id: string): Promise<boolean>;
}

