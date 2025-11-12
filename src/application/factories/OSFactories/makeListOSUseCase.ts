import { ListOSUseCase } from '../../useCases/serviceOrders/ListOSUseCase.js';
import { makeServiceOrderRepository } from '../makeServiceOrderRepository.js';

export function makeListOSUseCase() {
  return new ListOSUseCase(makeServiceOrderRepository());
}

