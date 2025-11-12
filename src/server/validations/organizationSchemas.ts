import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const updateProfileSchema = z
  .object({
    name: z.string()
      .min(2, 'Nome deve ter pelo menos 2 caracteres')
      .max(100, 'Nome muito longo (máximo 100 caracteres)')
      .trim()
      .describe('Nome fantasia da organização')
      .optional(),
    logoUrl: z.string()
      .url('URL de logo inválida')
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
      .strict()
      .openapi({
        example: {
          cnpj: '12345678000199',
          email: 'contato@notificaos.com',
          address: 'Av. Paulista, 1000 - São Paulo/SP',
        },
      })
      .optional(),
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
      .strict()
      .openapi({
        example: {
          onOpen: 'Sua OS foi aberta!',
          onReady: 'Sua OS está pronta para retirada!',
        },
      })
      .optional(),
  })
  .strict()
  .openapi('UpdateProfileRequest', {
    example: {
      name: 'Tech Solutions LTDA',
      logoUrl: 'https://notificaos.com/logo.png',
      contact: {
        cnpj: '12345678000199',
        email: 'contato@notificaos.com',
        address: 'Av. Paulista, 1000 - São Paulo/SP',
      },
      notificationTemplates: {
        onOpen: 'Sua OS foi aberta!',
        onReady: 'Sua OS está pronta para retirada!',
      },
    },
  });

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;

