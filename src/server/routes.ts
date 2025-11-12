import { Router } from 'express';
import { routeAdapter } from './adapters/routeAdapter.js';
import { makeSignUpController } from '../application/factories/authFactories/makeSignUpController.js';
import { makeSignInController } from '../application/factories/authFactories/makeSignInController.js';
import { middlewareAdapter } from './adapters/middlewareAdapter.js';
import { makeAuthenticationMiddleware } from '../application/factories/middlewaresFactories/makeAuthenticationMiddleware.js';
import { makeAuthorizationMiddleware } from '../application/factories/middlewaresFactories/makeAuthorizationMiddleware.js';
import { makeGetProfileController } from '../application/factories/organizationsFactories/makeGetProfileController.js';
import { makeUpdateProfileController } from '../application/factories/organizationsFactories/makeUpdateProfileController.js';
import { makeCreateOSController } from '../application/factories/OSFactories/makeCreateOSController.js';
import { makeListOSController } from '../application/factories/OSFactories/makeListOSController.js';
import { makeGetOSByIdController } from '../application/factories/OSFactories/makeGetOSByIdController.js';
import { makeUpdateOSController } from '../application/factories/OSFactories/makeUpdateOSController.js';
import { makeDeleteOSController } from '../application/factories/OSFactories/makeDeleteOSController.js';

export const router = Router();

router.get('/', (request, response) => {
  response.json({ success: true });
});

router.post('/auth/sign-up', routeAdapter(makeSignUpController()));
router.post('/auth/sign-in', routeAdapter(makeSignInController()));

router.get('/org',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetProfileController())
);

router.patch('/org',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateProfileController())
);

router.get('/work-orders',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListOSController())
);

router.get('/work-orders/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeGetOSByIdController())
);

router.patch('/work-orders/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateOSController())
);

router.delete('/work-orders/:id',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteOSController())
);

router.post('/work-orders',
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateOSController())
);

router.post('/testAuthorization',
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(['Plano Premium', 'Plano Profissional'])),
  (request, response) => {
    response.json({success: true});
  }
);