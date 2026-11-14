import React from 'react';
import { Activity, ShieldAlert, Database } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: '1px solid var(--border-slate-subtle)',
        backgroundColor: '#FFFFFF',
        padding: '48px 0 32px 0',
        marginTop: '32px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <div className="layout-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '36px',
            marginBottom: '40px',
          }}
        >
          {/* Brand & Mission Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4B8C81 0%, #376E65 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <Activity size={16} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-slate)' }}>
                SIFT-Ward
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              A proposed, data-quality-aware early-warning pathway for respiratory deterioration
              on adult hospital wards. Every sensor must earn its alert before any recommendation
              for ward deployment.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'rgba(217, 138, 108, 0.12)',
                color: 'var(--terracotta-dark)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                width: 'fit-content',
              }}
            >
              <ShieldAlert size={13} />
              <span>SIMULATED LIVE DEMO — NOT FOR CLINICAL USE</span>
            </div>
          </div>

          {/* Data & Evidence Caveats */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-slate)', letterSpacing: '0.04em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Database size={13} aria-hidden="true" /> Data &amp; Evidence Caveats
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <li>
                MIMIC waveform data and eICU are <strong>ICU-focused research resources</strong>;
                the SMART Health IT sandbox contains synthetic test data. No retrospective dataset
                proves clinical effectiveness.
              </li>
              <li>
                Prospective evaluation would be required before any deployment claim.
              </li>
            </ul>
          </div>

          {/* Quick Nav & Prototype Links */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-slate)', letterSpacing: '0.04em', marginBottom: '12px' }}>
              Interface Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <li>
                <a href="#overview" style={{ color: 'var(--sage-teal-dark)', textDecoration: 'none', fontWeight: 500 }}>
                  Overview &amp; concept
                </a>
              </li>
              <li>
                <a href="#signal-story" style={{ color: 'var(--sage-teal-dark)', textDecoration: 'none', fontWeight: 500 }}>
                  Illustrative scroll sequence
                </a>
              </li>
              <li>
                <a href="#live-signals" style={{ color: 'var(--sage-teal-dark)', textDecoration: 'none', fontWeight: 500 }}>
                  Simulated live monitor
                </a>
              </li>
              <li>
                <a href="#sensor-value" style={{ color: 'var(--sage-teal-dark)', textDecoration: 'none', fontWeight: 500 }}>
                  The Sensor Value Gate
                </a>
              </li>
              <li>
                <a href="#workflow" style={{ color: 'var(--sage-teal-dark)', textDecoration: 'none', fontWeight: 500 }}>
                  Human response workflow
                </a>
              </li>
              <li>
                <a href="#evidence" style={{ color: 'var(--sage-teal-dark)', textDecoration: 'none', fontWeight: 500 }}>
                  Staged evaluation roadmap
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Privacy & Regulatory Note — qualified wording */}
        <div
          style={{
            padding: '14px 18px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(246, 243, 238, 0.8)',
            border: '1px solid var(--border-slate-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '20px',
          }}
        >
          <strong style={{ color: 'var(--text-slate)' }}>Privacy &amp; regulatory note (qualified):</strong>{' '}
          Regulatory classification depends on intended use, functionality, evidence, and
          jurisdiction; privacy and security compliance depends on applicable law and system
          implementation. Nothing here constitutes legal or regulatory advice.
        </div>

        {/* Prototype Disclaimer */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--border-slate-subtle)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            fontSize: '0.76rem',
            color: 'var(--text-subtle)',
          }}
        >
          <div>
            <strong>Prototype concept. Not a validated clinical tool.</strong> Built for
            demonstration and clinical UX evaluation only. All patient records, waveforms,
            chart points, timestamps, and activity entries are simulated. No real clinical data
            connection is configured.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Bioluminescent Organic Clinical Design System</span>
            <span>•</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>SIFT-Ward v0.1.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
