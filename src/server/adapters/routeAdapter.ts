import type { Request, Response } from 'express';
import type { IController, IResponse } from '../../application/interfaces/controllers/IController.js';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      headers: request.headers as Record<string, string>,
      body: request.body,
      params: request.params,
      query: request.query,
      metadata: request.metadata,
    });

    response.status(statusCode).json(body);
  };
}

