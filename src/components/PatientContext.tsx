import React from 'react';
import { UserCheck, Wind, Stethoscope, RefreshCw } from 'lucide-react';
import { PATIENT_CONTEXT } from '../mockData';

interface PatientContextProps {
  isSimulating: boolean;
  onToggleSimulate: () => void;
  lastTickTimestamp: string;
}

export const PatientContext: React.FC<PatientContextProps> = ({
  isSimulating,
  onToggleSimulate,
  lastTickTimestamp,
}) => {
  return (
    <div
      role="region"
      aria-label="Synthetic Patient Context"
      className="frosted-panel"
      style={{
        padding: '18px 24px',
        marginBottom: '20px',
        border: '1px solid var(--soft-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Patient Identity & Fictional Ward Metadata */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: 'var(--sage-tint)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--sage-teal-dark)',
              border: '1px solid rgba(75, 140, 129, 0.25)',
            }}
          >
            <UserCheck size={22} aria-hidden="true" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h2
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  color: 'var(--text-slate)',
                  margin: 0,
                }}
              >
                {PATIENT_CONTEXT.identifier}
              </h2>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  border: '1px solid #FDE68A',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontWeight: 600,
                }}
              >
                SYNTHETIC PROFILE
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-subtle)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                [NO REAL PATIENT DATA]
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                flexWrap: 'wrap',
                marginTop: '4px',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
              }}
            >
              <span>{PATIENT_CONTEXT.ward}</span>
              <span style={{ color: 'var(--border-slate-medium)' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Wind size={13} style={{ color: 'var(--sage-teal)' }} aria-hidden="true" />
                {PATIENT_CONTEXT.oxygenDelivery}
              </span>
              <span style={{ color: 'var(--border-slate-medium)' }}>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Stethoscope size={13} style={{ color: 'var(--terracotta)' }} aria-hidden="true" />
                Illustrative baseline NEWS2: <strong>2</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Telemetry Stream State & Live Demo Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isSimulating ? '#10B981' : '#F59E0B',
                  boxShadow: isSimulating ? '0 0 8px #10B981' : 'none',
                }}
              />
              <span style={{ fontWeight: 600, color: 'var(--text-slate)' }}>
                {isSimulating ? 'Synthetic Stream: Active' : 'Synthetic Stream: Paused'}
              </span>
            </div>
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.7rem' }}>
              Demo tick: {lastTickTimestamp} · no real data connection
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleSimulate}
            className="btn-ghost"
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            aria-label={isSimulating ? 'Pause synthetic simulation' : 'Start synthetic simulation'}
          >
            <RefreshCw size={13} className={isSimulating ? 'spin-slow' : ''} aria-hidden="true" />
            <span>{isSimulating ? 'Pause' : 'Resume'}</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow {
          animation: spinSlow 6s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .spin-slow {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
