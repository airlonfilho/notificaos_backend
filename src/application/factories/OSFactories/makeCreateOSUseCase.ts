import { CreateOSUseCase } from '../../useCases/serviceOrders/CreateOSUseCase.js';
import { makeServiceOrderRepository } from '../makeServiceOrderRepository.js';

export function makeCreateOSUseCase() {
  return new CreateOSUseCase(makeServiceOrderRepository());
}

