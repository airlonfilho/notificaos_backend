import { z } from 'zod';

export const updateProfileSchema = z
  .object({
    name: z.string().min(1, 'Nome é obrigatório').optional(),
    logoUrl: z.string().url('URL de logo inválida').optional(),
    contact: z
      .object({
        cnpj: z.string().optional(),
        email: z.string().email('E-mail inválido').optional(),
        address: z.string().optional(),
      })
      .strict()
      .optional(),
    notificationTemplates: z
      .object({
        onOpen: z.string().optional(),
        onReady: z.string().optional(),
      })
      .strict()
      .optional(),
  })
  .strict();

export type UpdateProfileDTO = z.infer<typeof updateProfileSchema>;

