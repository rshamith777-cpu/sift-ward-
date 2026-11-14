import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { HeartHelixArtwork } from './HeartHelixArtwork';

interface StoryStage {
  num: string;
  title: string;
  body: string;
}

const STAGES: StoryStage[] = [
  {
    num: '01',
    title: 'The information gap',
    body: 'Deterioration can develop between documented observations — the chart alone cannot show it.',
  },
  {
    num: '02',
    title: 'What added signals could add — and cost',
    body: 'Continuous and ambient sensing may cover those intervals, balanced against artifacts, workflow, and alarm burden.',
  },
  {
    num: '03',
    title: 'The Sensor Value Gate',
    body: 'Does each added signal improve useful warning enough to justify its cost to the ward? That is the proposed evaluation.',
  },
];

export const ScrollStoryScene: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [stageIndex, setStageIndex] = useState<number>(0);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 960px)');
    const update = () => setIsDesktop(mq.matches && !shouldReduceMotion);
    update();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', update);
    } else {
      mq.addListener(update);
    }
    return () => {
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', update);
      } else {
        mq.removeListener(update);
      }
    };
  }, [shouldReduceMotion]);

  const trackRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  // One stage active at a time — thirds of the track
  useMotionValueEvent(smooth, 'change', (v) => {
    const idx = v >= 0.66 ? 2 : v >= 0.3 ? 1 : 0;
    setStageIndex((prev) => (prev === idx ? prev : idx));
  });

  const vesselProgress = useTransform(smooth, [0.05, 0.55], [0, 1]);
  const artY = useTransform(smooth, [0, 1], [14, -14]);

  // Badge visibility follows the active stage
  const ehrOpacity = useTransform(smooth, [0.02, 0.08], [0, 1]);
  const contOpacity = useTransform(smooth, [0.32, 0.38], [0, 1]);
  const ambOpacity = useTransform(smooth, [0.36, 0.42], [0, 1]);

  const cinematic = isDesktop && !shouldReduceMotion;

  const badge = (
    label: string,
    sub: string,
    opacity: MotionValue<number>,
    position: React.CSSProperties,
    tone: 'sage' | 'coral' | 'slate'
  ) => (
    <motion.div
      style={{
        opacity,
        position: 'absolute',
        ...position,
        zIndex: 3,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '7px 12px',
          borderRadius: '9999px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border:
            tone === 'coral'
              ? '1px solid var(--terracotta-border)'
              : tone === 'sage'
              ? '1px solid rgba(75, 140, 129, 0.35)'
              : '1px dashed var(--border-slate-medium)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background:
              tone === 'coral'
                ? 'var(--terracotta)'
                : tone === 'sage'
                ? 'var(--sage-teal)'
                : 'var(--text-subtle)',
          }}
        />
        <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-slate)' }}>{label}</span>
        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)' }}>{sub}</span>
      </div>
    </motion.div>
  );

  const stage = STAGES[stageIndex];

  return (
    <section
      id="signal-story"
      aria-labelledby="signal-story-heading"
      style={{ position: 'relative', zIndex: 10 }}
    >
      <div className="layout-container" style={{ paddingTop: '40px' }}>
        {/* Static section header — always visible */}
        <div style={{ maxWidth: '760px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
            <span className="section-eyebrow section-eyebrow--coral">
              ILLUSTRATIVE SCROLL SEQUENCE
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
              Scroll-driven visualization · not recorded clinical footage
            </span>
          </div>
          <h2
            id="signal-story-heading"
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              marginBottom: '10px',
            }}
          >
            Why sensing between entries is the question
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            The sequence below is illustrative — it demonstrates a potential information gap,
            not a universal ward schedule. Observation frequency varies by local protocol and clinical context.
          </p>
        </div>
      </div>

      {/* Short scroll stage: 200vh on desktop, stacked flow otherwise */}
      <div
        ref={trackRef}
        className="scroll-story-track"
        style={{ height: cinematic ? '200vh' : 'auto' }}
      >
        <div className="scroll-story-stage">
          <div
            className="layout-container"
            style={{
              display: 'grid',
              gridTemplateColumns: cinematic ? '1fr 1fr' : '1fr',
              gap: cinematic ? '40px' : '28px',
              alignItems: 'center',
              width: '100%',
            }}
          >
            {/* Sticky artwork with signal badges */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <motion.div
                style={
                  cinematic
                    ? { y: artY, width: '100%', maxWidth: '500px' }
                    : { width: '100%', maxWidth: '440px' }
                }
              >
                {cinematic ? (
                  <HeartHelixArtwork
                    variant="scene"
                    vesselProgress={vesselProgress}
                    isSimulating
                  />
                ) : (
                  <HeartHelixArtwork variant="scene" isSimulating />
                )}
              </motion.div>

              {cinematic && (
                <>
                  {badge('EHR trends', 'recorded · delayed', ehrOpacity, { top: '8%', right: '2%' }, 'sage')}
                  {badge('Continuous', 'artifact-prone', contOpacity, { top: '38%', right: '-4%' }, 'coral')}
                  {badge('Ambient', 'contactless · unproven', ambOpacity, { bottom: '6%', right: '6%' }, 'slate')}
                </>
              )}
            </div>

            {/* Single active caption — swaps cleanly, never overlaps */}
            {cinematic ? (
              <div style={{ position: 'relative', minHeight: '260px', display: 'flex', alignItems: 'center' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={stage.num}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                      <span
                        className="mono-text"
                        style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--terracotta-dark)' }}
                      >
                        {stage.num}
                      </span>
                      <span
                        style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(217,138,108,0.5), transparent)' }}
                      />
                    </div>
                    <h3
                      style={{
                        fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)',
                        fontWeight: 800,
                        letterSpacing: '-0.02em',
                        color: 'var(--text-slate)',
                        marginBottom: '12px',
                      }}
                    >
                      {stage.title}
                    </h3>
                    <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: '420px' }}>
                      {stage.body}
                    </p>

                    {/* Stage dots */}
                    <div aria-hidden="true" style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                      {STAGES.map((s, i) => (
                        <span
                          key={s.num}
                          style={{
                            width: i === stageIndex ? '22px' : '7px',
                            height: '7px',
                            borderRadius: '9999px',
                            backgroundColor: i === stageIndex ? 'var(--terracotta)' : 'rgba(75, 140, 129, 0.4)',
                            transition: 'all 0.3s ease',
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {STAGES.map((s) => (
                  <div key={s.num}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '6px' }}>
                      <span
                        className="mono-text"
                        style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--terracotta-dark)' }}
                      >
                        {s.num}
                      </span>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                        {s.title}
                      </h3>
                    </div>
                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
