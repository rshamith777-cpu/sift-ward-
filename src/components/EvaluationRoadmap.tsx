import React from 'react';
import { EVALUATION_STAGES } from '../mockData';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export const EvaluationRoadmap: React.FC = () => {
  return (
    <section
      id="evidence"
      style={{
        paddingTop: '48px',
        paddingBottom: '56px',
        position: 'relative',
      }}
      aria-labelledby="roadmap-heading"
    >
      <div className="layout-container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--sage-teal-dark)',
                backgroundColor: 'rgba(75, 140, 129, 0.14)',
                padding: '3px 10px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              IMPLEMENTATION ROADMAP
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
              Staged translational evaluation
            </span>
          </div>

          <h2
            id="roadmap-heading"
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-slate)',
              letterSpacing: '-0.025em',
              marginBottom: '12px',
            }}
          >
            Staged Clinical Evaluation Roadmap
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            SIFT-Ward advances only through hard stop/go gates — from retrospective data audits to
            silent shadowing before any live bedside pilot.
          </p>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          {EVALUATION_STAGES.map((stage, idx) => (
            <div
              key={stage.step}
              className="frosted-panel"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                border: '1px solid var(--soft-border)',
                background: 'rgba(255, 255, 255, 0.72)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--sage-teal-dark)',
                      backgroundColor: 'rgba(75, 140, 129, 0.14)',
                      padding: '3px 8px',
                      borderRadius: '6px',
                    }}
                  >
                    {stage.step}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
                    Gate 0{idx + 1}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-slate)', marginBottom: '8px' }}>
                  {stage.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {stage.objective}
                </p>

                <div
                  style={{
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(220, 230, 225, 0.45)',
                    fontSize: '0.75rem',
                    color: 'var(--sage-teal-dark)',
                    fontWeight: 600,
                    marginBottom: '14px',
                  }}
                >
                  Deliverable: {stage.deliverable}
                </div>
              </div>

              <div
                style={{
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-slate-subtle)',
                  fontSize: '0.72rem',
                  color: 'var(--text-subtle)',
                  lineHeight: 1.4,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '5px',
                }}
              >
                <AlertTriangle size={12} style={{ color: 'var(--terracotta)', flexShrink: 0, marginTop: '2px' }} />
                <span>{stage.warning}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Retrospective Caveat Notice */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid var(--border-slate-subtle)',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            lineHeight: 1.5,
          }}
        >
          <ShieldAlert size={20} style={{ color: 'var(--terracotta)', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
          <span>
            <strong>Scientific guardrail:</strong> MIMIC waveform data and eICU are ICU-focused
            research resources and no retrospective dataset proves clinical effectiveness.
            Prospective shadow validation remains necessary before any clinical adoption.
          </span>
        </div>
      </div>
    </section>
  );
};
