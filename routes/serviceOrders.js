const express = require('express');
const ServiceOrder = require('../models/ServiceOrder');
const Organization = require('../models/Organization');
const authMiddleware = require('../middleware/auth');
const { serviceOrderValidation } = require('../middleware/validators');

const router = express.Router();

// Create new service order
router.post('/', authMiddleware, serviceOrderValidation, async (req, res) => {
  try {
    const { client, equipment, observedState, accessories, notes, status = 'Recebido' } = req.body;

    // Validate required fields
    if (!client?.name || !client?.phone || !equipment?.brand || !equipment?.model || !equipment?.problemReported) {
      return res.status(400).json({ error: 'Client name, phone, equipment brand, model, and problem are required' });
    }

    // Check billing limit
    const organization = await Organization.findById(req.organizationId);
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }

    if (organization.billing.currentUsageOS >= organization.billing.limitOS) {
      return res.status(403).json({ error: 'Service order limit reached. Please upgrade your plan.' });
    }

    // Generate human-friendly ID
    const count = await ServiceOrder.countDocuments({ organizationId: req.organizationId });
    const humanId = `#${String(count + 1).padStart(3, '0')}`;

    // Create service order
    const serviceOrder = new ServiceOrder({
      organizationId: req.organizationId,
      humanId,
      status,
      client,
      equipment,
      observedState: observedState || [],
      accessories: accessories || [],
      notes: notes || ''
    });

    await serviceOrder.save();

    // Update organization usage
    organization.billing.currentUsageOS += 1;
    await organization.save();

    res.status(201).json({
      message: 'Service order created successfully',
      serviceOrder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all service orders for the organization
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status } = req.query;
    
    const filter = { organizationId: req.organizationId };
    if (status) {
      filter.status = status;
    }

    const serviceOrders = await ServiceOrder.find(filter).sort({ createdAt: -1 });

    res.json(serviceOrders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single service order
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const serviceOrder = await ServiceOrder.findOne({
      _id: req.params.id,
      organizationId: req.organizationId
    });

    if (!serviceOrder) {
      return res.status(404).json({ error: 'Service order not found' });
    }

    res.json(serviceOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update service order
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, client, equipment, observedState, accessories, notes } = req.body;

    const updateData = { updatedAt: Date.now() };
    if (status) updateData.status = status;
    if (client) updateData.client = client;
    if (equipment) updateData.equipment = equipment;
    if (observedState) updateData.observedState = observedState;
    if (accessories) updateData.accessories = accessories;
    if (notes !== undefined) updateData.notes = notes;

    const serviceOrder = await ServiceOrder.findOneAndUpdate(
      { _id: req.params.id, organizationId: req.organizationId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!serviceOrder) {
      return res.status(404).json({ error: 'Service order not found' });
    }

    res.json({
      message: 'Service order updated successfully',
      serviceOrder
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete service order
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const serviceOrder = await ServiceOrder.findOneAndDelete({
      _id: req.params.id,
      organizationId: req.organizationId
    });

    if (!serviceOrder) {
      return res.status(404).json({ error: 'Service order not found' });
    }

    // Update organization usage
    const organization = await Organization.findById(req.organizationId);
    if (organization && organization.billing.currentUsageOS > 0) {
      organization.billing.currentUsageOS -= 1;
      await organization.save();
    }

    res.json({ message: 'Service order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
