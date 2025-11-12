import type { IServiceOrder } from '../entities/ServiceOrder.js';

export interface IServiceOrderRepository {
  create(data: Omit<IServiceOrder, '_id' | 'createdAt' | 'updatedAt'>): Promise<IServiceOrder>;
  findById(id: string): Promise<IServiceOrder | null>;
  findAll(organizationId: string): Promise<IServiceOrder[]>;
  update(id: string, data: Partial<IServiceOrder>): Promise<IServiceOrder | null>;
  delete(id: string): Promise<void>;
}

