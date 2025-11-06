const { body, validationResult } = require('express-validator');

// Middleware to check validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Registration validation
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('loginPhone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^\d{10,11}$/).withMessage('Phone must be 10 or 11 digits'),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

// Login validation
const loginValidation = [
  body('loginPhone').trim().notEmpty().withMessage('Phone is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

// Profile update validation
const profileUpdateValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('logoUrl').optional().isURL().withMessage('Logo URL must be valid'),
  body('contact.email').optional().isEmail().withMessage('Email must be valid'),
  body('contact.cnpj').optional().matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/).withMessage('CNPJ format is invalid'),
  validate
];

// Service order creation validation
const serviceOrderValidation = [
  body('client.name').trim().notEmpty().withMessage('Client name is required'),
  body('client.phone').trim().notEmpty().withMessage('Client phone is required'),
  body('equipment.brand').trim().notEmpty().withMessage('Equipment brand is required'),
  body('equipment.model').trim().notEmpty().withMessage('Equipment model is required'),
  body('equipment.problemReported').trim().notEmpty().withMessage('Problem description is required'),
  body('status').optional().isIn(['Recebido', 'Em Análise', 'Em Reparo', 'Aguardando Peça', 'Pronto', 'Entregue', 'Cancelado'])
    .withMessage('Invalid status'),
  validate
];

module.exports = {
  registerValidation,
  loginValidation,
  profileUpdateValidation,
  serviceOrderValidation
};
