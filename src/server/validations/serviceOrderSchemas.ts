import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { STATUS_OS } from './constants.js';

extendZodWithOpenApi(z);

export const createOSSchema = z.object({
  humanId: z.string()
    .min(3, 'ID humanizado muito curto (mínimo 3 caracteres)')
    .max(20, 'ID humanizado muito longo (máximo 20 caracteres)')
    .trim()
    .toUpperCase()
    .describe('Identificador humanizado exibido ao cliente'),
  status: z.enum(STATUS_OS).describe('Status atual da ordem de serviço'),
  client: z.object({
    name: z.string()
      .min(3, 'Nome do cliente muito curto (mínimo 3 caracteres)')
      .max(150, 'Nome do cliente muito longo (máximo 150 caracteres)')
      .trim()
      .describe('Nome completo do cliente'),
    phone: z.string()
      .regex(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
      .describe('Telefone de contato do cliente'),
  }).openapi({
    example: {
      name: 'João Silva',
      phone: '11987654321',
    },
  }),
  equipment: z.object({
    brand: z.string()
      .min(2, 'Marca muito curta (mínimo 2 caracteres)')
      .max(50, 'Marca muito longa (máximo 50 caracteres)')
      .trim()
      .describe('Marca do equipamento'),
    model: z.string()
      .min(2, 'Modelo muito curto (mínimo 2 caracteres)')
      .max(100, 'Modelo muito longo (máximo 100 caracteres)')
      .trim()
      .describe('Modelo do equipamento'),
    problemReported: z.string()
      .min(10, 'Descreva melhor o problema (mínimo 10 caracteres)')
      .max(500, 'Descrição muito longa (máximo 500 caracteres)')
      .trim()
      .describe('Problema relatado pelo cliente'),
  }).openapi({
    example: {
      brand: 'Apple',
      model: 'iPhone 13 Pro',
      problemReported: 'Dispositivo não liga e esquenta durante a carga.',
    },
  }),
  observedState: z.array(
    z.string()
      .min(1, 'Estado observado não pode ser vazio')
      .max(100, 'Estado observado muito longo')
      .trim()
      .describe('Descrição de um estado observado do equipamento')
  ).openapi({
    example: ['Carcaça trincada', 'Tela riscada'],
  })
    .optional(),
  accessories: z.array(
    z.string()
      .min(1, 'Acessório não pode ser vazio')
      .max(100, 'Nome do acessório muito longo')
      .trim()
      .describe('Acessório entregue junto com o equipamento')
  ).openapi({
    example: ['Carregador original', 'Cabo USB-C'],
  })
    .optional(),
  notes: z.string()
    .max(1000, 'Observações muito longas (máximo 1000 caracteres)')
    .trim()
    .describe('Observações adicionais relevantes')
    .optional(),
}).strict().openapi('CreateServiceOrderRequest', {
  example: {
    humanId: 'OS-2024-001',
    status: 'Em análise',
    client: {
      name: 'João Silva',
      phone: '11987654321',
    },
    equipment: {
      brand: 'Apple',
      model: 'iPhone 13 Pro',
      problemReported: 'Dispositivo não liga e esquenta durante a carga.',
    },
    observedState: ['Carcaça trincada', 'Tela riscada'],
    accessories: ['Carregador original', 'Cabo USB-C'],
    notes: 'Cliente precisa do aparelho até sexta-feira.',
  },
});

export const updateOSSchema = z.object({
  humanId: z.string()
    .min(3, 'ID humanizado muito curto (mínimo 3 caracteres)')
    .max(20, 'ID humanizado muito longo (máximo 20 caracteres)')
    .trim()
    .toUpperCase()
    .describe('Identificador humanizado exibido ao cliente')
    .optional(),
  status: z.enum(STATUS_OS).describe('Status atual da ordem de serviço').optional(),
  client: z.object({
    name: z.string()
      .min(3, 'Nome do cliente muito curto (mínimo 3 caracteres)')
      .max(150, 'Nome do cliente muito longo (máximo 150 caracteres)')
      .trim()
      .describe('Nome completo do cliente')
      .optional(),
    phone: z.string()
      .regex(/^\d{10,11}$/, 'Telefone deve ter 10 ou 11 dígitos')
      .describe('Telefone de contato do cliente')
      .optional(),
  }).strict()
    .openapi({
      example: {
        name: 'João Silva',
        phone: '11987654321',
      },
    })
    .optional(),
  equipment: z.object({
    brand: z.string()
      .min(2, 'Marca muito curta (mínimo 2 caracteres)')
      .max(50, 'Marca muito longa (máximo 50 caracteres)')
      .trim()
      .describe('Marca do equipamento')
      .optional(),
    model: z.string()
      .min(2, 'Modelo muito curto (mínimo 2 caracteres)')
      .max(100, 'Modelo muito longo (máximo 100 caracteres)')
      .trim()
      .describe('Modelo do equipamento')
      .optional(),
    problemReported: z.string()
      .min(5, 'Descreva melhor o problema (mínimo 5 caracteres)')
      .max(500, 'Descrição muito longa (máximo 500 caracteres)')
      .trim()
      .describe('Problema relatado pelo cliente')
      .optional(),
  }).strict()
    .openapi({
      example: {
        brand: 'Apple',
        model: 'iPhone 13 Pro',
        problemReported: 'Não liga após atualização.',
      },
    })
    .optional(),
  observedState: z.array(
    z.string()
      .min(1, 'Estado observado não pode ser vazio')
      .max(100, 'Estado observado muito longo')
      .trim()
      .describe('Descrição de um estado observado do equipamento')
  ).openapi({
    example: ['Carcaça trincada'],
  })
    .optional(),
  accessories: z.array(
    z.string()
      .min(1, 'Acessório não pode ser vazio')
      .max(100, 'Nome do acessório muito longo')
      .trim()
      .describe('Acessório entregue junto com o equipamento')
  ).openapi({
    example: ['Carregador original'],
  })
    .optional(),
  notes: z.string()
    .max(1000, 'Observações muito longas (máximo 1000 caracteres)')
    .trim()
    .describe('Observações adicionais relevantes')
    .optional(),
}).strict().openapi('UpdateServiceOrderRequest', {
  example: {
    status: 'Pronto para retirada',
    client: {
      name: 'João Silva',
      phone: '11987654321',
    },
    equipment: {
      brand: 'Apple',
      model: 'iPhone 13 Pro',
      problemReported: 'Não liga após atualização.',
    },
    observedState: ['Carcaça trincada'],
    accessories: ['Carregador original'],
    notes: 'Cliente confirmou retirada amanhã.',
  },
});

export type CreateOSDTO = z.infer<typeof createOSSchema>;
export type UpdateOSDTO = z.infer<typeof updateOSSchema>;

