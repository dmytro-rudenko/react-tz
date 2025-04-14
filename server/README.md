# E-commerce Server

A RESTful API server built with Express.js and PostgreSQL for handling e-commerce operations including users, products, and orders.

## Features

- Order processing with stock and balance validation
- Rate limiting for API endpoints
- CORS enabled for frontend integration
- Full test coverage
- Dockerized deployment

## Prerequisites

- Docker and Docker Compose
- Node.js 22.x (for local development)

## Quick Start with Docker

1. Clone the repository
2. Navigate to the project directory
3. Run the following command:

```bash
docker-compose up
```

This will:
- Start PostgreSQL on port 5432
- Start the server on port 3000
- Set up the database with migrations

## API Endpoints

### Users
- `GET /users` - Get all users

### Products
- `GET /products` - Get all products

### Orders
- `GET /orders/:userId` - Get orders for a specific user
- `POST /orders` - Create a new order
  ```json
  {
    "userId": "uuid",
    "productId": "uuid",
    "quantity": number
  }
  ```

## Development

### Local Setup

1. Install dependencies:
```bash
npm install
```

2. Configure database:
Edit `knexfile.js` if needed to match your PostgreSQL settings.

3. Run migrations:
```bash
npx knex migrate:latest
```

4. Seed the database (optional):
```bash
npx knex seed:run
```

5. Start the development server:
```bash
npm run dev
```

### Running Tests

```bash
npm test
```

Or with Docker:
```bash
docker-compose run test
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- Database configuration is in `knexfile.js`

## Rate Limiting

The API implements rate limiting with the following configuration:
- 100 requests per minute per IP
- Responds with 429 status code when limit is exceeded

## Security Features

- CORS enabled for localhost:3001
- Transaction support for order processing
- Rate limiting protection

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Resource created
- 400: Bad request
- 404: Resource not found
- 429: Too many requests
- 500: Internal server error

## License

MIT