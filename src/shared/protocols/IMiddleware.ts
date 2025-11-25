import type { IRequest } from './IController.js';

export interface IResponse {
  statusCode: number;
  body: Record<string, any>;
}

export interface IData {
  data: Record<string, any>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse | IData>;
}

