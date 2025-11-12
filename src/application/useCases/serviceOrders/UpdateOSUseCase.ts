import type { IServiceOrderRepository } from '../../interfaces/repositories/ServiceOrderRepository.js';
import type { IServiceOrder } from '../../interfaces/entities/ServiceOrder.js';
import { ServiceOrderNotFoundError } from '../../errors/ServiceOrderNotFoundError.js';
import type { UpdateOSDTO } from '../../../server/validations/serviceOrderSchemas.js';

export class UpdateOSUseCase {
  constructor(private readonly serviceOrderRepository: IServiceOrderRepository) {}

  async execute(id: string, organizationId: string, data: UpdateOSDTO): Promise<IServiceOrder> {
    const serviceOrder = await this.serviceOrderRepository.findById(id);

    if (!serviceOrder) {
      throw new ServiceOrderNotFoundError();
    }

    if (String(serviceOrder.organizationId) !== organizationId) {
      throw new ServiceOrderNotFoundError();
    }

    const updatedServiceOrder = await this.serviceOrderRepository.update(id, data as Partial<IServiceOrder>);

    if (!updatedServiceOrder) {
      throw new ServiceOrderNotFoundError();
    }

    return updatedServiceOrder;
  }
}

