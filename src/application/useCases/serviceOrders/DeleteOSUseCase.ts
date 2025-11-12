import type { IServiceOrderRepository } from '../../interfaces/repositories/ServiceOrderRepository.js';
import { ServiceOrderNotFoundError } from '../../errors/ServiceOrderNotFoundError.js';

export class DeleteOSUseCase {
  constructor(private readonly serviceOrderRepository: IServiceOrderRepository) {}

  async execute(id: string, organizationId: string): Promise<void> {
    const serviceOrder = await this.serviceOrderRepository.findById(id);

    if (!serviceOrder) {
      throw new ServiceOrderNotFoundError();
    }

    if (String(serviceOrder.organizationId) !== organizationId) {
      throw new ServiceOrderNotFoundError();
    }

    await this.serviceOrderRepository.delete(id);
  }
}

