import type { IServiceOrderRepository } from '../interfaces/ServiceOrderRepository.js';
import type { IServiceOrder } from '../interfaces/ServiceOrder.js';
import { ServiceOrderNotFoundError } from '../../../shared/errors/ServiceOrderNotFoundError.js';

export class GetOSByIdUseCase {
  constructor(private readonly serviceOrderRepository: IServiceOrderRepository) {}

  async execute(id: string, organizationId: string): Promise<IServiceOrder> {
    const serviceOrder = await this.serviceOrderRepository.findById(id);

    if (!serviceOrder) {
      throw new ServiceOrderNotFoundError();
    }

    if (String(serviceOrder.organizationId)!== organizationId) {
      throw new ServiceOrderNotFoundError();
    }

    return serviceOrder;
  }
}

