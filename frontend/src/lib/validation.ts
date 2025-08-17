import { z } from 'zod';

// User validation schemas
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long'),
});

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  name: z.string().optional(),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const updateUserSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  name: z.string().optional(),
});

// Product validation schemas
export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(100, 'Product name must be less than 100 characters'),
  description: z
    .string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  price: z
    .number()
    .min(0, 'Price must be a positive number')
    .max(999999, 'Price must be less than 999,999'),
  imageUrl: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
});

export const updateProductSchema = createProductSchema.partial();

// Order validation schemas
export const createOrderSchema = z.object({
  productId: z
    .number()
    .int()
    .positive('Product ID must be a positive integer'),
  quantity: z
    .number()
    .int()
    .min(1, 'Quantity must be at least 1')
    .max(100, 'Quantity cannot exceed 100'),
});

export const updateOrderSchema = z.object({
  status: z.enum(['pending', 'completed', 'cancelled'], {
    message: 'Status must be pending, completed, or cancelled',
  }),
});

// Search and filter validation schemas
export const productsQuerySchema = z.object({
  search: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  sortBy: z.enum(['name', 'price', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

export const ordersQuerySchema = z.object({
  status: z.enum(['pending', 'completed', 'cancelled']).optional(),
  sortBy: z.enum(['createdAt', 'totalPrice']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

// Infer types from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type UpdateUserFormData = z.infer<typeof updateUserSchema>;
export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
export type CreateOrderFormData = z.infer<typeof createOrderSchema>;
export type UpdateOrderFormData = z.infer<typeof updateOrderSchema>;
export type ProductsQueryData = z.infer<typeof productsQuerySchema>;
export type OrdersQueryData = z.infer<typeof ordersQuerySchema>;

// Validation helper functions
export const validateEmail = (email: string): boolean => {
  return z.string().email().safeParse(email).success;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePrice = (price: number): boolean => {
  return !isNaN(price) && price >= 0;
};

export const validateQuantity = (quantity: number): boolean => {
  return Number.isInteger(quantity) && quantity >= 1;
};

export const validateUrl = (url: string): boolean => {
  if (!url) return true; // Optional URLs are valid when empty
  return z.string().url().safeParse(url).success;
};
