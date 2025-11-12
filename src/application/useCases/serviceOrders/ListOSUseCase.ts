import type { IServiceOrderRepository } from '../../interfaces/repositories/ServiceOrderRepository.js';
import type { IServiceOrder } from '../../interfaces/entities/ServiceOrder.js';

export class ListOSUseCase {
  constructor(private readonly serviceOrderRepository: IServiceOrderRepository) {}

  async execute(organizationId: string): Promise<IServiceOrder[]> {
    const serviceOrders = await this.serviceOrderRepository.findAll(organizationId);
    return serviceOrders;
  }
}

