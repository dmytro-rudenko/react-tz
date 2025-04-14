# Order Management System - Client

A React-based client application for managing orders, products, and users. Built with React, MobX for state management, and styled with Tailwind CSS.

## Features

- User Selection and Balance Display
- Product Management with Quantity Control
- Order Creation and Tracking
- Real-time Balance Updates
- Responsive Design with Tailwind CSS
- State Management with MobX

## Technology Stack

- React 19
- Vite
- MobX & MobX React Lite
- Tailwind CSS
- Docker & Docker Compose
- Testing: Vitest, React Testing Library

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local development)

## Running with Docker

1. Clone the repository and navigate to the client directory:
```bash
cd react-tz/client
```

2. Build and start the Docker container:
```bash
docker-compose up --build
```

The application will be available at http://localhost:3001

To stop the container:
```bash
docker-compose down
```

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm test
```

4. Run tests with coverage:
```bash
npm run test:coverage
```

## Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Set to 'development' by default in Docker
- Server URL is configured in `src/services/apiService.js`

## Project Structure

```
src/
├── components/         # React components
├── services/          # API services
├── stores/            # MobX stores
└── assets/           # Static assets
```

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run test`: Run tests
- `npm run test:coverage`: Run tests with coverage
- `npm run lint`: Run ESLint

## Docker Commands

Build the image:
```bash
docker-compose up
```

## Notes

- The application expects a backend server running at `http://localhost:3000`
- Tailwind CSS is configured for optimal development experience
- Tests are set up with Vitest and React Testing Library
- ESLint is configured with React-specific rules