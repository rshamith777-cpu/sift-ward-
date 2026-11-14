import React, { useState } from 'react';
import { SENSOR_COMPARISONS, SENSOR_GATE_METRICS } from '../mockData';
import { Compass, Plus, Minus, ArrowUpRight, Check, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

const TONE = {
  teal: {
    chipBg: 'rgba(75, 140, 129, 0.14)',
    chipBorder: 'rgba(75, 140, 129, 0.32)',
    chipText: 'var(--sage-teal-dark)',
    accent: 'var(--sage-teal)',
  },
  coral: {
    chipBg: 'rgba(217, 138, 108, 0.16)',
    chipBorder: 'rgba(217, 138, 108, 0.36)',
    chipText: 'var(--terracotta-dark)',
    accent: 'var(--terracotta)',
  },
  slate: {
    chipBg: 'rgba(30, 36, 43, 0.07)',
    chipBorder: 'rgba(30, 36, 43, 0.14)',
    chipText: 'var(--text-muted)',
    accent: 'var(--text-subtle)',
  },
  amber: {
    chipBg: 'rgba(217, 138, 108, 0.16)',
    chipBorder: 'rgba(217, 138, 108, 0.36)',
    chipText: 'var(--terracotta-dark)',
    accent: 'var(--terracotta)',
  },
} as const;

export const SensorValueGate: React.FC = () => {
  const [selectedSensorTab, setSelectedSensorTab] = useState<string>(SENSOR_COMPARISONS[0].id);
  const shouldReduceMotion = useReducedMotion();

  const selected = SENSOR_COMPARISONS.find((s) => s.id === selectedSensorTab) ?? SENSOR_COMPARISONS[0];
  const tone = TONE[selected.badgeColor];

  return (
    <section
      id="sensor-value"
      style={{
        paddingTop: '64px',
        paddingBottom: '64px',
        position: 'relative',
      }}
      aria-labelledby="sensor-value-heading"
    >
      <div className="layout-container">
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span className="section-eyebrow section-eyebrow--sage">
              THE SENSOR VALUE GATE
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
              Proposed evaluation framework
            </span>
          </div>

          <h2
            id="sensor-value-heading"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.1rem)',
              fontWeight: 800,
              color: 'var(--text-slate)',
              letterSpacing: '-0.035em',
              marginBottom: '14px',
            }}
          >
            Every sensor must{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #D98A6C 0%, #B96B4F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              earn its alert.
            </span>
          </h2>

          <p style={{ fontSize: '1.02rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
            Wards cannot absorb indiscriminate alarms or hardware costs without proven utility.
            The question is not which model is newest — it is whether each added data source
            improves care enough to justify what it costs the ward.
          </p>
        </div>

        {/* The Gate Question — focal band */}
        <motion.blockquote
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            margin: '0 0 40px 0',
            padding: 'clamp(22px, 3.5vw, 36px) clamp(22px, 4vw, 44px)',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(135deg, rgba(217, 138, 108, 0.12) 0%, rgba(255, 255, 255, 0.92) 55%, rgba(220, 230, 225, 0.5) 100%)',
            border: '1px solid var(--terracotta-border)',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(217, 138, 108, 0.18), transparent 70%)',
              filter: 'blur(24px)',
            }}
          />
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', position: 'relative' }}>
            <Compass size={28} style={{ color: 'var(--terracotta-dark)', flexShrink: 0, marginTop: '4px' }} aria-hidden="true" />
            <div>
              <p
                style={{
                  fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                  fontWeight: 700,
                  color: 'var(--text-slate)',
                  lineHeight: 1.45,
                  letterSpacing: '-0.01em',
                  marginBottom: '6px',
                }}
              >
                “Does this added data source improve useful warning compared with the simpler
                approach — at an alert burden the ward can manage?”
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
                The Sensor Value Gate · proposed evaluation question
              </p>
            </div>
          </div>
        </motion.blockquote>

        {/* Four Monitoring Categories — segmented selector + detail panel */}
        <div style={{ marginBottom: '44px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '18px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-slate)' }}>
              Four monitoring categories under comparison
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
              Select a category to review its proposed role
            </span>
          </div>

          {/* Segmented selector */}
          <div
            role="tablist"
            aria-label="Monitoring categories"
            className="segmented"
            style={{ marginBottom: '20px', flexWrap: 'wrap' }}
          >
            {SENSOR_COMPARISONS.map((sensor) => (
              <button
                key={sensor.id}
                type="button"
                role="tab"
                id={`sensor-tab-${sensor.id}`}
                aria-selected={selectedSensorTab === sensor.id}
                aria-controls={`sensor-panel-${sensor.id}`}
                onClick={() => setSelectedSensorTab(sensor.id)}
              >
                {sensor.title.split(' ').slice(0, 2).join(' ')}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              id={`sensor-panel-${selected.id}`}
              role="tabpanel"
              aria-labelledby={`sensor-tab-${selected.id}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="frosted-panel"
              style={{
                padding: 'clamp(20px, 3vw, 32px)',
                border: selected.badgeColor === 'coral' ? '1px solid var(--terracotta-border)' : '1px solid var(--soft-border)',
                background:
                  selected.badgeColor === 'coral'
                    ? 'linear-gradient(135deg, rgba(217, 138, 108, 0.07) 0%, rgba(255, 255, 255, 0.88) 100%)'
                    : 'var(--frosted-card)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Panel header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <div>
                  <span
                    className="section-eyebrow"
                    style={{
                      background: tone.chipBg,
                      border: `1px solid ${tone.chipBorder}`,
                      color: tone.chipText,
                      marginBottom: '10px',
                      display: 'inline-flex',
                    }}
                  >
                    {selected.badge}
                  </span>
                  <h4 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-slate)', margin: '8px 0 2px 0' }}>
                    {selected.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>{selected.subtitle}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      background: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid var(--border-slate-subtle)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                    }}
                  >
                    Alert burden risk: {selected.alertBurdenRisk}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      color: 'var(--text-muted)',
                      background: 'rgba(255, 255, 255, 0.7)',
                      border: '1px solid var(--border-slate-subtle)',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                    }}
                  >
                    Integration: {selected.integrationComplexity}
                  </span>
                </div>
              </div>

              {/* Value vs limitations */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '20px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    padding: '16px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(220, 230, 225, 0.28)',
                    border: '1px solid rgba(75, 140, 129, 0.22)',
                  }}
                >
                  <h5 style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--sage-teal-dark)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <Plus size={12} aria-hidden="true" /> Potential role
                  </h5>
                  <ul style={{ paddingLeft: '2px', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selected.potentialValue.map((val, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.84rem', color: 'var(--text-slate)', lineHeight: 1.5 }}>
                        <Check size={14} style={{ color: 'var(--sage-teal)', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  style={{
                    padding: '16px 18px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(246, 243, 238, 0.65)',
                    border: '1px solid var(--border-slate-subtle)',
                  }}
                >
                  <h5 style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--terracotta-dark)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <Minus size={12} aria-hidden="true" /> Limitations
                  </h5>
                  <ul style={{ paddingLeft: '2px', margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selected.limitations.map((lim, idx) => (
                      <li key={idx} style={{ display: 'flex', gap: '8px', fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        <X size={14} style={{ color: 'var(--terracotta)', flexShrink: 0, marginTop: '3px' }} aria-hidden="true" />
                        <span>{lim}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Proposed role band */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.85)',
                  border: `1px solid ${tone.chipBorder}`,
                }}
              >
                <ArrowUpRight size={18} style={{ color: tone.accent, flexShrink: 0 }} aria-hidden="true" />
                <p style={{ fontSize: '0.88rem', color: 'var(--text-slate)', lineHeight: 1.5, margin: 0 }}>
                  <strong>Proposed evaluation role: </strong>
                  {selected.proposedRole}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Gate dimensions — compact strip (all to be evaluated) */}
        <div
          className="frosted-panel"
          style={{
            padding: 'clamp(18px, 2.5vw, 26px)',
            border: '1px solid rgba(75, 140, 129, 0.35)',
            boxShadow: 'var(--shadow-md)',
            background: 'linear-gradient(135deg, rgba(220, 230, 225, 0.3) 0%, rgba(255, 255, 255, 0.95) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <Compass size={20} style={{ color: 'var(--sage-teal)' }} aria-hidden="true" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-slate)', margin: 0 }}>
              What the gate would measure
            </h3>
            <span
              style={{
                fontSize: '0.68rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 700,
                backgroundColor: '#FEF3C7',
                color: '#92400E',
                border: '1px solid #FDE68A',
                padding: '3px 8px',
                borderRadius: '9999px',
                whiteSpace: 'nowrap',
              }}
            >
              All to be evaluated — no results claimed
            </span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {SENSOR_GATE_METRICS.map((row) => (
              <span
                key={row.dimension}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  color: 'var(--text-slate)',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid var(--border-slate-subtle)',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--sage-teal)' }} aria-hidden="true" />
                {row.dimension}
              </span>
            ))}
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: '12px 0 0 0' }}>
            Each dimension compares the added-signal approach with the simpler baseline. Values are
            intentionally blank until the proposed retrospective and shadow evaluations are run.
          </p>
        </div>
      </div>
    </section>
  );
};
