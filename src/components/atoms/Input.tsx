import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leadingIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, leadingIcon, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {leadingIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {leadingIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              w-full px-4 py-3.5 text-base
              bg-white border border-border-gray rounded-lg
              text-text-primary placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${leadingIcon ? 'pl-12' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

