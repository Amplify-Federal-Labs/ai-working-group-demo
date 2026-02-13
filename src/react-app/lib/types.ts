// Product data model for the sneaker store
export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  size: number;
  colorway: string;
  condition: 'New' | 'Excellent' | 'Good' | 'Fair';
  price: number;
  originalPrice?: number; // Original retail price for comparison
  description: string;
  images: string[]; // Array of image URLs
  releaseDate?: string; // Release date in YYYY-MM-DD format
  category: string; // e.g., "Basketball", "Running", "Lifestyle"
  rating?: number; // Average customer rating
  featured?: boolean; // Whether this is a featured product
  inStock: boolean;
}

// Filter options for the store
export interface FilterOptions {
  brands: string[];
  sizes: number[];
  conditions: ('New' | 'Excellent' | 'Good' | 'Fair')[];
  maxPrice: number;
  categories: string[];
  searchQuery: string;
}