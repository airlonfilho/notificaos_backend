import { DeleteOSController } from '../controllers/DeleteOSController.js';
import { makeDeleteOSUseCase } from './makeDeleteOSUseCase.js';

export function makeDeleteOSController() {
  return new DeleteOSController(makeDeleteOSUseCase());
}

