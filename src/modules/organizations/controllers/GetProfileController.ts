import { OrganizationNotFoundError } from '../../../shared/errors/OrganizationNotFoundError.js';
import type { IController, IRequest, IResponse } from '../../../shared/protocols/IController.js';
import type { GetProfileUseCase } from '../useCases/GetProfileUseCase.js';

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
      const organization = await this.getProfileUseCase.execute(organizationId);

      return {
        statusCode: 200,
        body: {
          organization,
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

