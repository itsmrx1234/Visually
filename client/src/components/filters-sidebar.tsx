
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Filter } from 'lucide-react';

interface FiltersSidebarProps {
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  minSimilarity: number;
  onMinSimilarityChange: (similarity: number) => void;
  onClearFilters: () => void;
  resultCount?: number;
}

export function FiltersSidebar({
  categories,
  selectedCategories,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  minSimilarity,
  onMinSimilarityChange,
  onClearFilters,
  resultCount
}: FiltersSidebarProps) {
  const handleCategoryToggle = (category: string, checked: boolean) => {
    if (checked) {
      onCategoryChange([...selectedCategories, category]);
    } else {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    }
  };

  const hasActiveFilters = selectedCategories.length > 0 || 
    priceRange[0] > 0 || priceRange[1] < 1000 || minSimilarity > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {resultCount !== undefined && (
        <div className="text-sm text-muted-foreground">
          {resultCount} {resultCount === 1 ? 'result' : 'results'} found
        </div>
      )}

      <Card className="subtle-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-3">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryToggle(category, checked as boolean)}
                className="focus-ring"
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {category}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="subtle-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => onPriceRangeChange(value as [number, number])}
            max={1000}
            min={0}
            step={10}
            className="focus-ring"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="subtle-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Similarity Threshold</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={[minSimilarity]}
            onValueChange={(value) => onMinSimilarityChange(value[0])}
            max={1}
            min={0}
            step={0.1}
            className="focus-ring"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {Math.round(minSimilarity * 100)}% minimum
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
