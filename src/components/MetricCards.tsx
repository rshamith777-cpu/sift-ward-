import React from 'react';
import { Heart, Activity, Wind, CheckCircle, Info } from 'lucide-react';
import { VitalMetric } from '../types';

interface MetricCardsProps {
  metrics: VitalMetric[];
}

export const MetricCards: React.FC<MetricCardsProps> = ({ metrics }) => {
  const getIcon = (id: string, color: string) => {
    switch (id) {
      case 'hr':
        return <Heart size={18} strokeWidth={2.2} style={{ color }} aria-hidden="true" />;
      case 'spo2':
        return <Activity size={18} strokeWidth={2.2} style={{ color }} aria-hidden="true" />;
      case 'rr':
        return <Wind size={18} strokeWidth={2.2} style={{ color }} aria-hidden="true" />;
      case 'sqi':
        return <CheckCircle size={18} strokeWidth={2.2} style={{ color }} aria-hidden="true" />;
      default:
        return <Activity size={18} strokeWidth={2.2} style={{ color }} aria-hidden="true" />;
    }
  };

  // Generate lightweight SVG sparkline
  const renderSparkline = (data: number[], color: string) => {
    if (!data || data.length === 0) return null;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 84;
    const height = 28;
    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * (height - 6) - 3;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'visible', flexShrink: 0 }}
        aria-hidden="true"
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
          opacity="0.85"
        />
        {/* Current point dot */}
        {data.length > 0 && (
          <circle
            cx={width}
            cy={height - ((data[data.length - 1] - min) / range) * (height - 6) - 3}
            r="3"
            fill={color}
          />
        )}
      </svg>
    );
  };

  return (
    <div
      role="region"
      aria-label="Synthetic vital metrics — simulated live demo values"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}
    >
      {metrics.map((metric) => {
        // Theme-specific styles
        let cardClass = 'frosted-panel frosted-panel-hoverable';
        let iconBg = 'rgba(75, 140, 129, 0.12)';
        let iconColor = 'var(--sage-teal-dark)';
        let sparklineColor = 'var(--sage-teal)';

        if (metric.colorTheme === 'terracotta') {
          cardClass = 'frosted-panel card-coral-highlight';
          iconBg = 'rgba(217, 138, 108, 0.22)';
          iconColor = '#8D3618';
          sparklineColor = '#B96B4F';
        } else if (metric.colorTheme === 'sage') {
          cardClass = 'frosted-panel card-sage-highlight';
          iconBg = 'rgba(75, 140, 129, 0.18)';
          iconColor = 'var(--sage-teal-dark)';
          sparklineColor = 'var(--sage-teal)';
        }

        return (
          <div
            key={metric.id}
            className={cardClass}
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
            }}
          >
            {/* Top row: Icon, Label, and Sparkline */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getIcon(metric.id, iconColor)}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: 'var(--text-slate)',
                      display: 'block',
                      lineHeight: 1.2,
                    }}
                  >
                    {metric.label}
                  </span>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      color: 'var(--text-subtle)',
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    Base: {metric.baseline}
                  </span>
                </div>
              </div>

              {renderSparkline(metric.sparkline, sparklineColor)}
            </div>

            {/* Middle row: Large Value & Unit */}
            <div style={{ margin: '18px 0 6px 0', display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
              <span
                className="metric-value"
                style={{
                  fontSize: 'clamp(2.1rem, 3.2vw, 2.5rem)',
                  fontWeight: 800,
                  color: metric.colorTheme === 'terracotta' ? '#843015' : 'var(--text-slate)',
                  lineHeight: 1,
                }}
              >
                {metric.value}
              </span>
              <span
                style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                }}
              >
                {metric.unit}
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  color: metric.colorTheme === 'terracotta' ? '#92381B' : 'var(--sage-teal-dark)',
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                {metric.change}
              </span>
            </div>

            {/* Synthetic qualifier footnote */}
            {metric.footnote && (
              <p
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-subtle)',
                  margin: '0 0 8px 0',
                }}
              >
                {metric.footnote}
              </p>
            )}

            {/* Bottom row: Synthetic source metadata */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px solid rgba(30, 36, 43, 0.07)',
                fontSize: '0.69rem',
                color: 'var(--text-subtle)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Info size={11} aria-hidden="true" />
                <span>Synthetic demo · not clinical</span>
              </span>
              <span style={{ fontFamily: 'var(--font-mono)' }}>{metric.syntheticSource}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
