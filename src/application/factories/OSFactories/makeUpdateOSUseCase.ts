import { UpdateOSUseCase } from '../../useCases/serviceOrders/UpdateOSUseCase.js';
import { makeServiceOrderRepository } from '../makeServiceOrderRepository.js';

export function makeUpdateOSUseCase() {
  return new UpdateOSUseCase(makeServiceOrderRepository());
}

