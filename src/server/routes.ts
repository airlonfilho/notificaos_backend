import { Router } from 'express';
import { routeAdapter } from '../shared/adapters/routeAdapter.js';
import { authLimiter } from './middlewares/rateLimiter.js';
import { makeSignUpController } from '../modules/auth/factories/makeSignUpController.js';
import { makeSignInController } from '../modules/auth/factories/makeSignInController.js';
import { middlewareAdapter } from '../shared/adapters/middlewareAdapter.js';
import { makeAuthenticationMiddleware } from '../modules/auth/factories/makeAuthenticationMiddleware.js';
import { makeAuthorizationMiddleware } from '../modules/auth/factories/makeAuthorizationMiddleware.js';
import { makeGetProfileController } from '../modules/organizations/factories/makeGetProfileController.js';
import { makeUpdateProfileController } from '../modules/organizations/factories/makeUpdateProfileController.js';
import { makeCreateOSController } from '../modules/serviceOrders/factories/makeCreateOSController.js';
import { makeListOSController } from '../modules/serviceOrders/factories/makeListOSController.js';
import { makeGetOSByIdController } from '../modules/serviceOrders/factories/makeGetOSByIdController.js';
import { makeUpdateOSController } from '../modules/serviceOrders/factories/makeUpdateOSController.js';
import { makeDeleteOSController } from '../modules/serviceOrders/factories/makeDeleteOSController.js';

export const router = Router();

router.get('/', (request, response) => {
  response.json({ success: true });
});

router.post('/auth/sign-up', authLimiter, routeAdapter(makeSignUpController()));
router.post('/auth/sign-in', authLimiter, routeAdapter(makeSignInController()));

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