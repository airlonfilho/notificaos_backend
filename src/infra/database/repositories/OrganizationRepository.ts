import type { IOrganizationRepository } from '../../../application/interfaces/repositories/OrganizationRepository.js';
import type { CreateOrganizationDTO } from '../../../application/interfaces/dtos/CreateOrganizationDTO.js';
import type { IOrganization } from '../../../application/interfaces/entities/Organization.js';
import {  OrganizationSchema } from '../models/Organization.js';

export class OrganizationRepository implements IOrganizationRepository {
    
  async create(data: CreateOrganizationDTO): Promise<IOrganization> {
    const doc = await OrganizationSchema.create(data);
    return doc.toObject<IOrganization>();
  }

  async findById(id: string): Promise<IOrganization | null> {
    const organization = await OrganizationSchema.findById(id);
    return organization?.toObject<IOrganization>() ?? null;
  }

  async findByLoginPhone(loginPhone: string): Promise<IOrganization | null> {
    const organization = await OrganizationSchema.findOne({ loginPhone });
    return organization?.toObject<IOrganization>() ?? null;
  }

  async update(id: string, data: Partial<IOrganization>): Promise<IOrganization | null> {
    const organization = await OrganizationSchema.findByIdAndUpdate(id, data, { new: true });
    return organization?.toObject<IOrganization>() ?? null;
  }

  async delete(id: string): Promise<boolean> {
    const isDeleted = await OrganizationSchema.findByIdAndDelete(id).exec();

    return !!isDeleted;
  }
}
