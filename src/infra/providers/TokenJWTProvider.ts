import { ITokenJwtProvider } from "../../application/interfaces/providers/ITokenJWTProvider.js";

import jsonwebtoken from "jsonwebtoken";
import { SignOptions, JwtPayload } from "jsonwebtoken";

export class TokenJwtProvider implements ITokenJwtProvider{

  sign(payload: Record<string, any>, secret: string, options?: SignOptions): string{

    const accessToken = jsonwebtoken.sign(payload, secret, options);
    return accessToken;
  }

  verify(token: string, secret: string): string | JwtPayload{

    const isValidToken = jsonwebtoken.verify(token, secret);
    return isValidToken;
  }
}