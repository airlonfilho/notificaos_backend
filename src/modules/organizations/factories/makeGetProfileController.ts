import { GetProfileController } from '../controllers/GetProfileController.js';
import { makeGetProfileUseCase } from './makeGetProfileUseCase.js';

export function makeGetProfileController() {
  return new GetProfileController(makeGetProfileUseCase());
}

