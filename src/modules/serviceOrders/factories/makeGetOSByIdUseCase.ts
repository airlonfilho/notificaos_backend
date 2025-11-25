import { GetOSByIdUseCase } from '../useCases/GetOSByIdUseCase.js';
import { makeServiceOrderRepository } from './makeServiceOrderRepository.js';

export function makeGetOSByIdUseCase() {
  return new GetOSByIdUseCase(makeServiceOrderRepository());
}

