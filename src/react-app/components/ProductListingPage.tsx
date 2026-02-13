import { useState, useEffect } from 'react';
import { Product, FilterOptions } from '@/lib/types';
import { availableFilters } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, X } from 'lucide-react';

export function ProductListingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    sizes: [],
    conditions: [],
    maxPrice: availableFilters.maxPrice,
    categories: [],
    searchQuery: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8787/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          setFilteredProducts(data); // Initially show all products
        } else {
          console.error('Failed to fetch products:', response.status);
          // Fallback to sample data if API fails
          const { sampleProducts } = await import('@/lib/products');
          setProducts(sampleProducts);
          setFilteredProducts(sampleProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to sample data if API fails
        const { sampleProducts } = await import('@/lib/products');
        setProducts(sampleProducts);
        setFilteredProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters whenever they change
  useEffect(() => {
    if (products.length === 0) return; // Wait for products to load
    
    let result = [...products];

    // Apply search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.model.toLowerCase().includes(query) ||
        product.colorway.toLowerCase().includes(query)
      );
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      result = result.filter(product => filters.brands.includes(product.brand));
    }

    // Apply size filter
    if (filters.sizes.length > 0) {
      result = result.filter(product => filters.sizes.includes(product.size));
    }

    // Apply condition filter
    if (filters.conditions.length > 0) {
      result = result.filter(product => filters.conditions.includes(product.condition));
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter(product => filters.categories.includes(product.category));
    }

    // Apply price filter
    result = result.filter(product => product.price <= filters.maxPrice);

    setFilteredProducts(result);
  }, [filters, products]);

  const toggleBrandFilter = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const toggleSizeFilter = (size: number) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleConditionFilter = (condition: string) => {
    setFilters(prev => ({
      ...prev,
      conditions: prev.conditions.includes(condition as any)
        ? prev.conditions.filter(c => c !== condition)
        : [...prev.conditions, condition as any]
    }));
  };

  const toggleCategoryFilter = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const resetFilters = () => {
    setFilters({
      brands: [],
      sizes: [],
      conditions: [],
      maxPrice: availableFilters.maxPrice,
      categories: [],
      searchQuery: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Sneaker Collection</h1>
        <p className="text-muted-foreground">Find your perfect pair of collectible sneakers</p>
      </div>

      {/* Mobile filter toggle */}
      <div className="md:hidden mb-6">
        <Button 
          variant="outline" 
          onClick={() => setShowFilters(!showFilters)}
          className="w-full flex items-center justify-between"
        >
          <span>Filters</span>
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar - hidden on mobile unless toggled */}
        <aside className={`md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'} md:block`}>
          <div className="bg-card p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  id="search"
                  type="text"
                  placeholder="Search sneakers..."
                  className="w-full pl-8 pr-2 py-2 border rounded-md"
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                />
              </div>
            </div>

            {/* Brand filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Brand</h3>
              <div className="space-y-2">
                {availableFilters.brands.map(brand => (
                  <div key={brand}>
                    <Checkbox
                      label={brand}
                      checked={filters.brands.includes(brand)}
                      onChange={() => toggleBrandFilter(brand)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Size filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size</h3>
              <div className="grid grid-cols-3 gap-2">
                {availableFilters.sizes.map(size => (
                  <div key={size} className="flex items-center">
                    <Checkbox
                      label={size.toString()}
                      checked={filters.sizes.includes(size)}
                      onChange={() => toggleSizeFilter(size)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Condition filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Condition</h3>
              <div className="space-y-2">
                {availableFilters.conditions.map(condition => (
                  <div key={condition}>
                    <Checkbox
                      label={condition}
                      checked={filters.conditions.includes(condition)}
                      onChange={() => toggleConditionFilter(condition)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Category filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <div className="space-y-2">
                {availableFilters.categories.map(category => (
                  <div key={category}>
                    <Checkbox
                      label={category}
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleCategoryFilter(category)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Price filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Max Price: ${filters.maxPrice}</h3>
              <Slider
                min={0}
                max={availableFilters.maxPrice}
                step={10}
                value={[filters.maxPrice]}
                onValueChange={(value) => setFilters({...filters, maxPrice: value[0]})}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$0</span>
                <span>${availableFilters.maxPrice}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <main className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {products.length} products
            </p>
            <Select>
              <SelectTrigger className="w-[180px]">
                Sort by: Featured
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest Arrivals</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}