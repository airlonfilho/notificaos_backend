import type { IController, IRequest, IResponse } from '../../../shared/protocols/IController.js';
import type { ListOSUseCase } from '../useCases/ListOSUseCase.js';

export class ListOSController implements IController {
  constructor(private readonly listOSUseCase: ListOSUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const organizationId = request.metadata?.organization?.id;

    if (!organizationId) {
      return {
        statusCode: 401,
        body: { error: 'Token inválido ou expirado' },
      };
    }

    try {
      const serviceOrders = await this.listOSUseCase.execute(organizationId);

      return {
        statusCode: 200,
        body: { serviceOrders },
      };
    } catch (error) {
      throw error;
    }
  }
}

