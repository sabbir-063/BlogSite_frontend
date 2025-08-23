// Cloudinary URL transformation utilities
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com';

// Generate optimized image URL with transformations
export const getOptimizedImageUrl = (url) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url; // Return original URL if not a Cloudinary URL
  }

  // For now, return the original URL to avoid transformation issues
  // We can implement proper transformations later if needed
  return url;
};

// Generate responsive image URLs
export const getResponsiveImageUrls = (url) => {
  if (!url || !url.includes('cloudinary.com')) {
    return {
      thumbnail: url,
      small: url,
      medium: url,
      large: url,
      original: url
    };
  }

  // For now, return the same URL for all sizes to avoid transformation issues
  return {
    thumbnail: url,
    small: url,
    medium: url,
    large: url,
    original: url
  };
};

// Get optimized image for specific use case
export const getImageForSize = (url) => {
  // For now, return the original URL to avoid transformation issues
  return url;
};

// Lazy loading image component helper
export const getLazyImageUrl = (url) => {
  // For now, return the original URL to avoid transformation issues
  return url;
};
