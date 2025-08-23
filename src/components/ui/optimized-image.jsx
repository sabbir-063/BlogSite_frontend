import React, { useState, useEffect } from 'react';

const OptimizedImage = ({
  src,
  alt,
  className = '',
  lazy = true,
  fallback = '/Profile_avatar_placeholder_large.png',
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!src || src === '') {
      setImageSrc(fallback);
      setIsLoading(false);
      return;
    }

    // For now, use the original URL to avoid transformation issues
    setImageSrc(src);
    setIsLoading(true);
    setHasError(false);
  }, [src, fallback]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setImageSrc(fallback);
  };

  // Don't render if we have no valid src and no fallback
  if (!imageSrc && !fallback) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={hasError ? fallback : (imageSrc || null)}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
