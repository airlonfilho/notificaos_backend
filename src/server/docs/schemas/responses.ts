import { z } from 'zod';


export const signUpResponseSchema = z.object({
  organization: z.object({
    id: z.string().describe('ID único da organização'),
    name: z.string().describe('Nome da organização'),
    loginPhone: z.string().describe('Telefone de login'),
  }),
}).openapi('SignUpResponse');

export const signInResponseSchema = z.object({
  accessToken: z.string().describe('Token JWT de acesso'),
}).openapi('SignInResponse');


export const organizationProfileSchema = z.object({
  organization: z.object({
    _id: z.string().describe('ID único da organização'),
    name: z.string().describe('Nome da organização'),
    loginPhone: z.string().describe('Telefone de login'),
    logoUrl: z.string().optional().describe('URL do logo'),
    contact: z.object({
      cnpj: z.string().optional().describe('CNPJ da organização'),
      email: z.string().optional().describe('E-mail de contato'),
      address: z.string().optional().describe('Endereço'),
    }).optional(),
    billing: z.object({
      plan: z.string().describe('Plano contratado'),
      limitOS: z.number().describe('Limite de ordens de serviço'),
      currentUsageOS: z.number().describe('Uso atual de ordens de serviço'),
    }),
    notificationTemplates: z.object({
      onOpen: z.string().optional().describe('Template de notificação ao abrir OS'),
      onReady: z.string().optional().describe('Template de notificação ao finalizar OS'),
    }).optional(),
    createdAt: z.string().describe('Data de criação'),
    updatedAt: z.string().describe('Data de última atualização'),
  }),
}).openapi('OrganizationProfileResponse');


export const serviceOrderSchema = z.object({
  _id: z.string().describe('ID único da ordem de serviço'),
  organizationId: z.string().describe('ID da organização proprietária'),
  humanId: z.string().describe('ID humanizado (ex: OS-2024-001)'),
  status: z.string().describe('Status da ordem de serviço'),
  client: z.object({
    name: z.string().describe('Nome do cliente'),
    phone: z.string().describe('Telefone do cliente'),
  }),
  equipment: z.object({
    brand: z.string().describe('Marca do equipamento'),
    model: z.string().describe('Modelo do equipamento'),
    problemReported: z.string().describe('Problema relatado pelo cliente'),
  }),
  observedState: z.array(z.string()).optional().describe('Estados observados do equipamento'),
  accessories: z.array(z.string()).optional().describe('Acessórios recebidos'),
  notes: z.string().optional().describe('Observações adicionais'),
  createdAt: z.string().describe('Data de criação'),
  updatedAt: z.string().describe('Data de última atualização'),
}).openapi('ServiceOrder');

export const serviceOrderResponseSchema = z.object({
  serviceOrder: serviceOrderSchema,
}).openapi('ServiceOrderResponse');

export const serviceOrderListResponseSchema = z.object({
  serviceOrders: z.array(serviceOrderSchema),
}).openapi('ServiceOrderListResponse');


export const errorResponseSchema = z.object({
  error: z.string().describe('Mensagem de erro'),
}).openapi('ErrorResponse');

export const validationErrorResponseSchema = z.object({
  error: z.string().describe('Tipo do erro'),
  details: z.array(z.object({
    code: z.string(),
    message: z.string(),
    path: z.array(z.union([z.string(), z.number()])),
  })).describe('Detalhes dos erros de validação'),
}).openapi('ValidationErrorResponse');

