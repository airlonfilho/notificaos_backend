export class InvalidTokenError extends Error {
  constructor() {
    super('Token inválido ou formato incorreto');
    this.name = 'InvalidTokenError';
  }
}

