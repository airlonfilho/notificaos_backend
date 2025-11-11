import { Router } from 'express';
import { routeAdapter } from './adapters/routeAdapter.js';
import { makeSignUpController } from '../application/factories/authFactories/makeSignUpController.js';
import { makeSignInController } from '../application/factories/authFactories/makeSignInController.js';
import { middlewareAdapter } from './adapters/middlewareAdapter.js';
import { makeAuthenticationMiddleware } from '../application/factories/makeAuthenticationMiddleware.js';
import { makeAuthorizationMiddleware } from '../application/factories/makeAuthorizationMiddleware.js';

export const router = Router();

router.get('/', (request, response) => {
  response.json({ success: true });
});

router.post('/auth/sign-up', routeAdapter(makeSignUpController()));
router.post('/auth/sign-in', routeAdapter(makeSignInController()));
router.get('/os', middlewareAdapter(makeAuthenticationMiddleware()), (request, response) => {
  response.json({success: true});
});

router.post('/os',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(
    ["Plano Profissional", "Plano Premium"]
  )),
(request, response) => {
  response.json({access: true});
});
