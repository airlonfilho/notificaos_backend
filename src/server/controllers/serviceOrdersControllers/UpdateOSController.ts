import type { IController, IRequest, IResponse } from '../../../application/interfaces/controllers/IController.js';
import type { UpdateOSUseCase } from '../../../application/useCases/serviceOrders/UpdateOSUseCase.js';
import { updateOSSchema } from '../../validations/serviceOrderSchemas.js';
import { ZodError } from 'zod';
import { ServiceOrderNotFoundError } from '../../../application/errors/ServiceOrderNotFoundError.js';

export class UpdateOSController implements IController {
  constructor(private readonly updateOSUseCase: UpdateOSUseCase) {}

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
      const validatedData = updateOSSchema.parse(request.body);

      const serviceOrder = await this.updateOSUseCase.execute(id, organizationId, validatedData);

      return {
        statusCode: 200,
        body: { serviceOrder },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: 'Validation Error', details: error.issues },
        };
      }

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

