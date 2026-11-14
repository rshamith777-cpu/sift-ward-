import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface VascularFrameProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
}

export const VascularFrame: React.FC<VascularFrameProps> = ({
  children,
  className = '',
  style = {},
  isActive = true,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const pulsesActive = isActive && !shouldReduceMotion;

  return (
    <div
      className={`vascular-frame-container ${className}`}
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        ...style,
      }}
    >
      {/* SVG Vascular Border Overlay */}
      <svg
        className="vascular-svg-overlay"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-6px',
          width: 'calc(100% + 12px)',
          height: 'calc(100% + 12px)',
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 2,
        }}
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="vascCoralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D98A6C" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#E8A085" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B96B4F" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="vascSageGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4B8C81" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#6BA69C" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#376E65" stopOpacity="0.8" />
          </linearGradient>

          <filter id="vascGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --- CORNER BRANCHING VESSELS & MAIN MARGINAL TRUNKS --- */}

        {/* Ambient Blur Underlay for Bioluminescent Glow */}
        <g opacity="0.38" filter="url(#vascGlowFilter)">
          {/* Top-Left Artery Trunk & Capillary Forks */}
          <path
            d="M 28 60 
               C 28 35, 45 20, 75 20 
               L 420 20 
               C 440 20, 460 25, 480 30"
            fill="none"
            stroke="url(#vascCoralGrad)"
            strokeWidth="3.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Top-Right Vein Trunk */}
          <path
            d="M 540 20 
               L 920 20 
               C 955 20, 975 35, 975 70 
               L 975 320"
            fill="none"
            stroke="url(#vascSageGrad)"
            strokeWidth="3.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Bottom-Right Artery Trunk */}
          <path
            d="M 975 380 
               L 975 530 
               C 975 565, 955 580, 920 580 
               L 520 580"
            fill="none"
            stroke="url(#vascCoralGrad)"
            strokeWidth="3.5"
            vectorEffect="non-scaling-stroke"
          />
          {/* Bottom-Left Vein Trunk */}
          <path
            d="M 440 580 
               L 75 580 
               C 45 580, 28 565, 28 530 
               L 28 140"
            fill="none"
            stroke="url(#vascSageGrad)"
            strokeWidth="3.5"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* Primary Sharp Vascular Trunks */}
        <g opacity="0.75">
          {/* Top-Left Main Artery */}
          <path
            d="M 28 60 
               C 28 35, 45 20, 75 20 
               L 420 20 
               C 440 20, 460 25, 480 30"
            fill="none"
            stroke="url(#vascCoralGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Top-Left Arteriolar Branch 1 */}
          <path
            d="M 120 20 C 135 12, 160 8, 185 8"
            fill="none"
            stroke="url(#vascCoralGrad)"
            strokeWidth="1.2"
            opacity="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 160 12 C 170 6, 190 4, 210 4"
            fill="none"
            stroke="url(#vascCoralGrad)"
            strokeWidth="0.8"
            opacity="0.6"
            vectorEffect="non-scaling-stroke"
          />
          {/* Top-Left Downward Capillary Fork */}
          <path
            d="M 28 90 C 20 110, 14 135, 12 165"
            fill="none"
            stroke="url(#vascCoralGrad)"
            strokeWidth="1.2"
            opacity="0.75"
            vectorEffect="non-scaling-stroke"
          />

          {/* Top-Right Main Vein */}
          <path
            d="M 540 20 
               L 920 20 
               C 955 20, 975 35, 975 70 
               L 975 320"
            fill="none"
            stroke="url(#vascSageGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Top-Right Venous Branch */}
          <path
            d="M 860 20 C 880 12, 915 8, 940 8"
            fill="none"
            stroke="url(#vascSageGrad)"
            strokeWidth="1.2"
            opacity="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 975 140 C 984 160, 988 185, 990 210"
            fill="none"
            stroke="url(#vascSageGrad)"
            strokeWidth="1.2"
            opacity="0.7"
            vectorEffect="non-scaling-stroke"
          />

          {/* Bottom-Right Artery Trunk & Bifurcations */}
          <path
            d="M 975 380 
               L 975 530 
               C 975 565, 955 580, 920 580 
               L 520 580"
            fill="none"
            stroke="url(#vascCoralGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 975 460 C 985 480, 988 505, 992 530"
            fill="none"
            stroke="url(#vascCoralGrad)"
            strokeWidth="1.2"
            opacity="0.75"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 820 580 C 800 588, 775 592, 750 594"
            fill="none"
            stroke="url(#vascCoralGrad)"
            strokeWidth="1.1"
            opacity="0.7"
            vectorEffect="non-scaling-stroke"
          />

          {/* Bottom-Left Vein Trunk */}
          <path
            d="M 440 580 
               L 75 580 
               C 45 580, 28 565, 28 530 
               L 28 140"
            fill="none"
            stroke="url(#vascSageGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 28 420 C 18 440, 12 470, 10 500"
            fill="none"
            stroke="url(#vascSageGrad)"
            strokeWidth="1.2"
            opacity="0.75"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 220 580 C 200 590, 170 592, 140 594"
            fill="none"
            stroke="url(#vascSageGrad)"
            strokeWidth="1.1"
            opacity="0.7"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* --- ANIMATED FLOWING BLOOD PULSES (CORAL LIGHT-BEADS) --- */}
        {pulsesActive && (
          <g filter="url(#vascGlowFilter)">
            {/* Top Artery Flow Pulse */}
            <motion.path
              d="M 28 60 C 28 35, 45 20, 75 20 L 420 20"
              fill="none"
              stroke="#D98A6C"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="24 160"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 184 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Top-Right Vein Flow Pulse */}
            <motion.path
              d="M 540 20 L 920 20 C 955 20, 975 35, 975 70 L 975 320"
              fill="none"
              stroke="#4B8C81"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="28 200"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 228 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 5.6,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Bottom Artery Flow Pulse */}
            <motion.path
              d="M 975 380 L 975 530 C 975 565, 955 580, 920 580 L 520 580"
              fill="none"
              stroke="#D98A6C"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="26 180"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 206 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            {/* Bottom-Left Vein Flow Pulse */}
            <motion.path
              d="M 440 580 L 75 580 C 45 580, 28 565, 28 530 L 28 140"
              fill="none"
              stroke="#4B8C81"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="26 190"
              vectorEffect="non-scaling-stroke"
              initial={{ strokeDashoffset: 216 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </g>
        )}

        {/* Vascular End Nodes (Anastomosis points) */}
        <circle cx="28" cy="60" r="2.5" fill="#D98A6C" />
        <circle cx="480" cy="30" r="2" fill="#D98A6C" />
        <circle cx="540" cy="20" r="2.5" fill="#4B8C81" />
        <circle cx="975" cy="320" r="2.5" fill="#4B8C81" />
        <circle cx="975" cy="380" r="2.5" fill="#D98A6C" />
        <circle cx="520" cy="580" r="2" fill="#D98A6C" />
        <circle cx="440" cy="580" r="2" fill="#4B8C81" />
        <circle cx="28" cy="140" r="2.5" fill="#4B8C81" />
      </svg>

      {/* Embedded Panel Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};

