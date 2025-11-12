import type { IController, IRequest, IResponse } from '../../../application/interfaces/controllers/IController.js';
import type { CreateOSUseCase } from '../../../application/useCases/serviceOrders/CreateOSUseCase.js';
import { createOSSchema } from '../../validations/serviceOrderSchemas.js';
import { ZodError } from 'zod';

export class CreateOSController implements IController {
  constructor(private readonly createOSUseCase: CreateOSUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const organizationId = request.metadata?.organization?.id;

    if (!organizationId) {
      return {
        statusCode: 401,
        body: { error: 'Token inválido ou expirado' },
      };
    }

    try {
      const validatedData = createOSSchema.parse(request.body);

      const serviceOrder = await this.createOSUseCase.execute({
        organizationId,
        ...validatedData,
      });

      return {
        statusCode: 201,
        body: { serviceOrder },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: 'Validation Error', details: error.issues },
        };
      }

      throw error;
    }
  }
}

