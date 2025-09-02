# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

A comprehensive tour operator management system built with React 18, TypeScript, and Material UI. The application provides functionality for managing tour packages, bookings, user management, and reporting with both admin and guide interfaces.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server (runs on http://localhost:5173)
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

### Installation
- `npm install` - Install all dependencies

## Tech Stack & Key Dependencies

### Core Framework
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **Material UI (MUI)** for UI components and theming

### Key Libraries
- **React Router** for client-side routing with nested routes
- **Axios** for API communication (configured with base URL)
- **Formik + Yup** for form handling and validation
- **Framer Motion** for animations
- **D3** for data visualizations
- **GSAP** for advanced animations
- **Swiper** for carousel components
- **TailwindCSS** for utility-first styling

## Architecture Overview

### High-Level Structure
The application follows a feature-based architecture with clear separation of concerns:

```
src/
├── features/           # Feature modules (domain-driven)
├── pages/             # Route components and layouts
├── context/           # React Context providers
├── router/            # React Router configuration
├── theme/             # MUI theme configuration
├── utils/             # Shared utilities
├── config/            # Configuration files
└── assets/            # Static assets
```

### Feature-Based Architecture
Each feature is self-contained with its own:
- Components
- Context providers
- Business logic
- Types

**Core Features:**
- `auth` - Authentication and authorization
- `userManagement` - User CRUD and role management
- `tourPackage` - Tour package management
- `booking` - Booking system and reservations
- `reports` - Dashboard and analytics
- `guide` - Tour guide interface
- `securitySetup` - Password and security management
- `tourType` - Tour categorization
- `cancellationPolicy` - Policy management
- `touristDestination` - Destination management
- `payment` - Payment processing
- `tourist` - Tourist information management

### Routing Architecture
The application uses nested routing with three main sections:

1. **Public Routes** (`/`)
   - Login page
   - Security setup flows

2. **Admin Dashboard** (`/`)
   - User management (`/gestion-de-usuarios`)
   - Tour packages (`/paquetes-turisticos`)
   - Bookings (`/reservas`)
   - Reports (`/reportes`)

3. **Guide Interface** (`/guia-de-turismo`)
   - Tourist lists
   - Tour package details
   - Destinations
   - Itinerary management
   - Profile management

### State Management Pattern
The application uses React Context API with feature-specific providers:
- Each major feature has its own context provider
- Global snackbar/notification system
- Theme management through MUI ThemeProvider

### API Configuration
- Base API URL: `http://localhost:3000/api/v1`
- Centralized axios configuration in `src/config/axiosConfig.ts`
- 10-second timeout for API requests

### Component Organization
- **Layout Components**: Main layout with app bar and drawer navigation
- **Feature Components**: Domain-specific UI components
- **Shared Components**: Reusable UI elements (animations, galleries, breadcrumbs)
- **Animation Components**: Custom animation wrappers using Framer Motion and GSAP

### Development Notes
- Uses ES modules (`"type": "module"` in package.json)
- ESLint configuration with React hooks and TypeScript rules
- Prettier for code formatting
- Dark theme configuration with Material UI
- WebP image support configured in Vite

### Environment Variables
Required environment variables:
- `VITE_API_URL` - API base URL for production deployments
