# Pharmacy POS Backend API

Backend API for the Pharmacy Point of Sale system built with Node.js, Express, and MongoDB.

## Technology Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB 6.0+
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Zod + Mongoose
- **Testing**: Jest + Supertest

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string and other configuration.

4. Seed the default admin user:
```bash
npm run seed:admin
```
Default admin credentials:
- Email: `admin@pharmacy.com`
- Password: `password123`

5. Start the development server:
```bash
npm run dev
```

6. Start the production server:
```bash
npm start
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Register new user (Admin only)
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh JWT token

### Categories (`/api/categories`)
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category by ID
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Products (`/api/products`)
- `GET /api/products` - List products (with pagination, search, filters)
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Suppliers (`/api/suppliers`)
- `GET /api/suppliers` - List suppliers
- `GET /api/suppliers/:id` - Get supplier by ID
- `POST /api/suppliers` - Create supplier
- `PUT /api/suppliers/:id` - Update supplier
- `DELETE /api/suppliers/:id` - Delete supplier

### Customers (`/api/customers`)
- `GET /api/customers` - List customers (with search)
- `GET /api/customers/:id` - Get customer by ID
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer
- `GET /api/customers/:id/history` - Get customer purchase history

### Stock (`/api/stock`)
- `GET /api/stock` - List stock entries (with filters)
- `GET /api/stock/:id` - Get stock entry by ID
- `POST /api/stock` - Add stock entry
- `PUT /api/stock/:id` - Update stock entry
- `GET /api/stock/alerts` - Get stock alerts (low stock, expiring, out of stock)

### POS (`/api/pos`)
- `GET /api/pos/products` - Search products for POS (with stock info)
- `POST /api/pos/cart/validate` - Validate cart items
- `GET /api/pos/shifts` - Get shifts
- `POST /api/pos/shifts/open` - Open shift
- `POST /api/pos/shifts/:id/close` - Close shift

### Sales (`/api/sales`)
- `GET /api/sales` - List sales (with filters, pagination)
- `GET /api/sales/:id` - Get sale by ID
- `POST /api/sales` - Create sale/transaction
- `DELETE /api/sales/:id` - Delete sale

### Analytics (`/api/analytics`)
- `GET /api/analytics/dashboard` - Dashboard metrics
- `GET /api/analytics/sales-summary` - Sales summary
- `GET /api/analytics/top-products` - Top selling products
- `GET /api/analytics/inventory-summary` - Inventory summary
- `GET /api/analytics/sales-trend` - Sales trend data

### Settings (`/api/settings`)
- `GET /api/settings/business` - Get business settings
- `PUT /api/settings/business` - Update business settings
- `GET /api/settings/localization` - Get localization settings
- `PUT /api/settings/localization` - Update localization settings
- `GET /api/settings/invoice` - Get invoice settings
- `PUT /api/settings/invoice` - Update invoice settings
- `POST /api/settings/invoice/logo` - Upload logo

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "optional message"
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {}
  }
}
```

### Paginated Response
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── services/         # Business logic
│   ├── models/           # Mongoose models
│   ├── routes/           # API route definitions
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Helper functions
│   ├── validators/       # Zod schemas
│   └── app.js            # Express app setup
├── tests/                # Test files
└── package.json
```

## Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Environment Variables

See `.env.example` for required environment variables:
- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - JWT token expiration time
- `CORS_ORIGIN` - Allowed CORS origin
- `UPLOAD_DIR` - Directory for file uploads
- `MAX_FILE_SIZE` - Maximum file upload size in bytes

