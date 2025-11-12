import { CreateOSController } from '../../../server/controllers/serviceOrdersControllers/CreateOSController.js';
import { makeCreateOSUseCase } from './makeCreateOSUseCase.js';

export function makeCreateOSController() {
  return new CreateOSController(makeCreateOSUseCase());
}

