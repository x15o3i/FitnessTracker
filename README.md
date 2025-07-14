# FitnessTracker

A modern fitness tracking web application built with Node.js, Express, React, Vite, and TypeScript.

## Features
- User authentication and session management
- Track workouts, exercises, and progress
- Beautiful, responsive UI with Tailwind CSS
- Data visualization with charts
- REST API backend with Express
- PostgreSQL database (via Drizzle ORM)
- Modern React frontend with hooks and Radix UI

## Getting Started

### Prerequisites
- Node.js (v20.x or later recommended)
- npm (comes with Node.js)

### Installation
```sh
npm install
```

### Development
Start the development server:
```sh
npm run dev
```
The server will run at [http://localhost:5000](http://localhost:5000).

### Production Build
```sh
npm run build
npm start
```

### Database Setup
- Configure your PostgreSQL connection in the environment variables.
- Run database migrations:
```sh
npm run db:push
```

## Project Structure
- `client/` - React frontend code
- `server/` - Express backend code
- `shared/` - Shared TypeScript types and schemas
- `dist/` - Production build output

## Scripts
- `npm run dev` - Start development server
- `npm run build` - Build frontend and backend
- `npm start` - Start production server
- `npm run db:push` - Run database migrations

## License
MIT

---

If you encounter issues or want to contribute, please open an issue or pull request!
