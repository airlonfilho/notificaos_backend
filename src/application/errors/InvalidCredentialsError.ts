export class InvalidCredentialsError extends Error {
  constructor() {
    super('Telefone ou senha inválidos');
    this.name = 'InvalidCredentialsError';
  }
}



