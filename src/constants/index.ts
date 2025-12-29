// API endpoints
export const API_ENDPOINTS = {
  PRODUCTS: './api/products.json',
  PHONES: './api/phones.json',
  TABLETS: './api/tablets.json',
  ACCESSORIES: './api/accessories.json',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  SHOPPING_CART: 'shoppingCart',
  FAVORITES: 'favorites',
  THEME: 'theme',
} as const;

// Product categories
export const PRODUCT_CATEGORIES = {
  PHONES: 'phones',
  TABLETS: 'tablets',
  ACCESSORIES: 'accessories',
} as const;

// Theme types
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

// Display types for product cards
export const DISPLAY_TYPES = {
  FULL_PRICE: 'fullPrice',
  WITH_DISCOUNT: 'with-discount',
} as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error: Unable to fetch data',
  CONTEXT_ERROR: 'useGlobalContext must be used within a GlobalProvider',
  UNKNOWN_ERROR: 'An unknown error occurred',
} as const;
