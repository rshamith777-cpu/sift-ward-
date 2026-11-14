import React from 'react';
import { ShieldAlert, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface SignalSummaryProps {
  onOpenWorkflowModal: () => void;
}

export const SignalSummary: React.FC<SignalSummaryProps> = ({ onOpenWorkflowModal }) => {
  return (
    <div
      role="region"
      aria-label="Prototype Signal View"
      className="frosted-panel"
      style={{
        padding: '24px',
        marginBottom: '40px',
        border: '1px solid var(--soft-border)',
        boxShadow: 'var(--shadow-sm)',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(246, 243, 238, 0.6) 100%)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px',
          alignItems: 'start',
        }}
        className="signal-summary-grid"
      >
        <style>{`
          @media (min-width: 900px) {
            .signal-summary-grid {
              grid-template-columns: 1.15fr 0.85fr !important;
            }
          }
        `}</style>

        {/* Left Side: Explainability & Information Factors */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--terracotta-dark)',
                backgroundColor: 'rgba(217, 138, 108, 0.15)',
                padding: '3px 9px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              PROTOTYPE SIGNAL VIEW
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
              Illustrative system output
            </span>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-slate)', marginBottom: '8px' }}>
            Multi-Source Trajectory Synthesis
          </h3>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: '16px' }}>
            SIFT-Ward synthesizes recent observation patterns and oxygen-requirement trajectories.
            It provides clinical teams with clear provenance—showing <em>why</em> a signal is flagged,
            <em>which</em> sensor contributed, and <em>how fresh</em> the data is.
          </p>

          {/* Types of information informing an advisory alert */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: 'var(--text-slate)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--sage-teal)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>EHR Flowsheet &amp; Oxygen Titration:</strong> Records changes in delivered FiO₂ and nasal cannula flow rates.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: 'var(--text-slate)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--sage-teal)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Continuous Waveform Stability:</strong> Monitors pulse wave amplitude, heart rate variability, and acoustic RR trend.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: 'var(--text-slate)' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--sage-teal)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Illustrative data-quality metadata:</strong> Surfaces artifacts and disconnects so poor data is treated as <em>uncertain — verify data</em>, never as reassurance or a low-risk state.
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Demo Transparency Box & Safety Policy */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-slate-subtle)',
            padding: '18px 20px',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={18} style={{ color: 'var(--terracotta)' }} />
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>
              Clinical Safety & Governance
            </h4>
          </div>

          <div
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              backgroundColor: 'rgba(246, 243, 238, 0.7)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              lineHeight: 1.45,
              border: '1px solid var(--border-slate-subtle)',
            }}
          >
            <p style={{ margin: 0, fontWeight: 600, color: '#9A3412' }}>
              Concept output only. Not a validated clinical model.
            </p>
            <p style={{ margin: '4px 0 0 0' }}>
              No probabilistic diagnosis or automated triage score is generated. The system strictly requests human bedside review under existing hospital escalation guidelines.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', flexWrap: 'wrap', gap: '6px' }}>
            <span>Demo data freshness: 4s (simulated)</span>
            <span>Illustrative data-quality metadata — not a clinical score</span>
          </div>

          <button
            type="button"
            onClick={onOpenWorkflowModal}
            className="btn-secondary"
            style={{
              width: '100%',
              fontSize: '0.85rem',
              padding: '10px 16px',
              marginTop: '4px',
            }}
          >
            <FileText size={15} aria-hidden="true" />
            <span>Open Clinical Response Pathway</span>
            <ArrowRight size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
