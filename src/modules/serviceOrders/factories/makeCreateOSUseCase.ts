import { CreateOSUseCase } from '../useCases/CreateOSUseCase.js';
import { makeServiceOrderRepository } from './makeServiceOrderRepository.js';

export function makeCreateOSUseCase() {
  return new CreateOSUseCase(makeServiceOrderRepository());
}

