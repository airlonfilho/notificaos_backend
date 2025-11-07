import { OrganizationAlreadyExistsError } from '../../errors/OrganizationAlreadyExistsError.js';
import type { IHashProvider } from '../../interfaces/providers/IHashProvider.js';
import type { IOrganizationRepository } from '../../interfaces/repositories/OrganizationRepository.js';

interface IInput {
  name: string;
  loginPhone: string;
  password: string;
  logoUrl?: string;
  contact?: {
    cnpj?: string;
    email?: string;
    address?: string;
  };
  billing: {
    plan: string;
    limitOS: number;
  };
  notificationTemplates?: {
    onOpen?: string;
    onReady?: string;
  };
}

export class SignUpUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly hashProvider: IHashProvider,
  ) {}

  async execute(input: IInput) {
    const organizationAlreadyExists = await this.organizationRepository.findByLoginPhone(
      input.loginPhone
    );

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError();
    }

    const hashedPassword = await this.hashProvider.hash(input.password);

    const organization = await this.organizationRepository.create({...input, hashedPassword});

    return {
      id: organization._id,
      name: organization.name,
      loginPhone: organization.loginPhone,
    };
  }
}
