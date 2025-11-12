import { GetOSByIdController } from '../../../server/controllers/serviceOrdersControllers/GetOSByIdController.js';
import { makeGetOSByIdUseCase } from './makeGetOSByIdUseCase.js';

export function makeGetOSByIdController() {
  return new GetOSByIdController(makeGetOSByIdUseCase());
}

