import React from 'react';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  hint?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', error, label, hint, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-subtle mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            className={`
              w-full px-4 py-3.5 text-base
              bg-white border border-border-input rounded-lg
              text-text-primary placeholder:text-[#adaebc]
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              disabled:bg-gray-100 disabled:cursor-not-allowed
              resize-none
              ${error ? 'border-red-500 focus:ring-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-red-600">{error}</p>
        )}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-text-placeholder">{hint}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
