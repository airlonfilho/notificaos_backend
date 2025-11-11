export class DuplicateFieldError extends Error {
  constructor(public readonly field: string) {
    super(`O campo ${field} já está em uso por outra organização`);
    this.name = 'DuplicateFieldError';
  }
}

