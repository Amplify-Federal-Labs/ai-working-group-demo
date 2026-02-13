import { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
              Featured
            </Badge>
          )}
          {discountPercentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}
          <Badge 
            className={`absolute bottom-2 right-2 ${
              product.condition === 'New' ? 'bg-green-500' :
              product.condition === 'Excellent' ? 'bg-blue-500' :
              product.condition === 'Good' ? 'bg-yellow-500' :
              'bg-orange-500'
            }`}
          >
            {product.condition}
          </Badge>
        </div>
        
        <CardContent className="p-4 flex-grow flex flex-col">
          <div className="mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{product.brand}</h3>
            <h4 className="text-sm text-muted-foreground line-clamp-1">{product.model}</h4>
          </div>
          
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.colorway}</p>
          
          <div className="mt-auto">
            <div className="flex items-center mb-1">
              {product.rating && (
                <>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs ml-1">{product.rating}</span>
                </>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              
              <Button size="sm" variant="outline">
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}