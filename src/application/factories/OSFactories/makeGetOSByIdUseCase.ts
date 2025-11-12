import { GetOSByIdUseCase } from '../../useCases/serviceOrders/GetOSByIdUseCase.js';
import { makeServiceOrderRepository } from '../makeServiceOrderRepository.js';

export function makeGetOSByIdUseCase() {
  return new GetOSByIdUseCase(makeServiceOrderRepository());
}

