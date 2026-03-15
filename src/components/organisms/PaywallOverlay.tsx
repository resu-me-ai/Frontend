import React from 'react';
import { sanitizeHtml } from '@/utils/sanitize';

export interface PaywallOverlayProps {
  title?: string;
  description?: string;
  price?: string;
  ctaLabel?: string;
  onUpgradeClick?: () => void;
  className?: string;
}

/**
 * PaywallOverlay - A semi-transparent overlay that sits on top of content,
 * blurring/fading the content behind it and presenting an upgrade CTA.
 *
 * Usage: The parent container MUST have `position: relative` (or use the
 * `relative` Tailwind class) for this overlay to position correctly.
 *
 * Example:
 * ```tsx
 * <div className="relative">
 *   <PriorityActionsSection ... />
 *   <PaywallOverlay onUpgradeClick={() => navigate('/upgrade')} />
 * </div>
 * ```
 */
export const PaywallOverlay: React.FC<PaywallOverlayProps> = ({
  title = 'Upgrade for Full Access',
  description,
  price = '$30 per month',
  ctaLabel = 'Upgrade Now',
  onUpgradeClick,
  className = '',
}) => {
  const defaultDescription = `You're only seeing part of your results. Upgrade now for <strong>${price}</strong> to view your complete Resume Performance Report and gain FULL access to Resume Studio`;

  const resolvedDescription = description
    ? description.replace('{{price}}', `<strong>${price}</strong>`)
    : defaultDescription;

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center ${className}`}
      aria-label="Upgrade overlay"
      role="dialog"
      aria-modal="false"
    >
      {/* Gradient fade at the top + blurred backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent to-white/80" />
        <div className="absolute inset-0 top-16 bg-white/80 backdrop-blur-sm" />
      </div>

      {/* Centered card */}
      <div className="relative z-20 w-full max-w-md mx-4 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {title}
        </h3>
        <p
          className="text-sm text-gray-600 leading-relaxed mb-6"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(resolvedDescription) }}
        />
        <button
          type="button"
          onClick={onUpgradeClick}
          className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-gray-900 font-semibold text-base rounded-lg transition-colors duration-150 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
};
