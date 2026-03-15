import React from 'react';

export interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(
  ({ className = '', label, description, id, ...props }, ref) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <label
        htmlFor={radioId}
        className={`
          flex items-start gap-3 p-4
          border border-border-default rounded-xl
          cursor-pointer
          hover:bg-gray-50
          transition-colors
          ${props.checked ? 'bg-blue-50 border-blue-200' : ''}
          ${className}
        `}
      >
        <input
          ref={ref}
          type="radio"
          id={radioId}
          className="mt-1 w-4 h-4 text-primary border-[#000000] border-[0.5px] focus:ring-primary focus:ring-2"
          {...props}
        />
        {(label || description) && (
          <div className="flex-1">
            {label && (
              <div className="text-sm font-medium text-text-body mb-1">
                {label}
              </div>
            )}
            {description && (
              <div className="text-xs text-text-muted">
                {description}
              </div>
            )}
          </div>
        )}
      </label>
    );
  }
);

RadioButton.displayName = 'RadioButton';
