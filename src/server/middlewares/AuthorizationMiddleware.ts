import { response } from "express";
import { IRequest } from "../../shared/protocols/IController.js";
import { IMiddleware } from "../../shared/protocols/IMiddleware.js";

export class AuthorizationMiddleware implements IMiddleware{

  constructor(private readonly allowedPlans: string[]){}

  async handle(request: IRequest){

    if(!request.metadata?.organization){
      return {
        statusCode: 401,
        body: {
          error: "Acess denied"
        }
      }
    }

    const { plan } = request.metadata.organization;

    if(!this.allowedPlans.includes(plan)){
      return {
        statusCode: 401,
        body: {
          error: "Acess denied"
        }
      }
    }

    return { data: {} }

  }
}