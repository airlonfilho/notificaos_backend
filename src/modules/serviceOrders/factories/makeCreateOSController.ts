import { CreateOSController } from '../controllers/CreateOSController.js';
import { makeCreateOSUseCase } from './makeCreateOSUseCase.js';

export function makeCreateOSController() {
  return new CreateOSController(makeCreateOSUseCase());
}

