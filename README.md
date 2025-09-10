# Tour Operator Application
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/remrodri/tourOperatorReactMui)

<!-- ![Tour Operator Logo](https://via.placeholder.com/150) -->

## Overview

A comprehensive tour package management system built with React, TypeScript, and Material UI. This application provides tour operators with a robust platform to manage tour packages, customer information, and bookings with a user-friendly interface.

## Features

- **User Management**
  - User authentication and authorization
  - Role-based access control (Admin, Manager, Operator)
  - User profile management

- **Security Setup**
  - JWT-based authentication
  - Secure password handling
  - Role-based permissions

- **Tour Package Management**
  - Create, read, update, and delete tour packages
  - Manage pricing and availability
  - Schedule and calendar integration
  - Media gallery for tour packages

- **Tour Types**
  - Categorize tours (Adventure, Cultural, Relaxation, etc.)
  - Filter tours by type
  - Type-specific attributes

- **Cancellation Policies**
  - Define different cancellation policies
  - Attach policies to tour packages
  - Calculate refund amounts based on policies

- **Tourist Destinations**
  - Manage destination information
  - Map integration
  - Destination details and attractions

- **Booking Management**
  - Process bookings
  - Handle payments
  - Manage booking status
  - Generate invoices and receipts

## Tech Stack

- **Frontend**
  - React 18
  - TypeScript
  - Material UI (MUI) for modern UI components
  - React Router for navigation
  - Formik for form handling
  - Yup for validation
  - Axios for API communication
  - Context API for state management

- **Build Tools**
  - Vite for fast development and optimized builds
  - ESLint for code quality
  - Prettier for code formatting

## Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tour-operator-react-mui.git
   cd tour-operator-react-mui
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   VITE_API_URL=your_api_url_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

## Project Structure

```
tour-operator-react-mui/
├── public/               # Public assets
├── src/
│   ├── assets/           # Static assets (images, fonts, etc.)
│   ├── components/       # Reusable UI components
│   │   ├── common/       # Common UI components
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Layout components
│   │   └── ui/           # UI utility components
│   ├── contexts/         # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages
│   │   ├── auth/         # Authentication pages
│   │   ├── destinations/ # Destination management
│   │   ├── packages/     # Tour package management
│   │   └── settings/     # Application settings
│   ├── router/           # React Router configuration
│   ├── services/         # API services
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Entry point
│   └── vite-env.d.ts     # Vite environment types
├── .eslintrc.js          # ESLint configuration
├── .gitignore            # Git ignore file
├── index.html            # HTML entry point
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
```

## Usage

### Getting Started

After installation, you will be directed to the login page. Use the following credentials for initial access:

- **Admin User**
  - Username: admin@example.com
  - Password: admin123

### Tour Package Management

1. Navigate to the 'Tour Packages' section from the sidebar
2. Click the 'Add New Package' button to create a new tour package
3. Fill in the required information (name, description, price, etc.)
4. Add images to the tour package gallery
5. Set availability and pricing
6. Assign a cancellation policy
7. Save the tour package

### Tourist Destination Management

1. Navigate to the 'Destinations' section
2. View existing destinations or add new ones
3. Each destination can have details like location, attractions, and images
4. Destinations can be linked to tour packages

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run test` - Run tests

## Contribution Guidelines

We welcome contributions to the Tour Operator application! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests to ensure everything works
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Document your code with comments where necessary
- Write unit tests for new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please email support@touroperator.com or open an issue in the GitHub repository.

## Acknowledgements

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI](https://mui.com/)
- [Vite](https://vitejs.dev/)
- All open-source libraries used in this project

---

<!-- Made with ❤️ by Your Team

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
``` -->
