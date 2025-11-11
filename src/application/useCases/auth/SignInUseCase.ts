import { InvalidCredentialsError } from '../../errors/InvalidCredentialsError.js';
import type { IHashProvider } from '../../interfaces/providers/IHashProvider.js';
import type { ITokenJwtProvider } from '../../interfaces/providers/ITokenJWTProvider.js';
import type { IOrganizationRepository } from '../../interfaces/repositories/OrganizationRepository.js';

interface IInput {
  loginPhone: string;
  password: string;
}

export class SignInUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
    private readonly hashProvider: IHashProvider,
    private readonly tokenProvider: ITokenJwtProvider,
    private readonly jwtSecret: string
  ) {}

  async execute({ loginPhone, password }: IInput) {
    const organization = await this.organizationRepository.findByLoginPhone(loginPhone);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const isPasswordValid = await this.hashProvider.compare(
      password,
      organization.hashedPassword
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsError();
    }

    const token = this.tokenProvider.sign(
      { id: organization._id, loginPhone: organization.loginPhone, plan: organization.billing.plan },
      this.jwtSecret,
      { expiresIn: '7d' }
    );

    return token;
  }
}

