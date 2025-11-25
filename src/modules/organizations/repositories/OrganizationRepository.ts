import type { IOrganizationRepository } from '../interfaces/OrganizationRepository.js';
import type { CreateOrganizationDTO } from '../interfaces/CreateOrganizationDTO.js';
import type { IOrganization } from '../interfaces/Organization.js';
import { organizationSchema } from '../models/Organization.js';
import { DuplicateFieldError } from '../../../shared/errors/DuplicateFieldError.js';

const DUPLICATE_FIELD_NAMES: Record<string, string> = {
  'contact.email': 'email',
  'contact.cnpj': 'CNPJ',
  'loginPhone': 'telefone',
};

export class OrganizationRepository implements IOrganizationRepository {
    
  async create(data: CreateOrganizationDTO): Promise<IOrganization> {
    const doc = await organizationSchema.create(data);
    return doc.toObject<IOrganization>();
  }

  async findById(id: string): Promise<IOrganization | null> {
    const organization = await organizationSchema.findById(id);
    return organization?.toObject<IOrganization>() ?? null;
  }

  async findByLoginPhone(loginPhone: string): Promise<IOrganization | null> {
    const organization = await organizationSchema.findOne({ loginPhone });
    return organization?.toObject<IOrganization>() ?? null;
  }

  async update(id: string, data: Partial<IOrganization>): Promise<IOrganization | null> {
    try {
      const organization = await organizationSchema.findByIdAndUpdate(
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
    const isDeleted = await organizationSchema.findByIdAndDelete(id);
    return !!isDeleted;
  }
}
