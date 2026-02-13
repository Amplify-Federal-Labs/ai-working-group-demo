import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { sampleProducts } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, Share, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductDetailPageProps {
  product: Product;
}

export function ProductDetailPage({ product }: ProductDetailPageProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to collection
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-xl overflow-hidden flex items-center justify-center">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((image, index) => (
              <div 
                key={index} 
                className="aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center border border-border"
              >
                <img 
                  src={image} 
                  alt={`${product.name} - View ${index + 1}`} 
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge>{product.brand}</Badge>
            {product.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive">-{discountPercentage}% OFF</Badge>
            )}
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-muted-foreground mb-6">{product.description}</p>
          
          <div className="flex items-center mb-6">
            {product.rating && (
              <>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(product.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">{product.rating} • {Math.floor(Math.random() * 100) + 10} reviews</span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Size</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">{product.size}</Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Condition</h3>
              <Badge 
                className={
                  product.condition === 'New' ? 'bg-green-500' :
                  product.condition === 'Excellent' ? 'bg-blue-500' :
                  product.condition === 'Good' ? 'bg-yellow-500' :
                  'bg-orange-500'
                }
              >
                {product.condition}
              </Badge>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Colorway</h3>
              <p>{product.colorway}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Category</h3>
              <p>{product.category}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="flex-1 min-w-[200px]">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Details Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-muted-foreground">
              {product.description} This premium sneaker features high-quality materials and craftsmanship. 
              The design combines classic aesthetics with modern comfort technology, making it perfect for 
              collectors and everyday wear.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Specifications</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex justify-between border-b pb-2">
                <span>Brand</span>
                <span className="font-medium">{product.brand}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Model</span>
                <span className="font-medium">{product.model}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Size</span>
                <span className="font-medium">{product.size}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Colorway</span>
                <span className="font-medium">{product.colorway}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Condition</span>
                <span className="font-medium">{product.condition}</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>Release Date</span>
                <span className="font-medium">{product.releaseDate || 'N/A'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper component to handle route params
export function ProductDetailPageWrapper() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8787/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to fetch product:', response.status);
          // Fallback to sample data if API fails
          const { sampleProducts } = await import('@/lib/products');
          const fallbackProduct = sampleProducts.find(p => p.id === id);
          setProduct(fallbackProduct || null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        // Fallback to sample data if API fails
        const { sampleProducts } = await import('@/lib/products');
        const fallbackProduct = sampleProducts.find(p => p.id === id);
        setProduct(fallbackProduct || null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <p>Loading product...</p>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="text-muted-foreground mt-2">The sneaker you're looking for doesn't exist.</p>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          Browse all sneakers
        </Link>
      </div>
    );
  }
  
  return <ProductDetailPage product={product} />;
}