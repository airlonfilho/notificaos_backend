# Notificações Backend

A Node.js backend application using Express and MongoDB for managing service orders and organizations.

## Features

- Organization registration and authentication with JWT
- Service order management (CRUD operations)
- Billing limits and usage tracking
- Input validation and error handling
- Profile management (logo, contact info, notification templates)

## Installation

1. Clone the repository
2. Run `npm install`
3. Set up MongoDB Atlas:
   - Create a cluster in MongoDB Atlas
   - Get the connection string (replace `<username>`, `<password>`, and `<cluster>` with your details)
   - Create a `.env` file in the root directory and add:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/notifications?retryWrites=true&w=majority
     JWT_SECRET=your_jwt_secret_key_change_in_production
     ```
4. Run `npm start`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new organization
- `POST /api/auth/login` - Login organization

### Organizations (Protected)
- `GET /api/organizations/profile` - Get organization profile
- `PUT /api/organizations/profile` - Update organization profile
- `GET /api/organizations/billing` - Get billing info
- `PUT /api/organizations/billing` - Update billing settings

### Service Orders (Protected)
- `POST /api/service-orders` - Create new service order
- `GET /api/service-orders` - Get all service orders (filter by status optional)
- `GET /api/service-orders/:id` - Get single service order
- `PUT /api/service-orders/:id` - Update service order
- `DELETE /api/service-orders/:id` - Delete service order

## Usage

The server will start on port 3000.

All protected routes require an `Authorization` header with Bearer token:
```
Authorization: Bearer <your_jwt_token>
```
