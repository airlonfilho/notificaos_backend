import type { JwtPayload } from 'jsonwebtoken';
import { InvalidTokenError } from '../../application/errors/InvalidTokenError.js';
import type { IMiddleware, IResponse, IData } from '../../application/interfaces/controllers/IMiddleware.js';
import type { IRequest } from '../../application/interfaces/controllers/IController.js';
import type { ITokenJwtProvider } from '../../application/interfaces/providers/ITokenJWTProvider.js';

export class AuthenticationMiddleware implements IMiddleware {
  constructor(private readonly tokenJwtProvider: ITokenJwtProvider) {}

  async handle(request: IRequest): Promise<IResponse | IData> {
    const { authorization } = request.headers;

    if (!authorization) {
      return {
        statusCode: 400,
        body: { error: 'Token is required' },
      };
    }

    const [bearer, accessToken] = authorization.split(' ');

    try {

      if (!bearer || bearer !== 'Bearer') throw new InvalidTokenError();

      const payload = this.tokenJwtProvider.verify(
        accessToken!,
        process.env.JWT_SECRET!
      ) as JwtPayload;

      return {
        data: {
          organization: {
            id: payload.id,
            loginPhone: payload.loginPhone,
            plan: payload.plan
          },
        },
      };


    } catch {
        
      return {
        statusCode: 401,
        body: {
          error: 'Unauthorized',
        },
      };
    }
  }
}

