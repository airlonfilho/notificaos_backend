import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { signUpSchema, signInSchema } from '../validations/authSchemas.js';
import { createOSSchema, updateOSSchema } from '../validations/serviceOrderSchemas.js';
import { updateProfileSchema } from '../validations/organizationSchemas.js';
import {
  signUpResponseSchema,
  signInResponseSchema,
  organizationProfileSchema,
  serviceOrderResponseSchema,
  serviceOrderListResponseSchema,
  errorResponseSchema,
  validationErrorResponseSchema,
} from './schemas/responses.js';

const registry = new OpenAPIRegistry();

const workOrderIdParamsSchema = z.object({
  id: z.string().describe('ID da ordem de serviço'),
});


registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
  description: 'Token JWT obtido através do endpoint de login',
});


registry.registerPath({
  method: 'post',
  path: '/auth/sign-up',
  summary: 'Cadastrar nova organização',
  description: 'Cria uma nova organização no sistema',
  tags: ['Autenticação'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: signUpSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Organização criada com sucesso',
      content: {
        'application/json': {
          schema: signUpResponseSchema,
        },
      },
    },
    400: {
      description: 'Erro de validação nos dados enviados',
      content: {
        'application/json': {
          schema: validationErrorResponseSchema,
        },
      },
    },
    409: {
      description: 'Telefone já cadastrado',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/sign-in',
  summary: 'Autenticar organização',
  description: 'Realiza login e retorna um token JWT',
  tags: ['Autenticação'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: signInSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Login realizado com sucesso',
      content: {
        'application/json': {
          schema: signInResponseSchema,
        },
      },
    },
    400: {
      description: 'Erro de validação nos dados enviados',
      content: {
        'application/json': {
          schema: validationErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Credenciais inválidas',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});


registry.registerPath({
  method: 'get',
  path: '/org',
  summary: 'Obter perfil da organização',
  description: 'Retorna os dados completos da organização autenticada',
  tags: ['Organização'],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Perfil retornado com sucesso',
      content: {
        'application/json': {
          schema: organizationProfileSchema,
        },
      },
    },
    401: {
      description: 'Token inválido ou expirado',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    404: {
      description: 'Organização não encontrada',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/org',
  summary: 'Atualizar perfil da organização',
  description: 'Atualiza os dados da organização autenticada',
  tags: ['Organização'],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: updateProfileSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Perfil atualizado com sucesso',
      content: {
        'application/json': {
          schema: organizationProfileSchema,
        },
      },
    },
    400: {
      description: 'Erro de validação nos dados enviados',
      content: {
        'application/json': {
          schema: validationErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Token inválido ou expirado',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    404: {
      description: 'Organização não encontrada',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    409: {
      description: 'E-mail ou CNPJ já cadastrado',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});


registry.registerPath({
  method: 'post',
  path: '/work-orders',
  summary: 'Criar ordem de serviço',
  description: 'Cria uma nova ordem de serviço para a organização autenticada',
  tags: ['Ordens de Serviço'],
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: createOSSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Ordem de serviço criada com sucesso',
      content: {
        'application/json': {
          schema: serviceOrderResponseSchema,
        },
      },
    },
    400: {
      description: 'Erro de validação nos dados enviados',
      content: {
        'application/json': {
          schema: validationErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Token inválido ou expirado',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/work-orders',
  summary: 'Listar ordens de serviço',
  description: 'Retorna todas as ordens de serviço da organização autenticada',
  tags: ['Ordens de Serviço'],
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Lista retornada com sucesso',
      content: {
        'application/json': {
          schema: serviceOrderListResponseSchema,
        },
      },
    },
    401: {
      description: 'Token inválido ou expirado',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/work-orders/{id}',
  summary: 'Obter ordem de serviço específica',
  description: 'Retorna os dados de uma ordem de serviço específica',
  tags: ['Ordens de Serviço'],
  security: [{ bearerAuth: [] }],
  request: {
    params: workOrderIdParamsSchema,
  },
  responses: {
    200: {
      description: 'Ordem de serviço retornada com sucesso',
      content: {
        'application/json': {
          schema: serviceOrderResponseSchema,
        },
      },
    },
    401: {
      description: 'Token inválido ou expirado',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    404: {
      description: 'Ordem de serviço não encontrada',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/work-orders/{id}',
  summary: 'Atualizar ordem de serviço',
  description: 'Atualiza os dados de uma ordem de serviço específica',
  tags: ['Ordens de Serviço'],
  security: [{ bearerAuth: [] }],
  request: {
    params: workOrderIdParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: updateOSSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Ordem de serviço atualizada com sucesso',
      content: {
        'application/json': {
          schema: serviceOrderResponseSchema,
        },
      },
    },
    400: {
      description: 'Erro de validação nos dados enviados',
      content: {
        'application/json': {
          schema: validationErrorResponseSchema,
        },
      },
    },
    401: {
      description: 'Token inválido ou expirado',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    404: {
      description: 'Ordem de serviço não encontrada',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/work-orders/{id}',
  summary: 'Deletar ordem de serviço',
  description: 'Remove uma ordem de serviço específica',
  tags: ['Ordens de Serviço'],
  security: [{ bearerAuth: [] }],
  request: {
    params: workOrderIdParamsSchema,
  },
  responses: {
    204: {
      description: 'Ordem de serviço deletada com sucesso',
    },
    401: {
      description: 'Token inválido ou expirado',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
    404: {
      description: 'Ordem de serviço não encontrada',
      content: {
        'application/json': {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

// ===== GERAR DOCUMENTO OPENAPI ===== //

export const openApiDocument = new OpenApiGeneratorV3(registry.definitions).generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'NotificaOS API',
    version: '1.0.0',
    description: 'API para gerenciamento de ordens de serviço com notificações automatizadas',
    contact: {
      name: 'Suporte NotificaOS',
      email: 'suporte@notificaos.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desenvolvimento',
    },
  ],
  tags: [
    {
      name: 'Autenticação',
      description: 'Endpoints de autenticação e cadastro',
    },
    {
      name: 'Organização',
      description: 'Gerenciamento do perfil da organização',
    },
    {
      name: 'Ordens de Serviço',
      description: 'CRUD completo de ordens de serviço',
    },
  ],
});

