import type { NextFunction, Request, Response } from 'express';
import type { IMiddleware } from '../../application/interfaces/controllers/IMiddleware.js';

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const responseMiddleware = await middleware.handle({
      headers: request.headers as Record<string, string>,
      body: request.body,
      params: request.params,
      query: request.query,
    });

    if ('statusCode' in responseMiddleware) {
      return response.status(responseMiddleware.statusCode).json(responseMiddleware.body);
    }

    request.metadata = {
      ...request.metadata,
      ...responseMiddleware.data,
    };

    next();
  };
}

