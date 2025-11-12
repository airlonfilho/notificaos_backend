import { UpdateOSController } from '../../../server/controllers/serviceOrdersControllers/UpdateOSController.js';
import { makeUpdateOSUseCase } from './makeUpdateOSUseCase.js';

export function makeUpdateOSController() {
  return new UpdateOSController(makeUpdateOSUseCase());
}

