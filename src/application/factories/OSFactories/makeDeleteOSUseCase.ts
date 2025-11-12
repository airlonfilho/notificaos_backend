import { DeleteOSUseCase } from '../../useCases/serviceOrders/DeleteOSUseCase.js';
import { makeServiceOrderRepository } from '../makeServiceOrderRepository.js';

export function makeDeleteOSUseCase() {
  return new DeleteOSUseCase(makeServiceOrderRepository());
}

