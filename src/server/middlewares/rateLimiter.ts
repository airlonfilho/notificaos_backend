import rateLimit from 'express-rate-limit';

// Rate limiter geral para todas as rotas
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por windowMs
  message: {
    error: 'Muitas requisições deste IP, tente novamente em 15 minutos.',
  },
  standardHeaders: true, // Retorna informações de rate limit nos headers `RateLimit-*`
  legacyHeaders: false, // Desabilita os headers `X-RateLimit-*`
});

// Rate limiter específico para rotas de autenticação (mais restritivo)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Limite de 5 tentativas de login por windowMs
  message: {
    error: 'Muitas tentativas de login, tente novamente em 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Apenas conta requisições que falharam (opcional)
  skipSuccessfulRequests: true,
});
