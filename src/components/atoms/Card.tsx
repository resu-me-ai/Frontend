import React from 'react';

export interface CardProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
}) => {
  const baseClasses = 'rounded-lg';

  const variantClasses = {
    default: 'border border-border-default bg-white shadow-sm',
    outlined: 'border border-border-default bg-white',
    elevated: 'bg-white shadow-md',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
};

export interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className = '', children }) => (
  <div className={`flex flex-col space-y-1.5 pb-4 ${className}`}>
    {children}
  </div>
);

export interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ className = '', children }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight text-text-primary ${className}`}>
    {children}
  </h3>
);

export interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ className = '', children }) => (
  <p className={`text-sm text-text-muted ${className}`}>
    {children}
  </p>
);

export interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ className = '', children }) => (
  <div className={className}>
    {children}
  </div>
);

export interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className = '', children }) => (
  <div className={`flex items-center pt-4 ${className}`}>
    {children}
  </div>
);
