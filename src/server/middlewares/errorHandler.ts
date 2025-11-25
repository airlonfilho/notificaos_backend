import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { DuplicateFieldError } from '../../shared/errors/DuplicateFieldError.js';
import { InvalidCredentialsError } from '../../shared/errors/InvalidCredentialsError.js';
import { InvalidTokenError } from '../../shared/errors/InvalidTokenError.js';
import { OrganizationAlreadyExistsError } from '../../shared/errors/OrganizationAlreadyExistsError.js';
import { OrganizationNotFoundError } from '../../shared/errors/OrganizationNotFoundError.js';
import { ServiceOrderNotFoundError } from '../../shared/errors/ServiceOrderNotFoundError.js';

export function errorHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.error('Error:', {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });

  if (error instanceof ZodError) {
    return response.status(400).json({
      error: 'Validation Error',
      details: error.issues,
    });
  }

  if (error instanceof OrganizationAlreadyExistsError) {
    return response.status(409).json({
      error: error.message,
    });
  }

  if (error instanceof InvalidCredentialsError) {
    return response.status(401).json({
      error: error.message,
    });
  }

  if (error instanceof InvalidTokenError) {
    return response.status(401).json({
      error: error.message,
    });
  }

  if (error instanceof OrganizationNotFoundError) {
    return response.status(404).json({
      error: error.message,
    });
  }

  if (error instanceof DuplicateFieldError) {
    return response.status(409).json({
      error: error.message,
    });
  }

  if (error instanceof ServiceOrderNotFoundError) {
    return response.status(404).json({
      error: error.message,
    });
  }

  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((e: any) => e.message);
    return response.status(400).json({
      error: 'Validation Error',
      details: errors,
    });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || 'campo';
    return response.status(409).json({
      error: `O campo ${field} já está em uso`,
    });
  }

  if (error.name === 'CastError') {
    return response.status(400).json({
      error: 'ID inválido',
    });
  }

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Token inválido',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'Token expirado',
    });
  }

  return response.status(error.status || 500).json({
    error: error.message || 'Erro interno do servidor',
  });
}

