import { ServiceOrderRepository } from '../repositories/ServiceOrderRepository.js';

export function makeServiceOrderRepository() {
  return new ServiceOrderRepository();
}
