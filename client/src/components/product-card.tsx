import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    description?: string;
    brand?: string;
  };
  similarityScore?: number;
  onViewProduct?: () => void;
}

export function ProductCard({ product, similarityScore, onViewProduct }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const getSimilarityBadgeColor = (score?: number) => {
    if (!score) return 'secondary';
    if (score >= 0.8) return 'default';
    if (score >= 0.6) return 'secondary';
    return 'outline';
  };

  const getSimilarityText = (score?: number) => {
    if (!score) return '';
    if (score >= 0.9) return 'Excellent match';
    if (score >= 0.8) return 'Great match';
    if (score >= 0.6) return 'Good match';
    return 'Similar';
  };

  return (
    <Card className="group overflow-hidden hover-scale subtle-border animate-fade-in">
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {similarityScore && (
          <div className="absolute top-3 left-3">
            <Badge variant={getSimilarityBadgeColor(similarityScore)} className="text-xs font-medium">
              {Math.round(similarityScore * 100)}% {getSimilarityText(similarityScore)}
            </Badge>
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 text-balance">
            {product.name}
          </h3>
          {product.brand && (
            <p className="text-xs text-muted-foreground">{product.brand}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </p>
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
          </div>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full focus-ring"
          onClick={onViewProduct}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}