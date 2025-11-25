import { UpdateOSController } from '../controllers/UpdateOSController.js';
import { makeUpdateOSUseCase } from './makeUpdateOSUseCase.js';

export function makeUpdateOSController() {
  return new UpdateOSController(makeUpdateOSUseCase());
}

