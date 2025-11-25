import { ZodError } from 'zod';
import { DuplicateFieldError } from '../../../shared/errors/DuplicateFieldError.js';
import { OrganizationNotFoundError } from '../../../shared/errors/OrganizationNotFoundError.js';
import type { IController, IRequest, IResponse } from '../../../shared/protocols/IController.js';
import type { UpdateProfileUseCase } from '../useCases/UpdateProfileUseCase.js';
import { updateProfileSchema } from '../../../server/validations/organizationSchemas.js';

export class UpdateProfileController implements IController {
  constructor(private readonly updateProfileUseCase: UpdateProfileUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const organizationId = request.metadata?.organization?.id;

    if (!organizationId) {
      return {
        statusCode: 401,
        body: {
          message: 'Unauthorized',
        },
      };
    }

    try {
      const data = updateProfileSchema.parse(request.body);
      const profile = await this.updateProfileUseCase.execute(organizationId, data);

      return {
        statusCode: 200,
        body: {
          profile,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof DuplicateFieldError) {
        return {
          statusCode: 409,
          body: {
            message: error.message,
          },
        };
      }

      if (error instanceof OrganizationNotFoundError) {
        return {
          statusCode: 404,
          body: {
            message: error.message,
          },
        };
      }

      throw error;
    }
  }
}

