
import Image from 'next/image';
import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  quality?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
  quality = 75,
}) => {
  if (!alt || alt.trim() === '') {
    console.warn(`Image with src="${src}" is missing alt text. Please provide a descriptive alt attribute for accessibility and SEO.`);
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      quality={quality}
      loading={priority ? 'eager' : 'lazy'}
      // Next.js Image component handles WebP/AVIF and responsive sets automatically
      // Placeholder can be implemented using `placeholder="blur"` and `blurDataURL`
      // For more advanced placeholders, a custom component might be needed.
    />
  );
};

export default OptimizedImage;
