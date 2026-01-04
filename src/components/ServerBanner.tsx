import { useState } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ServerBannerProps {
  bannerUrl?: string;
  serverName: string;
  editable?: boolean;
  onBannerChange?: (file: File) => void;
  className?: string;
}

export function ServerBanner({ 
  bannerUrl, 
  serverName, 
  editable = false,
  onBannerChange,
  className 
}: ServerBannerProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/') && onBannerChange) {
      onBannerChange(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onBannerChange) {
      onBannerChange(file);
    }
  };

  if (editable) {
    return (
      <div
        className={cn(
          'relative w-full aspect-[3/1] rounded-lg overflow-hidden border-2 border-dashed transition-colors',
          isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/20',
          className
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {bannerUrl ? (
          <>
            <img
              src={bannerUrl}
              alt={`${serverName} banner`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
              <label className="cursor-pointer">
                <Button variant="secondary" size="sm" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Change
                  </span>
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onBannerChange?.(null as any)}
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          </>
        ) : (
          <label className="flex flex-col items-center justify-center h-full cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            <ImageIcon className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium">Drop an image or click to upload</p>
            <p className="text-xs mt-1">Recommended: 1200x400px</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    );
  }

  if (!bannerUrl) {
    return (
      <div 
        className={cn(
          'w-full aspect-[3/1] rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center',
          className
        )}
      >
        <h1 className="font-pixel text-lg sm:text-2xl text-primary">{serverName}</h1>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full aspect-[3/1] rounded-lg overflow-hidden', className)}>
      <img
        src={bannerUrl}
        alt={`${serverName} banner`}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
}
