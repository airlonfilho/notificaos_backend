import { SignInController } from '../controllers/SignInController.js';
import { makeSignInUseCase } from './makeSignInUseCase.js';

export function makeSignInController() {
  return new SignInController(makeSignInUseCase());
}



