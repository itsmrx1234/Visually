import { useState } from "react";
import { Search } from "lucide-react";
import { UploadSection } from "@/components/upload-section";
import { FiltersSidebar } from "@/components/filters-sidebar";
import { ProductGrid } from "@/components/product-grid";
import { LoadingOverlay } from "@/components/loading-overlay";
import { useToast } from "@/hooks/use-toast";
import type { SearchFilters } from "@shared/schema";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [searchId, setSearchId] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({});
  const { toast } = useToast();

  const handleSearchStart = () => {
    setIsLoading(true);
  };

  const handleSearchComplete = (searchId: string, imageUrl: string) => {
    setSearchId(searchId);
    setUploadedImageUrl(imageUrl);
    setIsLoading(false);
  };

  const handleSearchError = (error: string) => {
    setIsLoading(false);
    toast({
      title: "Search Error",
      description: error,
      variant: "destructive",
    });
  };

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <header className="text-center py-20 px-4 animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
              <span className="text-primary">
                Find Products
              </span>{" "}
              <span className="text-foreground">Visually</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
              Upload any image and discover similar products instantly. Our smart visual search makes shopping easier than ever.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              ✨ AI Visual Recognition
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              ⚡ Instant Results
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
              🎯 Smart Filtering
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="animate-slide-up">
          <UploadSection
            onSearchStart={handleSearchStart}
            onSearchComplete={handleSearchComplete}
            onSearchError={handleSearchError}
          />
        </div>

        {/* Search Results */}
        {searchId && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8 animate-fade-in">
            <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <FiltersSidebar
                searchId={searchId}
                uploadedImageUrl={uploadedImageUrl}
                filters={filters}
                onFiltersChange={handleFiltersChange}
              />
            </div>
            <div className="lg:col-span-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <ProductGrid searchId={searchId} filters={filters} />
            </div>
          </div>
        )}
      </main>

      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} />
    </div>
  );
}