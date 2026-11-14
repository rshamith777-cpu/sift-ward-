import React from 'react';
import { User, Activity, Search, BrainCircuit, Bell, HeartHandshake, ShieldAlert } from 'lucide-react';

interface ResponseWorkflowProps {
  onOpenWorkflowModal: () => void;
}

export const ResponseWorkflow: React.FC<ResponseWorkflowProps> = ({ onOpenWorkflowModal }) => {
  const steps = [
    {
      num: '01',
      title: 'Patient & Ward Context',
      icon: <User size={20} />,
      desc: 'Adult medical-surgical ward patient with new or increasing oxygen requirements under routine care.',
      detail: 'Continuous observations complement routine rounds.',
    },
    {
      num: '02',
      title: 'Data & Sensing Ingestion',
      icon: <Activity size={20} />,
      desc: 'Signals and timestamps are brought together; illustrative data-quality metadata and contact stability are checked (concept architecture).',
      detail: 'Poor or missing data is treated as uncertain — verify data.',
    },
    {
      num: '03',
      title: 'Trajectory Detection',
      icon: <Search size={20} />,
      desc: 'Evaluates multi-hour respiratory rate drift, oxygen titration step-ups, and desaturation patterns.',
      detail: 'Assessed against the proposed escalation target — not a validated model result.',
    },
    {
      num: '04',
      title: 'Decision & Provenance',
      icon: <BrainCircuit size={20} />,
      desc: 'The system displays exactly what changed, timestamp freshness, and which sensor contributed the signal.',
      detail: 'Transparent reasoning with zero black-box score.',
    },
    {
      num: '05',
      title: 'Advisory Notification',
      icon: <Bell size={20} />,
      desc: 'A named clinical nurse or team member is requested to assess the patient under local ward procedures.',
      detail: 'Unacknowledged alerts follow an agreed backup route.',
    },
    {
      num: '06',
      title: 'Clinical Bedside Assessment',
      icon: <HeartHandshake size={20} />,
      desc: 'Bedside clinician inspects patient appearance, work of breathing, and applies clinical judgment.',
      detail: 'Hospital emergency protocols always take precedence.',
    },
  ];

  return (
    <section
      id="workflow"
      style={{
        paddingTop: '48px',
        paddingBottom: '48px',
        position: 'relative',
      }}
      aria-labelledby="workflow-heading"
    >
      <div className="layout-container">
        {/* Section Header */}
        <div style={{ maxWidth: '780px', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 700,
                color: 'var(--terracotta-dark)',
                backgroundColor: 'rgba(217, 138, 108, 0.15)',
                padding: '3px 10px',
                borderRadius: '9999px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              HUMAN-IN-THE-LOOP SAFETY
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
              Closed-loop clinical pathway
            </span>
          </div>

          <h2
            id="workflow-heading"
            style={{
              fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
              fontWeight: 800,
              color: 'var(--text-slate)',
              letterSpacing: '-0.025em',
              marginBottom: '12px',
            }}
          >
            Clear Response Pathway from Sensor to Bedside
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Early warning tools fail when alerts lack a clear human owner. SIFT-Ward embeds a verified,
            step-by-step accountability loop where sensors trigger human assessment under existing ward protocols—never
            autonomous clinical orders.
          </p>
        </div>

        {/* 6-Step Visual Flow Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          {steps.map((s, idx) => (
            <div
              key={s.num}
              className="frosted-panel frosted-panel-hoverable"
              style={{
                padding: '22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                background: idx === 4
                  ? 'linear-gradient(135deg, rgba(217, 138, 108, 0.12) 0%, rgba(255, 255, 255, 0.9) 100%)'
                  : 'rgba(255, 255, 255, 0.72)',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      backgroundColor: idx === 4 ? 'rgba(217, 138, 108, 0.22)' : 'rgba(75, 140, 129, 0.14)',
                      color: idx === 4 ? 'var(--terracotta-dark)' : 'var(--sage-teal-dark)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {s.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-subtle)',
                    }}
                  >
                    {s.num}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-slate)', marginBottom: '8px' }}>
                  {s.title}
                </h3>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
                  {s.desc}
                </p>
              </div>

              <div
                style={{
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-slate-subtle)',
                  fontSize: '0.74rem',
                  color: 'var(--sage-teal-dark)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span>{s.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Golden Rule Alert Box: "Missing or poor-quality data means uncertain—not low risk" */}
        <div
          style={{
            padding: '20px 24px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: '#FFF7ED',
            border: '1px solid #FED7AA',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#FFEDD5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#C2410C',
              flexShrink: 0,
            }}
          >
            <ShieldAlert size={22} aria-hidden="true" />
          </div>

          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#9A3412', marginBottom: '4px' }}>
              Core Safety Principle: Missing or poor-quality data means uncertain—not low risk.
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#7C2D12', lineHeight: 1.55, margin: 0 }}>
              Disconnected sensors, low perfusion, or documentation gaps must never display reassurance or a green &quot;safe&quot; score.
              If sensor quality drops below threshold, the interface surfaces an explicit &quot;Data Quality Check Required&quot; request.
              Clinical judgment and existing hospital emergency rapid-response procedures unconditionally lead all ward actions.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenWorkflowModal}
            className="btn-primary"
            style={{
              fontSize: '0.82rem',
              padding: '8px 16px',
              whiteSpace: 'nowrap',
              alignSelf: 'center',
            }}
          >
            Protocol Details
          </button>
        </div>
      </div>
    </section>
  );
};
