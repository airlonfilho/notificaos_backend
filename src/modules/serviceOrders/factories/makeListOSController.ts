import { ListOSController } from '../controllers/ListOSController.js';
import { makeListOSUseCase } from './makeListOSUseCase.js';

export function makeListOSController() {
  return new ListOSController(makeListOSUseCase());
}

