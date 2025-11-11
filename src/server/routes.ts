import { Router } from 'express';
import { routeAdapter } from './adapters/routeAdapter.js';
import { makeSignUpController } from '../application/factories/authFactories/makeSignUpController.js';
import { makeSignInController } from '../application/factories/authFactories/makeSignInController.js';
import { middlewareAdapter } from './adapters/middlewareAdapter.js';
import { makeAuthenticationMiddleware } from '../application/factories/makeAuthenticationMiddleware.js';
import { makeAuthorizationMiddleware } from '../application/factories/makeAuthorizationMiddleware.js';
import { makeGetProfileController } from '../application/factories/organizationsFactories/makeGetProfileController.js';
import { makeUpdateProfileController } from '../application/factories/organizationsFactories/makeUpdateProfileController.js';

export const router = Router();

router.get('/', (request, response) => {
  response.json({ success: true });
});

router.post('/auth/sign-up', routeAdapter(makeSignUpController()));
router.post('/auth/sign-in', routeAdapter(makeSignInController()));

router.get('/organizations/profile',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetProfileController())
);

router.patch('/organizations/profile',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateProfileController())
);

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
