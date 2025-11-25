export interface IOrganizationContact {
  cnpj?: string | undefined;
  email?: string | undefined;
  address?: string | undefined;
}

export interface IOrganizationBilling {
  plan: string;
  limitOS: number;
  currentUsageOS: number;
}

export interface IOrganizationNotificationTemplates {
  onOpen?: string | undefined;
  onReady?: string | undefined;
}

export interface IOrganization {
  _id: string;
  name: string;
  loginPhone: string;
  hashedPassword: string;
  logoUrl?: string | undefined;
  contact?: IOrganizationContact | undefined;
  billing: IOrganizationBilling;
  notificationTemplates?: IOrganizationNotificationTemplates | undefined;
  createdAt: Date;
  updatedAt: Date;
}

