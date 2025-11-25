import { UpdateProfileController } from '../controllers/UpdateProfileController.js';
import { makeUpdateProfileUseCase } from './makeUpdateProfileUseCase.js';

export function makeUpdateProfileController() {
  return new UpdateProfileController(makeUpdateProfileUseCase());
}

