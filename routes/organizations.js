const express = require('express');
const Organization = require('../models/Organization');
const authMiddleware = require('../middleware/auth');
const { profileUpdateValidation } = require('../middleware/validators');

const router = express.Router();

// Get organization profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const organization = await Organization.findById(req.organizationId).select('-hashedPassword');
    
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update organization profile
router.put('/profile', authMiddleware, profileUpdateValidation, async (req, res) => {
  try {
    const { name, logoUrl, contact, notificationTemplates } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (logoUrl) updateData.logoUrl = logoUrl;
    if (contact) updateData.contact = contact;
    if (notificationTemplates) updateData.notificationTemplates = notificationTemplates;

    const organization = await Organization.findByIdAndUpdate(
      req.organizationId,
      updateData,
      { new: true, runValidators: true }
    ).select('-hashedPassword');

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      organization
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update billing settings
router.put('/billing', authMiddleware, async (req, res) => {
  try {
    const { plan, limitOS } = req.body;

    const updateData = {};
    if (plan) updateData['billing.plan'] = plan;
    if (limitOS) updateData['billing.limitOS'] = limitOS;

    const organization = await Organization.findByIdAndUpdate(
      req.organizationId,
      updateData,
      { new: true, runValidators: true }
    ).select('-hashedPassword');

    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json({
      message: 'Billing settings updated successfully',
      organization
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get billing info
router.get('/billing', authMiddleware, async (req, res) => {
  try {
    const organization = await Organization.findById(req.organizationId).select('billing');
    
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    res.json(organization.billing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
