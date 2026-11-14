import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useTransform,
  useMotionValue,
  type MotionValue,
} from 'framer-motion';

interface HeartHelixArtworkProps {
  /** 0..1 scroll-driven vessel drawing progress (scene mode). Omit for the hero idle artwork. */
  vesselProgress?: MotionValue<number>;
  isSimulating?: boolean;
  /** 'hero' renders the standalone artwork with its status tag; 'scene' renders the scroll-story centrepiece */
  variant?: 'hero' | 'scene';
}

export const HeartHelixArtwork: React.FC<HeartHelixArtworkProps> = ({
  vesselProgress,
  isSimulating = true,
  variant = 'hero',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isScene = variant === 'scene';
  const fallbackProgress = useMotionValue(1);
  const progress = vesselProgress ?? fallbackProgress;

  useEffect(() => {
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      setIsTouch(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || shouldReduceMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setParallax({
      x: Math.max(-8, Math.min(8, x * 8)),
      y: Math.max(-8, Math.min(8, y * 8)),
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  // Scene mode: helix strands and flow particles fade in as the vessels finish drawing
  const helixOpacity = useTransform(progress, [0.55, 0.82], [0.12, 1]);
  const flowOpacity = useTransform(progress, [0.32, 0.5], [0, 1]);
  const breathOpacity = useTransform(progress, [0.05, 0.25], [0.25, 1]);

  const drawStyle = (mv: MotionValue<number> | undefined) =>
    mv ? { pathLength: mv } : undefined;

  const vesselProgressValue = vesselProgress;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="heart-helix-container"
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: isScene ? '500px' : '540px',
        aspectRatio: '1 / 1',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1000px',
      }}
    >
      {/* Background bioluminescent ambient glow pools */}
      <div
        style={{
          position: 'absolute',
          width: 'min(420px, 100%)',
          height: 'min(420px, 100%)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 138, 108, 0.26) 0%, rgba(75, 140, 129, 0.18) 40%, rgba(246, 243, 238, 0) 72%)',
          filter: 'blur(36px)',
          pointerEvents: 'none',
        }}
      />

      <motion.svg
        viewBox="0 0 540 540"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'visible',
        }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -9, 0],
                rotate: [0, 0.8, 0],
              }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <defs>
          {/* Bioluminescent Gradient Defs */}
          <linearGradient id="translucentAorta" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D98A6C" stopOpacity="0.82" />
            <stop offset="45%" stopColor="#E8B4A2" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#4B8C81" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="ventricleFillGlass" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.88" />
            <stop offset="35%" stopColor="#FAF1EC" stopOpacity="0.72" />
            <stop offset="70%" stopColor="#DCE6E1" stopOpacity="0.58" />
            <stop offset="100%" stopColor="#4B8C81" stopOpacity="0.32" />
          </linearGradient>

          <radialGradient id="myocardiumCenterGlow" cx="44%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.94" />
            <stop offset="38%" stopColor="#FDF0EA" stopOpacity="0.7" />
            <stop offset="72%" stopColor="#D98A6C" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2C3E35" stopOpacity="0.1" />
          </radialGradient>

          <linearGradient id="sageHelixArt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#376E65" />
            <stop offset="50%" stopColor="#4B8C81" />
            <stop offset="100%" stopColor="#89BDB4" />
          </linearGradient>

          <linearGradient id="coralHelixArt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B96B4F" />
            <stop offset="50%" stopColor="#D98A6C" />
            <stop offset="100%" stopColor="#F4A587" />
          </linearGradient>

          <linearGradient id="rungLightGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4B8C81" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#D98A6C" stopOpacity="0.85" />
          </linearGradient>

          {/* Respiratory airflow motif gradient */}
          <linearGradient id="breathArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4B8C81" stopOpacity="0" />
            <stop offset="55%" stopColor="#4B8C81" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#D98A6C" stopOpacity="0.55" />
          </linearGradient>

          {/* Depth Drop Shadow Filter */}
          <filter id="cinematicGlassShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="20" floodColor="#2C3E35" floodOpacity="0.1" />
            <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#D98A6C" floodOpacity="0.16" />
          </filter>

          {/* Bioluminescent Gaussian Glow: soft blurred pass under the crisp vessel lines */}
          <filter id="vesselBiolumGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Respiratory airflow motif — gentle arcs rising from the airway, breathing at a calm pace */}
        <motion.g
          style={{ opacity: breathOpacity }}
          transform={`translate(${parallax.x * 0.2}, ${parallax.y * 0.2})`}
        >
          <motion.path
            d="M 236 92 C 200 74, 196 40, 224 18"
            fill="none"
            stroke="url(#breathArcGrad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            animate={shouldReduceMotion ? {} : { opacity: [0.35, 0.85, 0.35], pathLength: [0.6, 1, 0.6] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 252 86 C 232 62, 234 34, 258 12"
            fill="none"
            stroke="url(#breathArcGrad)"
            strokeWidth="1.9"
            strokeLinecap="round"
            animate={shouldReduceMotion ? {} : { opacity: [0.3, 0.75, 0.3] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          />
          <motion.path
            d="M 268 84 C 262 58, 274 30, 298 14"
            fill="none"
            stroke="url(#breathArcGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={shouldReduceMotion ? {} : { opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
          />
          {/* Stylized respiratory waveform underline (illustrative breathing rhythm) */}
          <motion.path
            d="M 96 512 C 126 512, 132 512, 148 500 C 164 488, 168 476, 184 476 C 200 476, 204 500, 220 506 C 236 512, 262 512, 292 512 C 322 512, 328 512, 344 500 C 360 488, 364 476, 380 476 C 396 476, 400 500, 416 506 C 432 512, 458 512, 488 512"
            fill="none"
            stroke="rgba(75, 140, 129, 0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="3 5"
            animate={shouldReduceMotion ? {} : { opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>

        {/* ========================================================
            LAYER 1: REAR DNA STRAND & REAR RUNGS (BEHIND HEART)
           ======================================================== */}
        <motion.g
          style={isScene ? { opacity: helixOpacity } : undefined}
          opacity={isScene ? undefined : 0.68}
          filter="url(#vesselBiolumGlow)"
        >
          <path
            d="M 125 75 Q 175 125, 205 185 T 265 285 T 370 415 T 440 485"
            fill="none"
            stroke="url(#sageHelixArt)"
            strokeWidth="3.6"
            strokeLinecap="round"
          />

          {/* Rear Connecting Rungs */}
          <line x1="145" y1="100" x2="180" y2="140" stroke="url(#rungLightGlow)" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="200" y1="175" x2="240" y2="215" stroke="url(#rungLightGlow)" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="290" y1="315" x2="325" y2="355" stroke="url(#rungLightGlow)" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
          <line x1="385" y1="425" x2="415" y2="460" stroke="url(#rungLightGlow)" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
        </motion.g>

        {/* ========================================================
            LAYER 2: ANATOMICAL TRANSLUCENT HEART BULK
           ======================================================== */}
        <g filter="url(#cinematicGlassShadow)" transform={`translate(${parallax.x * 0.4}, ${parallax.y * 0.4})`}>
          {/* Superior Vena Cava */}
          <path
            d="M 220 135 C 220 100, 235 80, 245 65 C 253 77, 257 100, 255 135 Z"
            fill="url(#translucentAorta)"
            opacity="0.75"
          />

          {/* Ascending Aorta Arch & 3 Carotid/Subclavian Branches */}
          <path
            d="M 250 145 C 250 105, 260 75, 285 70 C 315 65, 342 90, 336 150 C 326 140, 310 130, 295 130 C 280 130, 260 135, 250 145 Z"
            fill="url(#translucentAorta)"
            opacity="0.88"
          />
          <path d="M 273 73 C 270 55, 275 46, 281 44 C 287 46, 285 57, 283 72 Z" fill="#D98A6C" opacity="0.85" />
          <path d="M 297 68 C 295 50, 301 42, 307 40 C 313 42, 311 53, 308 68 Z" fill="#E8B4A2" opacity="0.85" />
          <path d="M 320 74 C 320 57, 326 48, 332 47 C 338 49, 334 60, 330 77 Z" fill="#4B8C81" opacity="0.8" />

          {/* Pulmonary Artery Bifurcation — the respiratory side of the circulation */}
          <path
            d="M 275 150 C 285 120, 330 125, 350 140 C 340 155, 315 160, 300 160 Z"
            fill="url(#sageHelixArt)"
            opacity="0.6"
          />

          {/* Main Anatomical Heart Outer Shell */}
          <path
            d="M 265 155
               C 328 145, 390 175, 405 242
               C 420 304, 370 376, 288 448
               C 278 458, 256 458, 246 448
               C 170 380, 118 308, 134 242
               C 150 175, 210 145, 265 155 Z"
            fill="url(#myocardiumCenterGlow)"
            stroke="rgba(255, 255, 255, 0.95)"
            strokeWidth="2.8"
          />

          {/* Anterior Interventricular Sulcus Contours */}
          <path
            d="M 268 170 C 274 228, 260 320, 266 448"
            fill="none"
            stroke="rgba(217, 138, 108, 0.45)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Left Ventricle Internal Muscle Glow */}
          <path
            d="M 270 180
               C 318 175, 375 205, 385 262
               C 395 314, 354 372, 282 432
               C 274 360, 276 248, 270 180 Z"
            fill="url(#ventricleFillGlass)"
            opacity="0.82"
          />

          {/* Right Ventricle Internal Muscle Glow */}
          <path
            d="M 264 180
               C 220 175, 158 210, 148 268
               C 138 314, 178 376, 254 432
               C 260 360, 258 248, 264 180 Z"
            fill="url(#ventricleFillGlass)"
            opacity="0.68"
          />

          {/* Specular Edge Highlights for Glass Sheen */}
          <path
            d="M 150 225 C 140 272, 155 324, 192 365"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M 385 225 C 398 268, 385 324, 354 370"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
            opacity="0.65"
          />
        </g>

        {/* ========================================================
            LAYER 3: CORONARY VASCULAR NETWORK — soft glow underlay
           ======================================================== */}
        <g filter="url(#vesselBiolumGlow)" transform={`translate(${parallax.x * 0.7}, ${parallax.y * 0.7})`} opacity="0.5">
          <motion.path
            d="M 270 195 C 285 230, 298 275, 290 325 C 282 368, 268 405, 262 442"
            fill="none"
            stroke="#D98A6C"
            strokeWidth="5.5"
            strokeLinecap="round"
            style={drawStyle(vesselProgressValue)}
          />
          <motion.path
            d="M 250 195 C 220 220, 195 255, 185 300 C 178 335, 192 375, 235 425"
            fill="none"
            stroke="#D98A6C"
            strokeWidth="4.8"
            strokeLinecap="round"
            style={drawStyle(vesselProgressValue)}
          />
          <motion.path
            d="M 260 440 C 255 395, 245 340, 248 290 C 252 245, 262 215, 275 195"
            fill="none"
            stroke="#4B8C81"
            strokeWidth="5"
            strokeLinecap="round"
            style={drawStyle(vesselProgressValue)}
          />
        </g>

        {/* ========================================================
            LAYER 4: CRISP CORONARY VESSEL LINES (drawn above the glow)
           ======================================================== */}
        <g transform={`translate(${parallax.x * 0.7}, ${parallax.y * 0.7})`}>
          {/* --- Left Anterior Descending Artery (LAD - Terracotta Coral) --- */}
          <motion.path
            id="vesselLAD"
            d="M 270 195
               C 285 230, 298 275, 290 325
               C 282 368, 268 405, 262 442"
            fill="none"
            stroke="#D98A6C"
            strokeWidth="2.8"
            strokeLinecap="round"
            style={drawStyle(vesselProgressValue)}
          />
          {/* LAD Diagonal Branch 1 */}
          <motion.path
            d="M 285 245 C 315 260, 345 285, 362 315"
            fill="none"
            stroke="#D98A6C"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.85"
            style={drawStyle(vesselProgressValue)}
          />
          {/* LAD Diagonal Branch 2 */}
          <motion.path
            d="M 290 310 C 318 330, 338 358, 348 385"
            fill="none"
            stroke="#D98A6C"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
            style={drawStyle(vesselProgressValue)}
          />

          {/* --- Right Coronary Artery & Marginal Branches (RCA - Terracotta Coral) --- */}
          <motion.path
            id="vesselRCA"
            d="M 250 195
               C 220 220, 195 255, 185 300
               C 178 335, 192 375, 235 425"
            fill="none"
            stroke="#D98A6C"
            strokeWidth="2.4"
            strokeLinecap="round"
            style={drawStyle(vesselProgressValue)}
          />
          {/* RCA Acute Marginal Branch */}
          <motion.path
            d="M 195 260 C 175 280, 160 305, 155 330"
            fill="none"
            stroke="#D98A6C"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.8"
            style={drawStyle(vesselProgressValue)}
          />

          {/* --- Great Cardiac Vein & Tributaries (GCV - Sage Teal) --- */}
          <motion.path
            id="vesselGCV"
            d="M 260 440
               C 255 395, 245 340, 248 290
               C 252 245, 262 215, 275 195"
            fill="none"
            stroke="#4B8C81"
            strokeWidth="2.6"
            strokeLinecap="round"
            style={drawStyle(vesselProgressValue)}
          />
          {/* GCV Left Marginal Tributary */}
          <motion.path
            d="M 250 315 C 228 335, 208 360, 198 385"
            fill="none"
            stroke="#4B8C81"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.85"
            style={drawStyle(vesselProgressValue)}
          />
          {/* Anterior Interventricular Venous Branch */}
          <motion.path
            d="M 254 365 C 275 380, 295 400, 310 420"
            fill="none"
            stroke="#4B8C81"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.8"
            style={drawStyle(vesselProgressValue)}
          />

          {/* --- ANIMATED FLOWING BLOOD PARTICLES (CORAL & SAGE PULSES) --- */}
          <motion.g style={isScene ? { opacity: flowOpacity } : undefined}>
            {isSimulating && !shouldReduceMotion && (
              <>
                {/* LAD Arterial Blood Flow Particle (Coral Glow) */}
                <motion.circle
                  r="3.8"
                  fill="#FF7E5F"
                  filter="url(#vesselBiolumGlow)"
                  animate={{
                    cx: [270, 285, 298, 290, 268, 262],
                    cy: [195, 230, 275, 325, 405, 442],
                    opacity: [0, 1, 1, 1, 0.8, 0],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                <motion.circle
                  r="3.2"
                  fill="#D98A6C"
                  filter="url(#vesselBiolumGlow)"
                  animate={{
                    cx: [285, 315, 345, 362],
                    cy: [245, 260, 285, 315],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: 0.8,
                  }}
                />

                {/* RCA Arterial Blood Flow Particle */}
                <motion.circle
                  r="3.4"
                  fill="#FF7E5F"
                  filter="url(#vesselBiolumGlow)"
                  animate={{
                    cx: [250, 220, 195, 185, 235],
                    cy: [195, 220, 255, 300, 425],
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                />

                {/* GCV Venous Blood Flow Particle (Sage Teal Glow) */}
                <motion.circle
                  r="3.5"
                  fill="#5EEAD4"
                  filter="url(#vesselBiolumGlow)"
                  animate={{
                    cx: [260, 255, 245, 248, 275],
                    cy: [440, 395, 340, 290, 195],
                    opacity: [0, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                  }}
                />
              </>
            )}
          </motion.g>
        </g>

        {/* ========================================================
            LAYER 5: FOREGROUND DNA DOUBLE HELIX STRANDS & RUNGS
           ======================================================== */}
        <motion.g
          filter="url(#vesselBiolumGlow)"
          style={isScene ? { opacity: helixOpacity } : undefined}
          transform={`translate(${parallax.x * 0.9}, ${parallax.y * 0.9})`}
        >
          {/* Strand 2 (Warm Coral) spiraling over front ventricle */}
          <path
            d="M 395 85
               C 335 115, 245 165, 225 225
               C 205 285, 265 325, 305 355
               C 355 395, 325 445, 255 475
               C 195 500, 125 475, 95 445"
            fill="none"
            stroke="url(#coralHelixArt)"
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Strand 1 (Sage Teal) looping over anterior sulcus */}
          <path
            d="M 135 95
               C 195 125, 285 165, 305 215
               C 325 275, 245 315, 215 355
               C 185 395, 225 445, 285 470"
            fill="none"
            stroke="url(#sageHelixArt)"
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Foreground Glowing DNA Rungs */}
          <g strokeWidth="2.5" strokeLinecap="round">
            <line x1="230" y1="220" x2="300" y2="220" stroke="url(#rungLightGlow)" opacity="0.9" />
            <circle cx="230" cy="220" r="4.5" fill="#D98A6C" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="300" cy="220" r="4.5" fill="#4B8C81" stroke="#FFFFFF" strokeWidth="1.5" />

            <line x1="236" y1="270" x2="284" y2="270" stroke="url(#rungLightGlow)" opacity="0.88" />
            <circle cx="236" cy="270" r="4" fill="#4B8C81" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="284" cy="270" r="4" fill="#D98A6C" stroke="#FFFFFF" strokeWidth="1.5" />

            <line x1="220" y1="350" x2="300" y2="350" stroke="url(#rungLightGlow)" opacity="0.95" />
            <circle cx="220" cy="350" r="4.5" fill="#D98A6C" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="300" cy="350" r="4.5" fill="#4B8C81" stroke="#FFFFFF" strokeWidth="1.5" />

            <line x1="230" y1="415" x2="315" y2="410" stroke="url(#rungLightGlow)" opacity="0.9" />
            <circle cx="230" cy="415" r="4" fill="#4B8C81" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="315" cy="410" r="4" fill="#D98A6C" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>
        </motion.g>
      </motion.svg>

      {/* Centerpiece metadata status tag (hero variant only) */}
      {variant === 'hero' && (
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.95)',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.725rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-slate)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: 'var(--shadow-sm)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: isSimulating ? '#10B981' : '#9CA3AF',
              boxShadow: isSimulating ? '0 0 8px #10B981' : 'none',
              display: 'inline-block',
            }}
          />
          <span>Illustrative synthesis artwork · simulated flow, not patient data</span>
        </div>
      )}
    </div>
  );
};
