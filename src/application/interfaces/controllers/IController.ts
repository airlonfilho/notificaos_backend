export interface IRequest {
  body?: Record<string, any>;
  headers: Record<string, string>;
  params?: Record<string, string>;
  query?: Record<string, any>;
  metadata?: {
    organization?: {
      id: number;
      loginPhone: string;
      plan: string;
    }
  } | undefined
}

export interface IResponse {
  statusCode: number;
  body: Record<string, any>;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}

