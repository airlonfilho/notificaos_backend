import { ZodError } from 'zod';
import { OrganizationAlreadyExistsError } from '../../../shared/errors/OrganizationAlreadyExistsError.js';
import type { IController, IRequest, IResponse } from '../../../shared/protocols/IController.js';
import type { SignUpUseCase } from '../useCases/SignUpUseCase.js';
import { signUpSchema } from '../../../server/validations/authSchemas.js';

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const data = signUpSchema.parse(body);
      const organization = await this.signUpUseCase.execute(data as any);

      return {
        statusCode: 201,
        body: {
            organization,
        },
      };
    } catch (error) {
        
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof OrganizationAlreadyExistsError) {
        return {
          statusCode: 409,
          body: {
            message: error.message,
          },
        };
      }

      throw error;
    }
  }
}
