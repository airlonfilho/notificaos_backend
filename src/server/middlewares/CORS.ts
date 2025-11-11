import { NextFunction, Request, Response } from "express";

export const cors = (request: Request, response: Response, next: NextFunction) => {
  
  const allowedOrigins = ['http://localhost:5173'];

  const origin = request.header('origin') || '';
  const isAllowedOrigin = allowedOrigins.includes(origin);
  
  if(isAllowedOrigin){
    response.setHeader('Access-Control-Allow-Origin', origin!);
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    response.setHeader('Acess-Control-Max-Age', '86400');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
  }
 
  next();
}