import type { IServiceOrderRepository } from '../interfaces/ServiceOrderRepository.js';
import type { IServiceOrder } from '../interfaces/ServiceOrder.js';

export class CreateOSUseCase {
  constructor(
    private readonly serviceOrderRepository: IServiceOrderRepository
  ) {}

  async execute(data: Omit<IServiceOrder, '_id' | 'createdAt' | 'updatedAt'>): Promise<IServiceOrder> {
    const serviceOrder = await this.serviceOrderRepository.create(data);
    return serviceOrder;
  }
}

