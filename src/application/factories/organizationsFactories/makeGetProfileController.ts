import { GetProfileController } from '../../../server/controllers/organizationsControllers/GetProfileController.js';
import { makeGetProfileUseCase } from './makeGetProfileUseCase.js';

export function makeGetProfileController() {
  return new GetProfileController(makeGetProfileUseCase());
}

