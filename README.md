# Semantic Video Summarization Pipeline - Frontend

## About This Project

This is the frontend application for the Long2Short web service. The application provides a user-friendly interface for video summarization services, including user authentication, video management, and personalized user experiences.

<details>
<summary>
Features
</summary>
   
## Features

- **User Authentication**: Login and registration system with secure authentication
- **Main Dashboard**: Central hub for accessing video summarization features
- **My Page**: Personal profile and user settings management
- **Responsive UI**: Modern, accessible interface built with React and TypeScript

</details>

<details>
<summary>
Tech Stacks
</summary>

## Tech Stacks

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
</details>

<details>
<summary>
Project Structure
</summary>
   
## Project Structure

```
src/
├── pages/          # Page components
├── components/     # Reusable UI components
├── router/         # Routing configuration
├── apis/           # API client and React Query hooks
├── contexts/       # React Context providers
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── styles/         # Global styles and CSS
└── icons/          # Icon components
```
</details>

<details>
<summary>
Getting Started
</summary>
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
</details>
