import React from 'react';

interface LoadingSpinnerProps {
  /**
   * Size of the loading spinner
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Loading message to display
   */
  message?: string;
  /**
   * Subtitle text below the main message
   */
  subtitle?: string;
  /**
   * Color theme for the loader
   */
  theme?: 'blue' | 'rose' | 'purple' | 'green' | 'gray';
  /**
   * Animation type
   */
  animation?: 'spin' | 'pulse' | 'bounce' | 'wave';
  /**
   * Show background overlay
   */
  overlay?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading...',
  subtitle,
  theme = 'blue',
  animation = 'spin',
  overlay = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const themeClasses = {
    blue: 'text-blue-600',
    rose: 'text-rose-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
    gray: 'text-gray-600',
  };

  const backgroundGradients = {
    blue: 'from-blue-50 to-blue-100',
    rose: 'from-rose-50 to-rose-100',
    purple: 'from-purple-50 to-purple-100',
    green: 'from-green-50 to-green-100',
    gray: 'from-gray-50 to-gray-100',
  };

  const glowColors = {
    blue: 'shadow-blue-200',
    rose: 'shadow-rose-200',
    purple: 'shadow-purple-200',
    green: 'shadow-green-200',
    gray: 'shadow-gray-200',
  };

  const SpinAnimation = () => (
    <div className="relative">
      <div className={`${sizeClasses[size]} ${themeClasses[theme]} animate-spin`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle 
            className="opacity-25" 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4" 
          />
          <path 
            className="opacity-75" 
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
          />
        </svg>
      </div>
      <div className={`absolute inset-0 ${sizeClasses[size]} ${themeClasses[theme]} animate-ping opacity-20`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        </svg>
      </div>
    </div>
  );

  const PulseAnimation = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizeClasses[size]} ${themeClasses[theme]} rounded-full animate-pulse`}
          style={{ animationDelay: `${i * 0.2}s` }}
        >
          <div className="w-full h-full bg-current rounded-full opacity-60"></div>
        </div>
      ))}
    </div>
  );

  const BounceAnimation = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-3 h-3 ${themeClasses[theme]} bg-current rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const WaveAnimation = () => (
    <div className="flex space-x-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-2 bg-current ${themeClasses[theme]} rounded-full animate-pulse`}
          style={{ 
            height: `${12 + (i % 2) * 8}px`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );

  const renderAnimation = () => {
    switch (animation) {
      case 'pulse':
        return <PulseAnimation />;
      case 'bounce':
        return <BounceAnimation />;
      case 'wave':
        return <WaveAnimation />;
      default:
        return <SpinAnimation />;
    }
  };

  const containerClasses = overlay 
    ? `min-h-screen flex items-center justify-center bg-gradient-to-br ${backgroundGradients[theme]} backdrop-blur-sm`
    : `flex items-center justify-center p-8`;

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className={`bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl ${glowColors[theme]} border border-white/20 max-w-sm w-full mx-4`}>
        <div className="text-center">
          <div className="flex justify-center mb-6">
            {renderAnimation()}
          </div>
          
          <div className="space-y-2">
            <h3 className={`text-xl font-semibold ${themeClasses[theme]} animate-pulse`}>
              {message}
            </h3>
            
            {subtitle && (
              <p className="text-gray-600 text-sm animate-fade-in">
                {subtitle}
              </p>
            )}
          </div>

          {/* Progress bar animation */}
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${
                  theme === 'blue' ? 'from-blue-400 to-blue-600' :
                  theme === 'rose' ? 'from-rose-400 to-rose-600' :
                  theme === 'purple' ? 'from-purple-400 to-purple-600' :
                  theme === 'green' ? 'from-green-400 to-green-600' :
                  'from-gray-400 to-gray-600'
                } animate-pulse`}
                style={{
                  animation: 'loading-bar 2s ease-in-out infinite',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <style jsx>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style> */}
    </div>
  );
};

export default LoadingSpinner;