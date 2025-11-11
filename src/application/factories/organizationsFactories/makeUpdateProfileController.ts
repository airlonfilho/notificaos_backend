import { UpdateProfileController } from '../../../server/controllers/organizationsControllers/UpdateProfileController.js';
import { makeUpdateProfileUseCase } from './makeUpdateProfileUseCase.js';

export function makeUpdateProfileController() {
  return new UpdateProfileController(makeUpdateProfileUseCase());
}

