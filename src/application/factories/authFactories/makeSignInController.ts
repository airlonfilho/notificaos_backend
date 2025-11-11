import { SignInController } from '../../../server/controllers/authControllers/SignInController.js';
import { makeSignInUseCase } from './makeSignInUseCase.js';

export function makeSignInController() {
  return new SignInController(makeSignInUseCase());
}



