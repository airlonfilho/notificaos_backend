export class ServiceOrderNotFoundError extends Error {
  constructor() {
    super('Ordem de serviço não encontrada');
    this.name = 'ServiceOrderNotFoundError';
  }
}

