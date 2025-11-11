import { OrganizationNotFoundError } from '../../../application/errors/OrganizationNotFoundError.js';
import type { IController, IRequest, IResponse } from '../../../application/interfaces/controllers/IController.js';
import type { GetProfileUseCase } from '../../../application/useCases/organizations/GetProfileUseCase.js';

export class GetProfileController implements IController {
  constructor(private readonly getProfileUseCase: GetProfileUseCase) {}

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
      const profile = await this.getProfileUseCase.execute(organizationId);

      return {
        statusCode: 200,
        body: {
          profile,
        },
      };
    } catch (error) {
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

