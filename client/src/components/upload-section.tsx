import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Image, X } from 'lucide-react';

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
  isUploading: boolean;
  uploadedImage?: string;
  onRemoveImage?: () => void;
}

export function UploadSection({ onImageUpload, isUploading, uploadedImage, onRemoveImage }: UploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  if (uploadedImage) {
    return (
      <Card className="relative group overflow-hidden subtle-border">
        <div className="aspect-video">
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            onClick={onRemoveImage}
            className="bg-white text-black hover:bg-gray-100"
          >
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`relative cursor-pointer transition-all duration-200 subtle-border ${
        isDragOver ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
      } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="p-12 text-center space-y-4">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
          isDragOver ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
        }`}>
          {isUploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-current border-t-transparent" />
          ) : (
            <Upload className="w-8 h-8" />
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-balance">
            {isUploading ? 'Processing image...' : 'Upload an image to find similar products'}
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto text-balance">
            Drag and drop an image here, or click to browse your files
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Image className="w-4 h-4" />
          <span>Supports JPG, PNG, WEBP up to 10MB</span>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
        className="hidden"
      />
    </Card>
  );
}