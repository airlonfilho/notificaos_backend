import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const signUpSchema = z.object({
  name: z.string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .trim()
    .max(100, 'Nome muito longo (máximo 100 caracteres)')
    .describe('Nome fantasia da organização'),
  loginPhone: z.string()
    .regex(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
    .describe('Telefone usado como login, apenas dígitos'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(128, 'Senha muito longa (máximo 128 caracteres)')
    .describe('Senha com no mínimo 8 caracteres'),
  logoUrl: z.string()
    .url('URL inválida')
    .regex(/^https:\/\//, 'URL deve usar HTTPS')
    .max(500, 'URL muito longa')
    .describe('URL pública do logo')
    .optional(),
  contact: z
    .object({
      cnpj: z.string()
        .regex(/^\d{14}$/, 'CNPJ deve ter 14 dígitos numéricos')
        .describe('CNPJ da organização com 14 dígitos')
        .optional(),
      email: z.string()
        .email('E-mail inválido')
        .toLowerCase()
        .max(255, 'E-mail muito longo')
        .describe('E-mail principal da organização')
        .optional(),
      address: z.string()
        .min(10, 'Endereço muito curto (mínimo 10 caracteres)')
        .max(200, 'Endereço muito longo (máximo 200 caracteres)')
        .trim()
        .describe('Endereço comercial completo')
        .optional(),
    })
    .openapi({
      example: {
        cnpj: '12345678000199',
        email: 'contato@notificaos.com',
        address: 'Av. Paulista, 1000 - São Paulo/SP',
      },
    })
    .optional(),
  billing: z
    .object({
      plan: z.string()
        .default('Plano Starter')
        .describe('Plano contratado'),
      limitOS: z.number()
        .int('Limite deve ser número inteiro')
        .positive('Limite deve ser positivo')
        .max(10000, 'Limite muito alto (máximo 10.000)')
        .default(50)
        .describe('Quantidade máxima de OS permitidas no plano'),
    })
    .openapi({
      example: {
        plan: 'Plano Starter',
        limitOS: 50,
      },
    })
    .default({ plan: 'Plano Starter', limitOS: 50 }),
  notificationTemplates: z
    .object({
      onOpen: z.string()
        .min(2, 'Template muito curto (mínimo 2 caracteres)')
        .max(500, 'Template muito longo (máximo 500 caracteres)')
        .trim()
        .describe('Template enviado quando a OS é criada')
        .optional(),
      onReady: z.string()
        .min(2, 'Template muito curto (mínimo 2 caracteres)')
        .max(500, 'Template muito longo (máximo 500 caracteres)')
        .trim()
        .describe('Template enviado na conclusão da OS')
        .optional(),
    })
    .openapi({
      example: {
        onOpen: 'Sua OS foi aberta!',
        onReady: 'Sua OS está pronta para retirada!',
      },
    })
    .optional(),
}).strict().openapi('SignUpRequest', {
  example: {
    name: 'Tech Solutions LTDA',
    loginPhone: '11987654321',
    password: 'SenhaForte123',
    logoUrl: 'https://notificaos.com/logo.png',
    contact: {
      cnpj: '12345678000199',
      email: 'contato@notificaos.com',
      address: 'Av. Paulista, 1000 - São Paulo/SP',
    },
    billing: {
      plan: 'Plano Starter',
      limitOS: 50,
    },
    notificationTemplates: {
      onOpen: 'Sua OS foi aberta!',
      onReady: 'Sua OS está pronta para retirada!',
    },
  },
});

export const signInSchema = z.object({
  loginPhone: z.string()
    .regex(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
    .describe('Telefone usado como login, apenas dígitos'),
  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(128, 'Senha muito longa')
    .describe('Senha com no mínimo 8 caracteres'),
}).strict().openapi('SignInRequest', {
  example: {
    loginPhone: '11987654321',
    password: 'SenhaForte123',
  },
});

