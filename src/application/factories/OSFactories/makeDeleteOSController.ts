import { DeleteOSController } from '../../../server/controllers/serviceOrdersControllers/DeleteOSController.js';
import { makeDeleteOSUseCase } from './makeDeleteOSUseCase.js';

export function makeDeleteOSController() {
  return new DeleteOSController(makeDeleteOSUseCase());
}

