import { SignUpController } from '../controllers/SignUpController.js';
import { makeSignUpUseCase } from './makeSignUpUseCase.js';

export function makeSignUpController() {
  return new SignUpController(makeSignUpUseCase());
}



