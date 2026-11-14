import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const SyntheticDataBanner: React.FC = () => {
  return (
    <aside
      role="note"
      aria-label="Simulated demonstration notice"
      style={{
        width: '100%',
        backgroundColor: '#FFF7ED',
        borderBottom: '1px solid #FED7AA',
        borderTop: '1px solid #FED7AA',
        padding: '10px 16px',
        position: 'relative',
        zIndex: 40,
      }}
    >
      <div
        className="layout-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9A3412', fontWeight: 700, fontSize: '0.825rem', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          <ShieldAlert size={16} aria-hidden="true" />
          <span>SIMULATED LIVE DEMO — NOT FOR CLINICAL USE</span>
        </div>
        <span style={{ color: '#C2410C', fontSize: '0.85rem', fontWeight: 500 }}>
          All data shown is illustrative synthetic demo data. No real clinical data connection is configured.
        </span>
      </div>
    </aside>
  );
};
