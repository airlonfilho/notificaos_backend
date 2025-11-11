export interface IOrganizationContact {
  cnpj?: string;
  email?: string;
  address?: string;
}

export interface IOrganizationBilling {
  plan: string;
  limitOS: number;
  currentUsageOS: number;
}

export interface IOrganizationNotificationTemplates {
  onOpen?: string;
  onReady?: string;
}

export interface IOrganization {
  _id: string;
  name: string;
  loginPhone: string;
  hashedPassword: string;
  logoUrl?: string;
  contact?: IOrganizationContact;
  billing: IOrganizationBilling;
  notificationTemplates?: IOrganizationNotificationTemplates;
  createdAt: Date;
  updatedAt: Date;
}

