# CumRoad Clone Frontend - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a digital marketplace frontend (CumRoad clone) built with React 18, TypeScript, and Vite. The application interfaces with a REST API backend at http://localhost:3002.

## Technical Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom component classes
- **Routing**: React Router v6
- **State Management**: React Query for server state, React Context for auth
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Architecture Patterns
- Use functional components with hooks
- Implement custom hooks for data fetching (React Query)
- Follow TypeScript strict mode conventions
- Use Zod schemas for form validation
- Implement proper error handling with ApiError class
- Use React Query for caching and background updates
- Protected routes with authentication checks

## API Integration
- All API calls should use the apiService from `src/lib/api.ts`
- Backend API base URL: http://localhost:3002
- JWT authentication with Bearer tokens
- Handle 401 responses by redirecting to login
- Use React Query hooks for data fetching and mutations

## Code Style Guidelines
- Use TypeScript interfaces for all data types
- Import types with `import type { ... }`
- Use functional components with React hooks
- Follow Tailwind CSS utility classes and custom component classes
- Implement proper loading states and error handling
- Use React Hook Form for all forms with Zod validation
- Keep components focused and reusable

## File Structure
- `/src/components` - Reusable UI components
- `/src/pages` - Route-level page components
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utilities (API, types, validation)
- `/src/contexts` - React contexts

## Authentication
- JWT tokens stored in localStorage
- Use AuthContext for authentication state
- Protected routes require authentication
- Admin routes require admin role
- Automatic logout on token expiry

## API Endpoints Coverage
The frontend should implement all backend endpoints:
- Authentication: login, logout, register
- Users: CRUD operations with role-based access
- Products: CRUD operations with ownership checks
- Orders: CRUD operations for authenticated users

## Error Handling
- Use ApiError class for consistent error handling
- Display user-friendly error messages
- Handle network errors gracefully
- Validate forms with Zod schemas
- Show loading states during async operations
