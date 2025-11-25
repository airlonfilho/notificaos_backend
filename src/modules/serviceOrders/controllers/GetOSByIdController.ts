import type { IController, IRequest, IResponse } from '../../../shared/protocols/IController.js';
import type { GetOSByIdUseCase } from '../useCases/GetOSByIdUseCase.js';
import { ServiceOrderNotFoundError } from '../../../shared/errors/ServiceOrderNotFoundError.js';

export class GetOSByIdController implements IController {
  constructor(private readonly getOSByIdUseCase: GetOSByIdUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const organizationId = request.metadata?.organization?.id;

    if (!organizationId) {
      return {
        statusCode: 401,
        body: { error: 'Token inválido ou expirado' },
      };
    }

    const { id } = request.params || {};

    if (!id) {
      return {
        statusCode: 400,
        body: { error: 'ID da ordem de serviço é obrigatório' },
      };
    }

    try {
      const serviceOrder = await this.getOSByIdUseCase.execute(id, organizationId);

      return {
        statusCode: 200,
        body: { serviceOrder },
      };
    } catch (error) {
      if (error instanceof ServiceOrderNotFoundError) {
        return {
          statusCode: 404,
          body: { error: error.message },
        };
      }

      throw error;
    }
  }
}

