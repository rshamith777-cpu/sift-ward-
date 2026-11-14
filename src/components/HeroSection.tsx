import React from 'react';
import { ArrowDown, FileText, ShieldCheck, Cpu } from 'lucide-react';
import { HeartHelixArtwork } from './HeartHelixArtwork';
import { motion, useReducedMotion } from 'framer-motion';

interface HeroSectionProps {
  onOpenWorkflowModal: () => void;
  isSimulating: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWorkflowModal, isSimulating }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="overview"
      style={{
        paddingTop: '36px',
        paddingBottom: '40px',
        position: 'relative',
        zIndex: 10,
      }}
      aria-labelledby="hero-heading"
    >
      <div className="layout-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '40px',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          <style>{`
            @media (min-width: 960px) {
              .hero-grid {
                grid-template-columns: 1.12fr 0.88fr !important;
                gap: 48px !important;
              }
            }
          `}</style>

          {/* Left Column: Mission, Headings & Action CTAs */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            {/* Eyebrow badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="section-eyebrow section-eyebrow--sage">
                <Cpu size={13} aria-hidden="true" />
                SIFT-Ward · Respiratory safety
              </span>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--terracotta-dark)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                “Every sensor must earn its alert.”
              </span>
            </div>

            {/* Main Heading */}
            <h1
              id="hero-heading"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--text-slate)',
              }}
            >
              See the shift.{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #D98A6C 0%, #B96B4F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Support the next step.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: 'clamp(1.02rem, 1.6vw, 1.18rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: '580px',
              }}
            >
              Respiratory changes can develop between routine observations. SIFT-Ward explores
              whether additional signals give clinicians useful warning — and makes data quality
              and human response part of the design.
            </p>

            {/* Proposed population & target callout */}
            <div
              style={{
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(255, 255, 255, 0.72)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--sage-teal)',
                  }}
                />
                <span style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--sage-teal-dark)' }}>
                  Proposed pathway · demo values are simulated
                </span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-slate)', lineHeight: 1.55, margin: 0 }}>
                Initial evaluation population: <strong>adult ward patients with a new or increasing
                oxygen requirement</strong>. Proposed evaluation target: <strong>unplanned
                respiratory-support escalation within a defined window</strong> — a proposed target
                for study, not a validated model result.
              </p>
            </div>

            {/* Call to Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', paddingTop: '6px' }}>
              <a href="#signal-story" className="btn-primary">
                <span>Explore the signal</span>
                <ArrowDown size={16} aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={onOpenWorkflowModal}
                className="btn-secondary"
              >
                <FileText size={16} aria-hidden="true" />
                <span>See the response pathway</span>
              </button>
            </div>

            {/* Concise Trust Note */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                paddingTop: '4px',
              }}
            >
              <ShieldCheck size={18} style={{ color: 'var(--sage-teal)', flexShrink: 0 }} aria-hidden="true" />
              <span>
                <strong>AI supports the team. Clinical judgment leads.</strong> Alerts request human
                assessment under local procedures.
              </span>
            </div>
          </motion.div>

          {/* Right Column: Custom centerpiece artwork with blood-flow animation */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              position: 'relative',
            }}
          >
            <HeartHelixArtwork isSimulating={isSimulating} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
