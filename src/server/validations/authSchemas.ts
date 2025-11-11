import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  loginPhone: z.string().regex(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  logoUrl: z.string().url().optional(),
  contact: z
    .object({
      cnpj: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional(),
    })
    .optional(),
  billing: z
    .object({
      plan: z.string().default('Plano Starter'),
      limitOS: z.number().int().positive().default(50),
    })
    .default({ plan: 'Plano Starter', limitOS: 50 }),
  notificationTemplates: z
    .object({
      onOpen: z.string().optional(),
      onReady: z.string().optional(),
    })
    .optional(),
});

export const signInSchema = z.object({
  loginPhone: z.string().min(1, 'Telefone é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

