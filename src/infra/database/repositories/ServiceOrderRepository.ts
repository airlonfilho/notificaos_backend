import type { IServiceOrderRepository } from '../../../application/interfaces/repositories/ServiceOrderRepository.js';
import type { IServiceOrder } from '../../../application/interfaces/entities/ServiceOrder.js';
import { serviceOrderSchema } from '../models/ServiceOrder.js';

export class ServiceOrderRepository implements IServiceOrderRepository {
  async create(data: Omit<IServiceOrder, '_id' | 'createdAt' | 'updatedAt'>): Promise<IServiceOrder> {
    const serviceOrder = await serviceOrderSchema.create(data);
    return serviceOrder.toObject<IServiceOrder>();
  }

  async findById(id: string): Promise<IServiceOrder | null> {
    const serviceOrder = await serviceOrderSchema.findById(id);
    return serviceOrder?.toObject<IServiceOrder>() ?? null;
  }

  async findAll(organizationId: string): Promise<IServiceOrder[]> {
    const serviceOrders = await serviceOrderSchema
      .find({ organizationId })
      .sort({ createdAt: -1 });
    return serviceOrders.map((so) => so.toObject<IServiceOrder>());
  }

  async update(id: string, data: Partial<IServiceOrder>): Promise<IServiceOrder | null> {
    const serviceOrder = await serviceOrderSchema.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    return serviceOrder?.toObject<IServiceOrder>() ?? null;
  }

  async delete(id: string): Promise<void> {
    await serviceOrderSchema.findByIdAndDelete(id);
  }
}

