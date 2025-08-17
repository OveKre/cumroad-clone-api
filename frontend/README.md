# CumRoad Clone - Digital Marketplace Frontend

A modern React TypeScript frontend for a digital marketplace platform, similar to Gumroad. Built with Vite, Tailwind CSS, and React Query for optimal performance and developer experience.

## 🚀 Features

- **User Authentication** - JWT-based login/register with protected routes
- **Product Management** - Create, edit, delete, and browse digital products
- **Order Processing** - Complete purchase flow and order management
- **Admin Panel** - User and content management for administrators
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Real-time Updates** - React Query for optimistic updates and caching
- **Form Validation** - React Hook Form with Zod schema validation
- **Error Handling** - Comprehensive error handling and user feedback

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom component classes
- **Routing**: React Router v6 with protected routes
- **State Management**: React Query for server state, React Context for auth
- **Forms**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Development**: ESLint, TypeScript strict mode

## 📋 Prerequisites

- Node.js 18+ (recommended: use Node 20+)
- npm or yarn package manager
- Backend API running on http://localhost:3002

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL if different from default
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Navbar.tsx     # Navigation component
│   ├── LoadingSpinner.tsx
│   ├── Messages.tsx   # Error/Success messages
│   └── ProtectedRoute.tsx
├── contexts/          # React contexts
│   └── AuthContext.tsx
├── hooks/             # Custom React hooks
│   ├── useProducts.ts
│   └── useOrders.ts
├── lib/               # Utilities and configuration
│   ├── api.ts         # API service layer
│   ├── types.ts       # TypeScript interfaces
│   └── validation.ts  # Zod schemas
├── pages/             # Route-level components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
└── App.tsx            # Main application component
```

## 🎯 Available Routes

### Public Routes
- `/` - Homepage with featured products
- `/login` - User authentication
- `/register` - User registration
- `/products` - Product catalog
- `/products/:id` - Product details

### Protected Routes (Requires Authentication)
- `/dashboard` - User dashboard
- `/my-products` - User's created products
- `/products/new` - Create new product
- `/products/:id/edit` - Edit product
- `/orders` - Order history
- `/profile` - User profile settings

### Admin Routes (Admin Role Required)
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/products` - Product management
- `/admin/orders` - Order management

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔌 API Integration

The frontend integrates with all backend endpoints:

### Authentication
- POST `/sessions` - Login
- DELETE `/sessions` - Logout  
- POST `/users` - Register

### Users
- GET `/users` - List all users
- GET `/users/:id` - Get user details
- PATCH `/users/:id` - Update user
- DELETE `/users/:id` - Delete user

### Products
- GET `/products` - List all products
- GET `/products/:id` - Get product details
- POST `/products` - Create product
- PATCH `/products/:id` - Update product
- DELETE `/products/:id` - Delete product

### Orders
- GET `/orders` - List user orders
- GET `/orders/:id` - Get order details
- POST `/orders` - Create order
- PATCH `/orders/:id` - Update order status
- DELETE `/orders/:id` - Delete order

## 🔒 Authentication

- JWT tokens stored in localStorage
- Automatic token refresh handling
- Protected routes with role-based access control
- Automatic logout on token expiry

## 🎨 Styling

Uses Tailwind CSS with custom component classes defined in `src/index.css`:

- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.btn-outline` - Outlined button style
- `.card` - Card container style
- `.input-field` - Form input style
- `.error-text` - Error message style

## 🛡️ Error Handling

- Global error boundary for unexpected errors
- API error handling with user-friendly messages
- Form validation with real-time feedback
- Network error handling and retry logic

## 🔧 Development

### Code Style
- TypeScript strict mode enabled
- ESLint with React and TypeScript rules
- Consistent import style (type imports separate)
- Functional components with hooks

### State Management
- React Query for server state and caching
- React Context for authentication state
- Local state with useState for UI components

### Performance
- React Query caching and background updates
- Optimistic updates for better UX
- Component lazy loading where appropriate
- Image lazy loading and fallbacks

## 📝 Environment Variables

Create a `.env` file with:

```env
VITE_API_BASE_URL=http://localhost:3002
VITE_APP_NAME=CumRoad
VITE_APP_VERSION=1.0.0
```

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Use TypeScript interfaces for all data types
3. Implement proper error handling
4. Add loading states for async operations
5. Use React Query hooks for data fetching
6. Validate forms with Zod schemas

## 📄 License

This project is part of a learning exercise and is not intended for commercial use.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
