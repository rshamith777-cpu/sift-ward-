import React, { useState } from 'react';
import { Clock, Activity, Waves } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export const ObservationGapStory: React.FC = () => {
  const [scrubHour, setScrubHour] = useState<number>(14.5); // Default: 14:30 (inside the illustrative 12:00–16:00 gap)
  const shouldReduceMotion = useReducedMotion();

  // Timeline points for routine obs (illustrative example times)
  const routineRounds = [
    { time: '08:00', label: 'Morning Round', news2: 'NEWS2: 1', spo2: '98%', rr: '16/min' },
    { time: '12:00', label: 'Midday Round', news2: 'NEWS2: 2', spo2: '97%', rr: '17/min' },
    { time: '16:00', label: 'Afternoon Round', news2: 'NEWS2: 5', spo2: '93%', rr: '22/min' },
    { time: '20:00', label: 'Evening Round', news2: 'NEWS2: 3', spo2: '96%', rr: '18/min' },
  ];

  // Calculate simulated values at scrubHour (8 to 20) for this illustrative timeline only
  const getInterpolatedState = (h: number) => {
    const inGap = (h > 8 && h < 12) || (h > 12 && h < 16) || (h > 16 && h < 20);
    const closestRound = h <= 10 ? '08:00' : h <= 14 ? '12:00' : h <= 18 ? '16:00' : '20:00';

    let simulatedSpo2 = 97;
    let simulatedRR = 17;

    if (h >= 12 && h <= 16) {
      const progress = (h - 12) / 4;
      simulatedSpo2 = Math.round(97 - progress * 4);
      simulatedRR = Math.round(17 + progress * 5);
    } else if (h < 12) {
      simulatedSpo2 = 98;
      simulatedRR = 16;
    } else {
      simulatedSpo2 = 95;
      simulatedRR = 19;
    }

    return {
      inGap,
      closestRound,
      simulatedSpo2,
      simulatedRR,
    };
  };

  const stateAtScrub = getInterpolatedState(scrubHour);

  return (
    <section
      id="observation-gap"
      style={{
        paddingTop: '56px',
        paddingBottom: '56px',
        position: 'relative',
        zIndex: 10,
      }}
      aria-labelledby="gap-story-heading"
    >
      <div className="layout-container">
        {/* Section Header */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '820px', marginBottom: '32px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="section-eyebrow section-eyebrow--coral">
              ILLUSTRATIVE TIMELINE
            </span>
            <span className="demo-pill">
              SIMULATED LIVE DEMO — NOT FOR CLINICAL USE
            </span>
          </div>

          <h2
            id="gap-story-heading"
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 800,
              color: 'var(--text-slate)',
              letterSpacing: '-0.03em',
              marginBottom: '12px',
            }}
          >
            What can happen between documented observations?
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            Vital signs are captured episodically on general wards. This visualization shows a
            potential information gap — <strong>observation frequency varies by local protocol and clinical context.</strong>
          </p>
        </motion.div>

        {/* Interactive Timeline Card */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="frosted-panel"
          style={{
            padding: 'clamp(20px, 3vw, 36px)',
            border: '1px solid var(--soft-border)',
            boxShadow: 'var(--shadow-lg)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(246, 243, 238, 0.78) 100%)',
          }}
        >
          {/* Timeline caption row */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Waves size={16} style={{ color: 'var(--terracotta)' }} aria-hidden="true" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-slate)' }}>
                  Illustrative 12-hour ward trajectory (example times, 08:00 – 20:00)
                </span>
              </div>
              <span
                className="demo-pill"
                aria-live="polite"
              >
                Selected {Math.floor(scrubHour).toString().padStart(2, '0')}:
                {Math.round((scrubHour % 1) * 60).toString().padStart(2, '0')} · synthetic
              </span>
            </div>

            {/* Visual SVG Timeline Canvas */}
            <div className="thin-scroll" style={{ width: '100%', overflowX: 'auto' }}>
              <svg
                viewBox="0 0 800 168"
                style={{ width: '100%', minWidth: '620px', height: 'auto', display: 'block' }}
                role="img"
                aria-label="Illustrative timeline with four documented observation rounds and shaded intervals between them where respiratory drift could go undocumented"
              >
                <defs>
                  <pattern id="gapHatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(217, 138, 108, 0.13)" strokeWidth="3" />
                  </pattern>
                </defs>

                {/* Base Timeline Axis */}
                <line x1="40" y1="92" x2="760" y2="92" stroke="var(--border-slate-medium)" strokeWidth="2" strokeDasharray="2 2" />

                {/* Gap 1 (08:00 - 12:00) */}
                <rect x="100" y="34" width="180" height="92" rx="8" fill="url(#gapHatch)" />
                <text x="190" y="52" textAnchor="middle" fontSize="10.5" fill="var(--text-subtle)" fontFamily="var(--font-mono)">
                  Documented round → next entry
                </text>

                {/* Gap 2 (12:00 - 16:00: Active Illustrative Drift Window) */}
                <rect x="340" y="34" width="180" height="92" rx="8" fill="rgba(217, 138, 108, 0.12)" stroke="rgba(217, 138, 108, 0.35)" strokeWidth="1" />
                <text x="430" y="52" textAnchor="middle" fontSize="10.5" fill="var(--terracotta-dark)" fontWeight="700" fontFamily="var(--font-mono)">
                  Illustrative drift window
                </text>

                {/* Gap 3 (16:00 - 20:00) */}
                <rect x="580" y="34" width="140" height="92" rx="8" fill="url(#gapHatch)" />
                <text x="650" y="52" textAnchor="middle" fontSize="10.5" fill="var(--text-subtle)" fontFamily="var(--font-mono)">
                  Next documented entry
                </text>

                {/* Continuous physiological drift curve (illustrative synthetic path) */}
                <path
                  d="M 100 84
                     C 160 84, 220 86, 280 88
                     C 340 90, 380 108, 430 118
                     C 480 122, 520 88, 580 86
                     L 720 86"
                  fill="none"
                  stroke="var(--terracotta)"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />

                {/* 4 Illustrative Observation Nodes */}
                {routineRounds.map((r, idx) => {
                  const x = 100 + idx * 180 + (idx === 3 ? 60 : 0);
                  const isPastScrub = (8 + idx * 4) <= scrubHour;

                  return (
                    <g key={r.time}>
                      <circle cx={x} cy="92" r="12" fill={isPastScrub ? '#4B8C81' : '#FFFFFF'} stroke="#4B8C81" strokeWidth="3" />
                      <circle cx={x} cy="92" r="4" fill={isPastScrub ? '#FFFFFF' : '#4B8C81'} />
                      <text x={x} y="128" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--text-slate)" fontFamily="var(--font-mono)">
                        {r.time}
                      </text>
                      <text x={x} y="145" textAnchor="middle" fontSize="10" fill="var(--text-muted)">
                        {r.label}
                      </text>
                      <rect x={x - 38} y="64" width="76" height="18" rx="4" fill="#FFFFFF" stroke="rgba(75, 140, 129, 0.4)" strokeWidth="1" />
                      <text x={x} y="76" textAnchor="middle" fontSize="9" fontWeight="600" fill="var(--sage-teal-dark)" fontFamily="var(--font-mono)">
                        {r.news2}
                      </text>
                    </g>
                  );
                })}

                {/* Interactive Scrub Cursor */}
                {(() => {
                  const cursorX = 100 + ((scrubHour - 8) / 12) * 600;
                  return (
                    <g>
                      <line x1={cursorX} y1="22" x2={cursorX} y2="138" stroke="var(--terracotta)" strokeWidth="2.5" />
                      <circle cx={cursorX} cy="92" r="7" fill="var(--terracotta)" stroke="#FFFFFF" strokeWidth="2" />
                      <polygon points={`${cursorX - 6},20 ${cursorX + 6},20 ${cursorX},28`} fill="var(--terracotta)" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Scrub Slider Input */}
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>08:00</span>
              <input
                type="range"
                min="8"
                max="20"
                step="0.25"
                value={scrubHour}
                onChange={(e) => setScrubHour(parseFloat(e.target.value))}
                style={{
                  flex: 1,
                  accentColor: 'var(--terracotta)',
                  cursor: 'pointer',
                  minHeight: '28px',
                }}
                aria-label="Scrub through the illustrative 12-hour ward timeline"
                aria-valuetext={`${Math.floor(scrubHour).toString().padStart(2, '0')}:${Math.round((scrubHour % 1) * 60).toString().padStart(2, '0')} illustrative time`}
              />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>20:00</span>
            </div>
          </div>

          {/* Dual Perspective Comparison */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '18px',
            }}
          >
            {/* Left: What documentation shows */}
            <div
              style={{
                padding: '22px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-slate-subtle)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(75, 140, 129, 0.14)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Clock size={16} style={{ color: 'var(--sage-teal-dark)' }} aria-hidden="true" />
                </span>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>
                  What the documented record shows
                </h3>
              </div>

              <p style={{ fontSize: '0.87rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '12px' }}>
                {stateAtScrub.inGap ? (
                  <>
                    At this illustrative moment, the team sees the vital signs recorded at the{' '}
                    <strong>{stateAtScrub.closestRound}</strong> round. Nothing new is documented
                    since then — the patient's state in this interval is unknown from the chart alone.
                  </>
                ) : (
                  <>
                    A bedside nursing round is in progress at <strong>{stateAtScrub.closestRound}</strong> in
                    this illustrative timeline. The recorded NEWS2 score is captured at that moment.
                  </>
                )}
              </p>

              <div
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(246, 243, 238, 0.7)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-subtle)',
                }}
              >
                Illustrative chart state · last entry {stateAtScrub.closestRound}
              </div>
            </div>

            {/* Right: What added sensing could see */}
            <div
              style={{
                padding: '22px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, rgba(217, 138, 108, 0.08) 0%, #FFFFFF 70%)',
                border: '1px solid var(--terracotta-border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(217, 138, 108, 0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Activity size={16} style={{ color: 'var(--terracotta-dark)' }} aria-hidden="true" />
                </span>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, margin: 0, color: 'var(--terracotta-dark)' }}>
                  What added sensing could evaluate
                </h3>
              </div>

              <p style={{ fontSize: '0.87rem', color: 'var(--text-slate)', lineHeight: 1.55, marginBottom: '12px' }}>
                In this scripted example, added sensing shows a synthetic respiratory drift
                (RR <strong>{stateAtScrub.simulatedRR}/min</strong>, SpO₂ <strong>{stateAtScrub.simulatedSpo2}%</strong>).
                Whether such coverage improves real warning is what the Sensor Value Gate would test.
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(217, 138, 108, 0.1)',
                  fontSize: '0.78rem',
                  color: 'var(--terracotta-dark)',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <span>Simulated RR: {stateAtScrub.simulatedRR} /min</span>
                <span>Simulated SpO₂: {stateAtScrub.simulatedSpo2}%</span>
                <span>Synthetic signal status: illustrative</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
