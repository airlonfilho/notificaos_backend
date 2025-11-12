import { ServiceOrderRepository } from '../../infra/database/repositories/ServiceOrderRepository.js';

export function makeServiceOrderRepository() {
  return new ServiceOrderRepository();
}

