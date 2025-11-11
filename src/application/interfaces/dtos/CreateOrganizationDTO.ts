import type {
  IOrganizationBilling,
  IOrganizationContact,
  IOrganizationNotificationTemplates,
} from '../entities/Organization.js';

export interface CreateOrganizationDTO {
  name: string;
  loginPhone: string;
  hashedPassword: string;
  logoUrl?: string;
  contact?: IOrganizationContact;
  billing: {
    plan: string;
    limitOS: number;
    currentUsageOS?: number;
  };
  notificationTemplates?: IOrganizationNotificationTemplates;
}

