import { DeleteOSUseCase } from '../useCases/DeleteOSUseCase.js';
import { makeServiceOrderRepository } from './makeServiceOrderRepository.js';

export function makeDeleteOSUseCase() {
  return new DeleteOSUseCase(makeServiceOrderRepository());
}

