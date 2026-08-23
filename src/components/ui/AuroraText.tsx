import { memo } from 'react';

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
  animationSpeed?: number;
}

// Inject keyframes once into <head>
if (typeof document !== 'undefined') {
  const id = 'aurora-text-keyframes';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.innerHTML = `
      @keyframes aurora-shift {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animate-aurora-text {
        animation-name: aurora-shift;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
      }
      @media (prefers-reduced-motion: reduce) {
        .animate-aurora-text { animation: none; }
      }
    `;
    document.head.appendChild(style);
  }
}

export const AuroraText = memo(
  ({
    children,
    className = '',
    // Brand palette: Royal Navy → Hydro Blue → Sky Cyan → Solar Gold
    colors = ['#213BA3', '#47A2F5', '#D6AE29', '#213BA3'],
    speed = 1,
    animationSpeed,
  }: AuroraTextProps) => {
    const activeSpeed = animationSpeed !== undefined ? (6 / animationSpeed) : speed;

    return (
      <span className={`relative inline-block ${className}`}>
        {/* Screen-reader text */}
        <span className="sr-only">{children}</span>

        <span
          aria-hidden="true"
          className="animate-aurora-text"
          style={{
            backgroundImage: `linear-gradient(135deg, ${colors.join(', ')})`,
            animationDuration: `${10 / activeSpeed}s`,
          }}
        >
          {children}
        </span>
      </span>
    );
  }
);

AuroraText.displayName = 'AuroraText';
export default AuroraText;
