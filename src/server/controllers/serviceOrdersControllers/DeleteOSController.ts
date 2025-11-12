import type { IController, IRequest, IResponse } from '../../../application/interfaces/controllers/IController.js';
import type { DeleteOSUseCase } from '../../../application/useCases/serviceOrders/DeleteOSUseCase.js';
import { ServiceOrderNotFoundError } from '../../../application/errors/ServiceOrderNotFoundError.js';

export class DeleteOSController implements IController {
  constructor(private readonly deleteOSUseCase: DeleteOSUseCase) {}

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
      await this.deleteOSUseCase.execute(id, organizationId);

      return {
        statusCode: 204,
        body: {},
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

