# Semantic Video Summarization Pipeline - Frontend

## About This Project

This is the frontend application for the [Semantic Video Summarization Pipeline (SVSP)](../README.md). The application provides a user-friendly interface for video summarization services, including user authentication, video management, and personalized user experiences.

## Features

- **User Authentication**: Login and registration system with secure authentication
- **Main Dashboard**: Central hub for accessing video summarization features
- **My Page**: Personal profile and user settings management
- **Responsive UI**: Modern, accessible interface built with React and TypeScript

## Tech Stack

### Core Framework
- **React 19** - Modern UI library with latest features
- **TypeScript 5.8** - Type-safe JavaScript development
- **Vite 7** - Fast build tool and development server

### Routing & State Management
- **React Router DOM v7** - Client-side routing
- **TanStack React Query v5** - Server state management and data fetching
- **React Context API** - Global state management (authentication)

### Data & Forms
- **Axios** - HTTP client for API communication
- **React Hook Form** - Performant form validation and management

### Styling & UI
- **Styled Components** - CSS-in-JS styling solution
- **React Toastify** - Toast notification system

### Code Quality
- **ESLint** - Code linting and quality checks
- **TypeScript ESLint** - TypeScript-specific linting rules

## Project Structure

```
src/
├── pages/          # Page components
│   ├── auth/       # Login and registration pages
│   ├── main/       # Main dashboard page
│   ├── my/         # User profile page
│   └── error/      # Error page
├── components/     # Reusable UI components
├── router/         # Routing configuration
├── apis/           # API client and React Query hooks
│   └── hooks/      # Custom React Query hooks
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── styles/         # Global styles and CSS
└── icons/          # Icon components
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to:
   [http://localhost:5173](http://localhost:5173/)

The development server supports hot module replacement (HMR) for instant updates during development.

### Build

Build the application for production:

```bash
npm run build
```

The optimized production files will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Type Checking

Run TypeScript type checking without emitting files:

```bash
npm run check
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Configuration

- **Vite Config**: `vite.config.ts` - Build tool configuration
- **TypeScript Config**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` - TypeScript settings
- **ESLint Config**: `eslint.config.js` - Code quality rules

## Contributing

When contributing to this project, please ensure:
1. All TypeScript types are properly defined
2. Code passes ESLint checks (`npm run lint`)
3. Type checking passes (`npm run check`)
4. Components follow the existing project structure

## License

This project is part of the SVSP system. Please refer to the main repository for license information.
