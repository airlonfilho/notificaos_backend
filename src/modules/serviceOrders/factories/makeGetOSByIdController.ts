import { GetOSByIdController } from '../controllers/GetOSByIdController.js';
import { makeGetOSByIdUseCase } from './makeGetOSByIdUseCase.js';

export function makeGetOSByIdController() {
  return new GetOSByIdController(makeGetOSByIdUseCase());
}

