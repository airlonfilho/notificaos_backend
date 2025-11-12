import { ListOSController } from '../../../server/controllers/serviceOrdersControllers/ListOSController.js';
import { makeListOSUseCase } from './makeListOSUseCase.js';

export function makeListOSController() {
  return new ListOSController(makeListOSUseCase());
}

