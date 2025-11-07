import { Router } from 'express';
import { routeAdapter } from './adapters/routeAdapter.js';
import { makeSignUpController } from '../application/factories/authFactories/makeSignUpController.js';
import { makeSignInController } from '../application/factories/authFactories/makeSignInController.js';

export const router = Router();

router.get('/', (request, response) => {
  response.json({ success: true });
});

router.post('/auth/sign-up', routeAdapter(makeSignUpController()));
router.post('/auth/sign-in', routeAdapter(makeSignInController()));
