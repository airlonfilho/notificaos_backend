import type {
  IOrganizationContact,
  IOrganizationNotificationTemplates,
} from './Organization.js';

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

