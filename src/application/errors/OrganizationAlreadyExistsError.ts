export class OrganizationAlreadyExistsError extends Error {
  constructor() {
    super('Organização com este telefone já existe');
    this.name = 'OrganizationAlreadyExistsError';
  }
}



