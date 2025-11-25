import { UpdateOSUseCase } from '../useCases/UpdateOSUseCase.js';
import { makeServiceOrderRepository } from './makeServiceOrderRepository.js';

export function makeUpdateOSUseCase() {
  return new UpdateOSUseCase(makeServiceOrderRepository());
}

