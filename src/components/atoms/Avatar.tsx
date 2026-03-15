import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  fallback = '',
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = React.useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };

  const baseClasses = 'relative flex shrink-0 overflow-hidden rounded-full';

  const showFallback = !src || imgError;

  return (
    <div className={`${baseClasses} ${sizeClasses[size]} ${className}`}>
      {!showFallback ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 font-medium text-gray-600">
          {fallback}
        </div>
      )}
    </div>
  );
};
