import React from 'react';
import { Logo } from '@/components/atoms/Logo';
import { useAuth } from '@/hooks/useAuth';

export interface AppHeaderProps {
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ className = '' }) => {
  const { user } = useAuth();

  return (
    <header className={`bg-white border-b border-gray-200 ${className}`}>
      <div className="px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size={38} />
          <span className="text-[23px] font-semibold text-brand-subtitle tracking-[0.115px] font-epilogue leading-6">
            Resu-ME AI
          </span>
        </div>

        {user && (
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
              {user.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={user.fullName || 'User'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-medium text-gray-600">
                  {user.firstName?.[0] || user.emailAddresses?.[0]?.emailAddress?.[0] || 'U'}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
