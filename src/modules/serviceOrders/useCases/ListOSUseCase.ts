import type { IServiceOrderRepository } from '../interfaces/ServiceOrderRepository.js';
import type { IServiceOrder } from '../interfaces/ServiceOrder.js';

export class ListOSUseCase {
  constructor(private readonly serviceOrderRepository: IServiceOrderRepository) {}

  async execute(organizationId: string): Promise<IServiceOrder[]> {
    const serviceOrders = await this.serviceOrderRepository.findAll(organizationId);
    return serviceOrders;
  }
}

