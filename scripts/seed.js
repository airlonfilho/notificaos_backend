require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Organization = require('../models/Organization');
const ServiceOrder = require('../models/ServiceOrder');

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await Organization.deleteMany({});
    await ServiceOrder.deleteMany({});
    console.log('Cleared existing data');

    // Create test organization
    const hashedPassword = await bcrypt.hash('senha123', 10);
    
    const organization = new Organization({
      name: 'TechCell Assistência',
      loginPhone: '11999999999',
      hashedPassword,
      logoUrl: 'https://via.placeholder.com/150',
      contact: {
        cnpj: '12.345.678/0001-90',
        email: 'contato@techcell.com',
        address: 'Rua das Flores, 123 - Centro - São Paulo/SP'
      },
      billing: {
        plan: 'Plano Starter',
        limitOS: 50,
        currentUsageOS: 3
      },
      notificationTemplates: {
        onOpen: 'Olá {cliente}! Recebemos seu {aparelho} para reparo. Acompanhe o status pelo nosso sistema.',
        onReady: 'Olá {cliente}! Ótimas notícias! Seu {aparelho} está pronto para retirada.'
      }
    });

    await organization.save();
    console.log('✅ Organization created:', organization.name);
    console.log('   Phone:', organization.loginPhone);
    console.log('   Password: senha123');

    // Create sample service orders
    const serviceOrders = [
      {
        organizationId: organization._id,
        humanId: '#001',
        status: 'Em Reparo',
        client: {
          name: 'Carlos Silva',
          phone: '11987654321'
        },
        equipment: {
          brand: 'Samsung',
          model: 'Galaxy S21',
          problemReported: 'Tela quebrada'
        },
        observedState: ['Tela quebrada', 'Arranhões na tela'],
        accessories: ['Carregador', 'Capinha'],
        notes: 'Cliente informou que o aparelho caiu no chão'
      },
      {
        organizationId: organization._id,
        humanId: '#002',
        status: 'Em Análise',
        client: {
          name: 'Maria Santos',
          phone: '11976543210'
        },
        equipment: {
          brand: 'Apple',
          model: 'iPhone 12',
          problemReported: 'Não liga'
        },
        observedState: ['Aparelho não liga', 'Bateria viciada'],
        accessories: ['Carregador'],
        notes: 'Aparelho molhado'
      },
      {
        organizationId: organization._id,
        humanId: '#003',
        status: 'Pronto',
        client: {
          name: 'João Oliveira',
          phone: '11965432109'
        },
        equipment: {
          brand: 'Motorola',
          model: 'Moto G9',
          problemReported: 'Troca de bateria'
        },
        observedState: ['Bateria viciada'],
        accessories: [],
        notes: 'Bateria original substituída'
      }
    ];

    for (const orderData of serviceOrders) {
      const order = new ServiceOrder(orderData);
      await order.save();
      console.log(`✅ Service Order created: ${order.humanId} - ${order.client.name}`);
    }

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📋 Login credentials:');
    console.log('   Phone: 11999999999');
    console.log('   Password: senha123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
