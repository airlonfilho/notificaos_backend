import { ZodError } from 'zod';
import { InvalidCredentialsError } from '../../../application/errors/InvalidCredentialsError.js';
import type { IController, IRequest, IResponse } from '../../../application/interfaces/controllers/IController.js';
import type { SignInUseCase } from '../../../application/useCases/auth/SignInUseCase.js';
import { signInSchema } from '../../validations/authSchemas.js';

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const data = signInSchema.parse(body);
      const acessToken = await this.signInUseCase.execute(data);

      return {
        statusCode: 200,
        body: {
            acessToken
        },
      };

    } catch (error) {
      
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof InvalidCredentialsError) {
        return {
          statusCode: 401,
          body: {
            message: error.message,
          },
        };
      }

      throw error;
    }
  }
}
