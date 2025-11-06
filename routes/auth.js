const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Organization = require('../models/Organization');
const { registerValidation, loginValidation } = require('../middleware/validators');

const router = express.Router();

// Register new organization
router.post('/register', registerValidation, async (req, res) => {
  try {
    const { name, loginPhone, password, plan = 'Plano Starter', limitOS = 50 } = req.body;

    // Validate input
    if (!name || !loginPhone || !password) {
      return res.status(400).json({ error: 'Name, phone, and password are required' });
    }

    // Check if organization already exists
    const existingOrg = await Organization.findOne({ loginPhone });
    if (existingOrg) {
      return res.status(400).json({ error: 'Organization with this phone already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create organization
    const organization = new Organization({
      name,
      loginPhone,
      hashedPassword,
      billing: {
        plan,
        limitOS,
        currentUsageOS: 0
      }
    });

    await organization.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: organization._id, loginPhone: organization.loginPhone },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'Organization registered successfully',
      token,
      organization: {
        id: organization._id,
        name: organization.name,
        loginPhone: organization.loginPhone
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login organization
router.post('/login', loginValidation, async (req, res) => {
  try {
    const { loginPhone, password } = req.body;

    // Validate input
    if (!loginPhone || !password) {
      return res.status(400).json({ error: 'Phone and password are required' });
    }

    // Find organization
    const organization = await Organization.findOne({ loginPhone });
    if (!organization) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, organization.hashedPassword);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: organization._id, loginPhone: organization.loginPhone },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      organization: {
        id: organization._id,
        name: organization.name,
        loginPhone: organization.loginPhone
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
