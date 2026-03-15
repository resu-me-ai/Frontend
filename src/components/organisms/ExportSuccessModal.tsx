import React from 'react';
import { Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ExportSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleTitle?: string;
  companyName?: string;
}

const FEATURES = [
  { emoji: '🎯', title: 'Role-Specific Questions', subtitle: 'Tailored to your position' },
  { emoji: '🤖', title: 'AI Feedback', subtitle: 'Instant improvement tips' },
  { emoji: '🎥', title: 'Video Practice', subtitle: 'Record and review' },
  { emoji: '📊', title: 'Track Progress', subtitle: 'Monitor improvement' },
] as const;

/** Post-export congratulations modal promoting the interview app */
export const ExportSuccessModal: React.FC<ExportSuccessModalProps> = ({
  isOpen,
  onClose,
  roleTitle = 'Product Manager',
  companyName = 'TechCorp',
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Purple gradient header */}
        <div className="bg-gradient-to-b from-accent-purple to-violet-400 px-8 pt-8 pb-8 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles size={32} className="text-white" />
          </div>

          <h2 className="text-[30px] font-bold text-white mb-2">
            🎉 Congratulations!
          </h2>
          <p className="text-lg text-white/90">
            You've Enhanced Your Resume For The Role of
          </p>
          <p className="text-xl font-bold text-white mt-1">
            {roleTitle} at {companyName}
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          <h3 className="text-2xl font-bold text-text-heading mb-3 text-center">
            Prepare for Success with Our Interview App
          </h3>
          <p className="text-lg text-text-muted mb-6 text-center">
            Practice with real interview questions, get AI-powered feedback, and ace your interview with confidence.
          </p>

          {/* Feature cards 2x2 */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-bg-accent-purple rounded-[10px] p-4 flex items-start gap-3"
              >
                <div className="w-8 h-8 bg-accent-purple rounded-[10px] flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{feature.emoji}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-heading leading-tight">
                    {feature.title}
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    {feature.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* App store buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <a
              href="#"
              className="bg-black border border-[#a6a6a6] text-white rounded-[8px] h-14 w-[168px] flex items-center gap-2.5 pl-2.5 pr-3 hover:bg-gray-800 transition-colors"
            >
              {/* Google Play icon */}
              <svg width="24" height="28" viewBox="0 0 29 34" fill="none" className="flex-shrink-0">
                <path d="M0.917 0.645C0.636 0.942 0.476 1.397 0.476 1.994V32.006C0.476 32.603 0.636 33.058 0.917 33.355L0.988 33.422L17.706 16.704V16.296L0.988 -0.422L0.917 0.645Z" fill="url(#gp_a)" />
                <path d="M23.281 22.284L17.706 16.704V16.296L23.281 10.716L23.368 10.768L29.956 14.516C31.836 15.584 31.836 17.416 29.956 18.489L23.368 22.237L23.281 22.284Z" fill="url(#gp_b)" />
                <path d="M23.368 22.232L17.706 16.5L0.917 33.355C1.537 34.016 2.562 34.094 3.718 33.434L23.368 22.232Z" fill="url(#gp_c)" />
                <path d="M23.368 10.768L3.718 -0.434C2.562 -1.094 1.537 -1.016 0.917 -0.355L17.706 16.5L23.368 10.768Z" fill="url(#gp_d)" />
                <defs>
                  <linearGradient id="gp_a" x1="16.583" y1="1.823" x2="-5.217" y2="23.623" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00A0FF" /><stop offset="0.007" stopColor="#00A1FF" /><stop offset="0.26" stopColor="#00BEFF" /><stop offset="0.512" stopColor="#00D2FF" /><stop offset="0.76" stopColor="#00DFFF" /><stop offset="1" stopColor="#00E3FF" />
                  </linearGradient>
                  <linearGradient id="gp_b" x1="31.827" y1="16.5" x2="0.062" y2="16.5" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFE000" /><stop offset="0.409" stopColor="#FFBD00" /><stop offset="0.775" stopColor="#FFA500" /><stop offset="1" stopColor="#FF9C00" />
                  </linearGradient>
                  <linearGradient id="gp_c" x1="20.296" y1="19.39" x2="-7.354" y2="47.04" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF3A44" /><stop offset="1" stopColor="#C31162" />
                  </linearGradient>
                  <linearGradient id="gp_d" x1="-2.768" y1="-7.39" x2="10.982" y2="6.36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#32A071" /><stop offset="0.069" stopColor="#2DA771" /><stop offset="0.476" stopColor="#15CF74" /><stop offset="0.801" stopColor="#06E775" /><stop offset="1" stopColor="#00F076" />
                  </linearGradient>
                </defs>
              </svg>
              <span>
                <span className="text-[14px] block leading-none uppercase">GET IT ON</span>
                <span className="text-[20px] font-normal leading-snug tracking-tight">Google Play</span>
              </span>
            </a>
            <a
              href="#"
              className="bg-black border border-[#a6a6a6] text-white rounded-[8px] h-14 w-[168px] flex items-center gap-2.5 pl-2.5 pr-3 hover:bg-gray-800 transition-colors"
            >
              {/* Apple icon */}
              <svg width="22" height="28" viewBox="0 0 28 34" fill="white" className="flex-shrink-0">
                <path d="M23.106 17.825C23.074 14.078 26.182 12.254 26.322 12.168C24.556 9.608 21.822 9.258 20.858 9.228C18.544 8.988 16.302 10.608 15.126 10.608C13.926 10.608 12.108 9.252 10.158 9.292C7.638 9.33 5.286 10.782 3.99 13.028C1.326 17.59 3.33 24.298 5.886 27.988C7.164 29.796 8.658 31.82 10.604 31.748C12.506 31.67 13.22 30.544 15.498 30.544C17.752 30.544 18.422 31.748 20.41 31.702C22.456 31.67 23.746 29.884 24.976 28.058C26.452 25.97 27.038 23.916 27.062 23.816C27.018 23.8 23.142 22.322 23.106 17.825Z" />
                <path d="M19.398 6.828C20.42 5.56 21.124 3.84 20.934 2.098C19.446 2.162 17.596 3.108 16.53 4.348C15.586 5.442 14.742 7.222 14.958 8.902C16.622 9.028 18.332 8.078 19.398 6.828Z" />
              </svg>
              <span>
                <span className="text-[13px] block leading-none">Download on the</span>
                <span className="text-[22px] font-normal leading-snug tracking-tight">App Store</span>
              </span>
            </a>
          </div>

          {/* Footer links */}
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="text-sm text-accent-purple hover:text-violet-700 font-medium transition-colors"
            >
              Join Us on Discord
            </a>
            <button
              type="button"
              onClick={() => {
                onClose();
                navigate('/dashboard');
              }}
              className="text-sm text-text-muted hover:text-text-body transition-colors"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
