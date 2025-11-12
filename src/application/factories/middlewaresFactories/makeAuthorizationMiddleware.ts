import { AuthorizationMiddleware } from "../../../server/middlewares/AuthorizationMiddleware.js";

export function makeAuthorizationMiddleware(allowedPlans: string[]){
  return new AuthorizationMiddleware(allowedPlans);
}