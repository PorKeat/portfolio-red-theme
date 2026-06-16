import { FC } from 'react';

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  className?: string;
}

const GlitchText: FC<GlitchTextProps> = ({
  children,
  speed = 0.5,
  enableShadows = true,
  className = ''
}) => {
  const afterDuration = `${speed * 3}s`;
  const beforeDuration = `${speed * 2}s`;
  const afterShadow = enableShadows ? '-2px 0 red' : 'none';
  const beforeShadow = enableShadows ? '2px 0 cyan' : 'none';

  return (
    <div className={`relative inline-block mx-auto select-none ${className}`}>
      {/* Base Layer */}
      <span className="relative z-10">{children}</span>
      
      {/* Glitch Layer 1 - Red */}
      <span 
        aria-hidden="true"
        className="absolute top-0 left-[2px] z-20 text-inherit bg-[#020617] overflow-hidden"
        style={{
          textShadow: afterShadow,
          clipPath: 'inset(0 0 0 0)',
          animation: `react-bits-glitch ${afterDuration} infinite linear alternate-reverse`
        }}
      >
        {children}
      </span>
      
      {/* Glitch Layer 2 - Cyan */}
      <span 
        aria-hidden="true"
        className="absolute top-0 -left-[2px] z-20 text-inherit bg-[#020617] overflow-hidden"
        style={{
          textShadow: beforeShadow,
          clipPath: 'inset(0 0 0 0)',
          animation: `react-bits-glitch ${beforeDuration} infinite linear alternate-reverse`
        }}
      >
        {children}
      </span>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes react-bits-glitch {
          0% { clip-path: inset(20% 0 50% 0); }
          5% { clip-path: inset(10% 0 60% 0); }
          10% { clip-path: inset(15% 0 55% 0); }
          15% { clip-path: inset(25% 0 35% 0); }
          20% { clip-path: inset(30% 0 40% 0); }
          25% { clip-path: inset(40% 0 20% 0); }
          30% { clip-path: inset(10% 0 60% 0); }
          35% { clip-path: inset(15% 0 55% 0); }
          40% { clip-path: inset(25% 0 35% 0); }
          45% { clip-path: inset(30% 0 40% 0); }
          50% { clip-path: inset(20% 0 50% 0); }
          55% { clip-path: inset(10% 0 60% 0); }
          60% { clip-path: inset(15% 0 55% 0); }
          65% { clip-path: inset(25% 0 35% 0); }
          70% { clip-path: inset(30% 0 40% 0); }
          75% { clip-path: inset(40% 0 20% 0); }
          80% { clip-path: inset(20% 0 50% 0); }
          85% { clip-path: inset(10% 0 60% 0); }
          90% { clip-path: inset(15% 0 55% 0); }
          95% { clip-path: inset(25% 0 35% 0); }
          100% { clip-path: inset(30% 0 40% 0); }
        }
      `}} />
    </div>
  );
};

export default GlitchText;
