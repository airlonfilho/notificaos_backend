import { SignUpController } from '../../../server/controllers/authControllers/SignUpController.js';
import { makeSignUpUseCase } from './makeSignUpUseCase.js';

export function makeSignUpController() {
  return new SignUpController(makeSignUpUseCase());
}



