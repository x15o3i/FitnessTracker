# Calorie Tracker Application

## Overview

This is a full-stack calorie tracking application built with React, TypeScript, Express, and PostgreSQL. The application allows users to track their daily caloric intake, exercise calories burned, and steps taken to calculate their net calorie balance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React Hook Form for form state, TanStack Query for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful APIs with `/api` prefix
- **Storage**: In-memory storage with interface for easy database migration
- **Development**: Hot module replacement with Vite integration

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: User entity with username/password authentication
- **Migrations**: Managed through Drizzle Kit
- **Current Implementation**: In-memory storage with planned PostgreSQL migration

### UI Components
- **Design System**: shadcn/ui with "new-york" style variant
- **Form Handling**: React Hook Form with Zod validation
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: Radix UI primitives ensure WCAG compliance

### Application Features
- **Calorie Tracking**: Input for calories consumed and burned through exercise
- **Step Counting**: Automatic calorie calculation from steps (0.04 calories per step)
- **Net Balance**: Real-time calculation of calorie surplus/deficit
- **Form Validation**: Client-side validation with Zod schemas

## Data Flow

1. **User Input**: Forms capture calorie and step data with real-time validation
2. **Calculation**: Client-side computation of calorie totals and net balance
3. **Storage**: Currently in-memory with plans for PostgreSQL persistence
4. **Display**: Results shown immediately with clear visual feedback

## External Dependencies

### Production Dependencies
- **UI Framework**: React ecosystem (React, React DOM, React Hook Form)
- **UI Components**: Radix UI primitives for accessibility
- **Database**: Drizzle ORM with Neon serverless PostgreSQL driver
- **Validation**: Zod for schema validation
- **Styling**: Tailwind CSS with additional utility libraries
- **State Management**: TanStack Query for server state caching

### Development Dependencies
- **Build Tools**: Vite with React plugin and TypeScript support
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Linting**: TypeScript compiler for type checking

## Deployment Strategy

### Development
- **Server**: tsx with hot reloading for TypeScript files
- **Client**: Vite dev server with HMR for React components
- **Database**: In-memory storage for rapid development

### Production
- **Build Process**: 
  1. Vite builds optimized client bundle
  2. esbuild compiles server TypeScript to ESM
- **Server**: Node.js serving compiled JavaScript
- **Static Assets**: Served from `dist/public` directory
- **Database**: Environment-based PostgreSQL connection via DATABASE_URL

### Architecture Decisions

**Monorepo Structure**: Single repository with `client/`, `server/`, and `shared/` directories for code organization and type sharing.

**In-Memory Storage**: Chosen for rapid prototyping with clean interface abstraction to enable easy PostgreSQL migration later.

**shadcn/ui**: Selected for consistent design system with accessibility built-in and easy customization through CSS variables.

**Drizzle ORM**: Provides type-safe database operations with excellent TypeScript integration and migration management.

**Vite**: Chosen for fast development experience and optimized production builds with tree-shaking and code splitting.