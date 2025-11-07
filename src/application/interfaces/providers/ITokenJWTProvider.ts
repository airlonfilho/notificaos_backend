import { SignOptions, JwtPayload } from "jsonwebtoken";

export interface ITokenJwtProvider {
  sign(payload: Record<string, any>, secret: string, options?: SignOptions): string;
  verify(token: string, secret: string): string | JwtPayload;
}