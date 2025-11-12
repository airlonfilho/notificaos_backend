/**
 * Status válidos para Ordens de Serviço
 * Exportado para uso em outros lugares (frontend, relatórios, etc)
 */
export const STATUS_OS = [
  'Aguardando análise',
  'Em análise',
  'Aguardando peças',
  'Em reparo',
  'Pronto para retirada',
  'Concluído',
  'Cancelado',
] as const;

export type StatusOS = typeof STATUS_OS[number];

