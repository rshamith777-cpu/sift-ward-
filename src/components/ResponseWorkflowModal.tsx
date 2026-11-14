import React, { useEffect, useRef } from 'react';
import { X, ShieldAlert } from 'lucide-react';

interface ResponseWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResponseWorkflowModal: React.FC<ResponseWorkflowModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Close on Escape, trap focus, and restore focus on close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    let previouslyFocused: HTMLElement | null = null;

    if (isOpen) {
      previouslyFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        backgroundColor: 'rgba(30, 36, 43, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-slate-subtle)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'modalFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <style>{`
          @keyframes modalFadeIn {
            from {
              opacity: 0;
              transform: scale(0.96) translateY(8px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>

        {/* Modal Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--border-slate-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--bg-alabaster)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--terracotta-dark)',
                  backgroundColor: 'rgba(217, 138, 108, 0.16)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                CLINICAL RESPONSE PROTOCOL
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                Synthetic Governance Guide
              </span>
            </div>
            <h3 id="modal-title" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-slate)', marginTop: '4px' }}>
              Standard Operating Procedure for Signal Review
            </h3>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-slate)',
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '24px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Warning Banner */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: '#FFF7ED',
              border: '1px solid #FED7AA',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <ShieldAlert size={20} style={{ color: '#C2410C', flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.82rem', color: '#9A3412', lineHeight: 1.5 }}>
              <strong>Clinical Primacy:</strong> The SIFT-Ward system does not diagnose, prescribe, autonomously escalate, change treatment, or replace clinical judgment. Hospital emergency response procedures and nurse bedside assessment always take precedence.
            </div>
          </div>

          {/* Key Procedural Steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-slate)' }}>
              Standard Ward Action Protocol:
            </h4>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--sage-tint)',
                  color: 'var(--sage-teal-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-slate)', lineHeight: 1.5 }}>
                <strong>Signal Verification &amp; Data Quality Check:</strong> Verify sensor probe placement, illustrative data-quality metadata, and patient movement. Ensure readings reflect true physiology rather than loose contact.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--sage-tint)',
                  color: 'var(--sage-teal-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-slate)', lineHeight: 1.5 }}>
                <strong>Bedside Clinical Inspection:</strong> Assess patient respiratory effort, accessory muscle use, speech pattern, skin color, and subjective dyspnea.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--sage-tint)',
                  color: 'var(--sage-teal-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-slate)', lineHeight: 1.5 }}>
                <strong>Named Clinical Responsibility:</strong> The assigned bedside nurse acknowledges the alert on the ward terminal within 15 minutes. If unacknowledged, an automatic backup paging notification is dispatched to the ward charge nurse.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--sage-tint)',
                  color: 'var(--sage-teal-dark)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                4
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-slate)', lineHeight: 1.5 }}>
                <strong>Protocol Escalation under Local Guidelines:</strong> If clinical assessment confirms respiratory compromise, initiate standard local protocols (e.g. medical review, oxygen titration per prescription, arterial blood gas check, or rapid-response activation).
              </div>
            </div>
          </div>

          {/* Uncertainty Policy */}
          <div
            style={{
              padding: '14px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(246, 243, 238, 0.8)',
              border: '1px solid var(--border-slate-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              lineHeight: 1.45,
            }}
          >
            <strong style={{ color: 'var(--text-slate)' }}>Uncertainty &amp; Dropout Policy:</strong> When continuous data is missing, intermittent, or visibly noisy, the proposed interface must explicitly state &quot;Uncertain — verify data.&quot; Under no circumstances does poor data quality default to low risk, reassurance, or a green &quot;safe&quot; state.
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid var(--border-slate-subtle)',
            backgroundColor: 'var(--bg-alabaster)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            className="btn-primary"
            style={{ fontSize: '0.85rem', padding: '10px 20px' }}
          >
            I Understand &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
