const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  loginPhone: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  logoUrl: { type: String },
  contact: {
    cnpj: { type: String },
    email: { type: String },
    address: { type: String }
  },
  billing: {
    plan: { type: String, required: true },
    limitOS: { type: Number, required: true },
    currentUsageOS: { type: Number, default: 0 }
  },
  notificationTemplates: {
    onOpen: { type: String },
    onReady: { type: String }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Organization', organizationSchema);
