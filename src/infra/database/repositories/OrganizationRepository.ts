import type { IOrganizationRepository } from '../../../application/interfaces/repositories/OrganizationRepository.js';
import type { CreateOrganizationDTO } from '../../../application/interfaces/dtos/CreateOrganizationDTO.js';
import type { IOrganization } from '../../../application/interfaces/entities/Organization.js';
import { OrganizationSchema } from '../models/Organization.js';
import { DuplicateFieldError } from '../../../application/errors/DuplicateFieldError.js';

const DUPLICATE_FIELD_NAMES: Record<string, string> = {
  'contact.email': 'email',
  'contact.cnpj': 'CNPJ',
  'loginPhone': 'telefone',
};

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
    try {
      const organization = await OrganizationSchema.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
      );
      return organization?.toObject<IOrganization>() ?? null;
    } catch (error: any) {
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern || {})[0] || 'desconhecido';
        throw new DuplicateFieldError(DUPLICATE_FIELD_NAMES[field] || field);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    const isDeleted = await OrganizationSchema.findByIdAndDelete(id);
    return !!isDeleted;
  }
}
