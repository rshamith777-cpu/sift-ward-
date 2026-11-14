import React, { useState } from 'react';
import { MOCK_ACTIVITIES } from '../mockData';
import { ActivityRecord } from '../types';
import { Download, ChevronDown, ChevronUp } from 'lucide-react';

interface ActivityTableProps {
  activities?: ActivityRecord[];
  onExportCsv: () => void;
}

export const ActivityTable: React.FC<ActivityTableProps> = ({ activities, onExportCsv }) => {
  const [filter, setFilter] = useState<'all' | 'review' | 'quality'>('all');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const recordsList = activities || MOCK_ACTIVITIES;

  // Filter records
  const filtered = recordsList.filter((record) => {
    if (filter === 'all') return true;
    return record.syntheticCategory === filter;
  });

  const displayedRecords = isExpanded ? filtered : filtered.slice(0, 5);

  const getStateBadge = (state: string) => {
    switch (state) {
      case 'Review':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(217, 138, 108, 0.16)',
              color: 'var(--terracotta-dark)',
              border: '1px solid var(--terracotta-border)',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
            }}
          >
            Review Flag
          </span>
        );
      case 'Data Quality':
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FDE68A',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              fontFamily: 'var(--font-mono)',
            }}
          >
            Uncertain — Verify
          </span>
        );
      default:
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(220, 230, 225, 0.5)',
              color: 'var(--sage-teal-dark)',
              border: '1px solid rgba(75, 140, 129, 0.25)',
              padding: '2px 8px',
              borderRadius: '9999px',
              fontSize: '0.72rem',
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}
          >
            Nominal Sync
          </span>
        );
    }
  };

  return (
    <div
      role="region"
      aria-label="Synthetic Activity Event Log"
      className="frosted-panel"
      style={{
        padding: '24px',
        marginBottom: '40px',
        border: '1px solid var(--soft-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Header, Filters & CSV Export button */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '20px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-slate)' }}>
              Synthetic Activity &amp; Signal Event Log
            </h3>
            <span
              style={{
                fontSize: '0.72rem',
                backgroundColor: 'rgba(217, 138, 108, 0.14)',
                color: 'var(--terracotta-dark)',
                border: '1px solid var(--terracotta-border)',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
              }}
            >
              Demo Records
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Illustrative review items and device quality checks for testing ward workflow.
          </p>
        </div>

        {/* Controls: Filter buttons & CSV Export */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Filter Pills */}
          <div
            role="group"
            aria-label="Activity filter options"
            style={{
              display: 'inline-flex',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              padding: '3px',
              borderRadius: 'var(--radius-pill)',
            }}
          >
            <button
              type="button"
              onClick={() => setFilter('all')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: filter === 'all' ? 700 : 500,
                cursor: 'pointer',
                backgroundColor: filter === 'all' ? '#FFFFFF' : 'transparent',
                color: filter === 'all' ? 'var(--text-slate)' : 'var(--text-muted)',
                boxShadow: filter === 'all' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              All ({recordsList.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('review')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: filter === 'review' ? 700 : 500,
                cursor: 'pointer',
                backgroundColor: filter === 'review' ? '#FFFFFF' : 'transparent',
                color: filter === 'review' ? 'var(--terracotta-dark)' : 'var(--text-muted)',
                boxShadow: filter === 'review' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Review Flags
            </button>
            <button
              type="button"
              onClick={() => setFilter('quality')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: filter === 'quality' ? 700 : 500,
                cursor: 'pointer',
                backgroundColor: filter === 'quality' ? '#FFFFFF' : 'transparent',
                color: filter === 'quality' ? '#92400E' : 'var(--text-muted)',
                boxShadow: filter === 'quality' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              Data Quality
            </button>
          </div>

          {/* Export CSV Button */}
          <button
            type="button"
            onClick={onExportCsv}
            className="btn-ghost"
            style={{
              fontSize: '0.8rem',
              padding: '6px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            aria-label="Download synthetic demo event data as CSV"
          >
            <Download size={14} aria-hidden="true" />
            <span>Export Demo CSV</span>
          </button>
        </div>
      </div>

      {/* Horizontally scrollable table container */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-slate-subtle)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.84rem',
            minWidth: '700px',
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: 'rgba(246, 243, 238, 0.75)',
                borderBottom: '1px solid var(--border-slate-medium)',
              }}
            >
              <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-slate)', width: '100px' }}>
                Time (Sim)
              </th>
              <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-slate)', width: '220px' }}>
                Signal / Event
              </th>
              <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-slate)', width: '180px' }}>
                Synthetic Value
              </th>
              <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-slate)', width: '160px' }}>
                Data Source
              </th>
              <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-slate)', width: '140px' }}>
                Signal State
              </th>
              <th style={{ padding: '10px 14px', fontWeight: 700, color: 'var(--text-slate)' }}>
                Verification Note
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedRecords.map((rec, idx) => (
              <tr
                key={rec.id}
                style={{
                  borderBottom: '1px solid var(--border-slate-subtle)',
                  backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(246, 243, 238, 0.3)',
                }}
              >
                <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
                  {rec.timestamp}
                </td>
                <td style={{ padding: '12px 14px', fontWeight: 600, color: 'var(--text-slate)' }}>
                  {rec.signal}
                </td>
                <td style={{ padding: '12px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-slate)' }}>
                  {rec.value}
                </td>
                <td style={{ padding: '12px 14px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {rec.source}
                </td>
                <td style={{ padding: '12px 14px' }}>
                  {getStateBadge(rec.state)}
                </td>
                <td style={{ padding: '12px 14px', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {rec.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Expand / Collapse toggle footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '16px',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
          Showing {displayedRecords.length} of {filtered.length} synthetic records
        </span>

        {filtered.length > 5 && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--sage-teal-dark)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span>{isExpanded ? 'Collapse activity' : 'View all activity'}</span>
            {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
        )}
      </div>
    </div>
  );
};
