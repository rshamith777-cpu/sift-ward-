import React, { useState } from 'react';
import { TimeRange, TrendDataPoint, ScenarioState } from '../types';
import { Activity, Eye, Play, RotateCcw, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrendChartProps {
  activeRange: TimeRange;
  onRangeChange: (range: TimeRange) => void;
  data: TrendDataPoint[];
  scenarioState: ScenarioState;
  onStartScenario: () => void;
  onResetScenario: () => void;
  isSimulating: boolean;
  onToggleSimulate: () => void;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  activeRange,
  onRangeChange,
  data,
  scenarioState,
  onStartScenario,
  onResetScenario,
  isSimulating,
  onToggleSimulate,
}) => {
  const [hoveredPoint, setHoveredPoint] = useState<TrendDataPoint | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [showSpo2, setShowSpo2] = useState<boolean>(true);
  const [showRR, setShowRR] = useState<boolean>(true);

  // Scales & boundaries
  const spo2Min = 90;
  const spo2Max = 100;
  const rrMin = 12;
  const rrMax = 26;

  const width = 800;
  const height = 310;
  const padding = { top: 32, right: 60, bottom: 48, left: 60 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const getX = (idx: number) => padding.left + (idx / Math.max(1, data.length - 1)) * chartW;
  const getYSpo2 = (val: number) =>
    padding.top + chartH - ((val - spo2Min) / (spo2Max - spo2Min)) * chartH;
  const getYRR = (val: number) =>
    padding.top + chartH - ((val - rrMin) / (rrMax - rrMin)) * chartH;

  // Build SVG path strings
  const spo2Path = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getYSpo2(d.spo2).toFixed(1)}`)
    .join(' ');

  const spo2Area = `${spo2Path} L ${getX(data.length - 1)} ${padding.top + chartH} L ${getX(0)} ${
    padding.top + chartH
  } Z`;

  const rrPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getYRR(d.rr).toFixed(1)}`)
    .join(' ');

  const rrArea = `${rrPath} L ${getX(data.length - 1)} ${padding.top + chartH} L ${getX(0)} ${
    padding.top + chartH
  } Z`;

  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * width;
    const clampedX = Math.max(padding.left, Math.min(padding.left + chartW, svgX));
    const ratio = (clampedX - padding.left) / chartW;
    const index = Math.round(ratio * (data.length - 1));
    if (data[index]) {
      setHoveredPoint(data[index]);
      setMousePos({ x: getX(index), y: e.clientY - rect.top });
    }
  };

  const handleSvgMouseLeave = () => {
    setHoveredPoint(null);
    setMousePos(null);
  };

  // Keyboard users can focus the chart to inspect the most recent simulated point
  const handleSvgFocus = () => {
    const index = data.length - 1;
    if (data[index]) {
      setHoveredPoint(data[index]);
      setMousePos({ x: getX(index), y: padding.top + chartH / 2 });
    }
  };

  // Scenario narrative description
  const getScenarioInfo = () => {
    switch (scenarioState) {
      case 'baseline':
        return {
          step: 'Step 1/4',
          title: 'Illustrative Scenario — Baseline Observations',
          detail: 'Scripted synthetic values: 2L nasal cannula, SpO₂ 97–98%, RR 16–17 /min, stable illustrative signal status.',
          color: 'var(--sage-teal)',
        };
      case 'shift':
        return {
          step: 'Step 2/4',
          title: 'Illustrative Scenario — Emerging Sub-Acute Shift',
          detail: 'Scripted synthetic drift: RR rises from 16 to 22 /min across the interval; SpO₂ dips to 94%.',
          color: 'var(--terracotta)',
        };
      case 'advisory':
        return {
          step: 'Step 3/4',
          title: 'Illustrative Scenario — Human Review Requested',
          detail: 'Scripted advisory asks a named bedside nurse to assess under existing hospital protocol. No automated drugs or autonomous changes.',
          color: '#B91C1C',
        };
      case 'completed':
        return {
          step: 'Step 4/4',
          title: 'Illustrative Scenario Completed',
          detail: 'Scripted demo ends with bedside assessment logged for post-hoc study. All content is simulated.',
          color: 'var(--sage-teal-dark)',
        };
      default:
        return null;
    }
  };

  const scenarioInfo = getScenarioInfo();

  return (
    <div
      role="region"
      aria-label="Interactive Synthetic Physiological Trends Chart"
      className="frosted-panel"
      style={{
        padding: '24px',
        marginBottom: '24px',
        position: 'relative',
        border: '1px solid var(--soft-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Top Header: Title, Simulation Controls & Range Switcher */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '14px',
          marginBottom: '16px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-slate)' }}>
              Physiological Trajectory Monitor
            </h3>
            <span
              style={{
                fontSize: '0.7rem',
                backgroundColor: 'rgba(75, 140, 129, 0.12)',
                color: 'var(--sage-teal-dark)',
                border: '1px solid rgba(75, 140, 129, 0.25)',
                padding: '2px 8px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
              }}
            >
              SIMULATED LIVE DEMO — NOT FOR CLINICAL USE
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-subtle)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Rolling updates ~1.8s
            </span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Illustrative synthetic trends — no real clinical data connection is configured. Dual-axis demo stream.
          </p>
        </div>

        {/* Right Action Cluster: Range Switcher, Scenario Buttons & Pause */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Scenario Trigger & Reset */}
          {scenarioState === 'idle' ? (
            <button
              type="button"
              onClick={onStartScenario}
              className="btn-primary"
              style={{ fontSize: '0.78rem', padding: '6px 14px' }}
              aria-label="Replay illustrative scenario"
            >
              <Play size={13} aria-hidden="true" />
              <span>Replay Scenario</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onResetScenario}
              className="btn-ghost"
              style={{ fontSize: '0.78rem', padding: '6px 12px' }}
              aria-label="Reset illustrative scenario"
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span>Reset Scenario</span>
            </button>
          )}

          {/* Pause / Resume stream */}
          <button
            type="button"
            onClick={onToggleSimulate}
            className="btn-ghost"
            style={{ fontSize: '0.78rem', padding: '6px 12px' }}
            aria-label={isSimulating ? 'Pause synthetic telemetry' : 'Resume synthetic telemetry'}
          >
            {isSimulating ? <Pause size={13} /> : <Play size={13} />}
            <span>{isSimulating ? 'Pause' : 'Resume'}</span>
          </button>

          {/* Time-Range Switcher */}
          <div
            role="radiogroup"
            aria-label="Chart time range selection"
            className="segmented"
            style={{ border: '1px solid var(--border-slate-subtle)' }}
          >
            {(['15m', '1h', '6h'] as TimeRange[]).map((range) => {
              const isActive = activeRange === range;
              return (
                <button
                  key={range}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => onRangeChange(range)}
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {range}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scripted Scenario Banner Callout (when scenario is active) */}
      <AnimatePresence>
        {scenarioInfo && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            style={{
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: `1px solid ${scenarioInfo.color}`,
              boxShadow: 'var(--shadow-sm)',
              marginBottom: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-mono)',
                  backgroundColor: scenarioInfo.color,
                  color: '#FFFFFF',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                {scenarioInfo.step}
              </span>
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-slate)', display: 'block' }}>
                  {scenarioInfo.title}
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {scenarioInfo.detail}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
                ILLUSTRATIVE SCENARIO · NOT A VALIDATED MODEL
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend & Signal Layer Toggles */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '8px 14px',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-slate-subtle)',
          marginBottom: '14px',
          fontSize: '0.78rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {/* SpO2 Toggle */}
          <button
            type="button"
            onClick={() => setShowSpo2(!showSpo2)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: showSpo2 ? 1 : 0.45,
            }}
            aria-pressed={showSpo2}
          >
            <span
              style={{
                width: '12px',
                height: '3px',
                backgroundColor: 'var(--sage-teal)',
                borderRadius: '2px',
              }}
            />
            <span style={{ fontWeight: 600, color: 'var(--sage-teal-dark)' }}>
              SpO₂ Saturation (%) [Left]
            </span>
          </button>

          {/* RR Toggle */}
          <button
            type="button"
            onClick={() => setShowRR(!showRR)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: showRR ? 1 : 0.45,
            }}
            aria-pressed={showRR}
          >
            <span
              style={{
                width: '12px',
                height: '3px',
                backgroundColor: 'var(--terracotta)',
                borderRadius: '2px',
              }}
            />
            <span style={{ fontWeight: 600, color: 'var(--terracotta-dark)' }}>
              Respiratory Rate (/min) [Right]
            </span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-subtle)' }}>
          <Eye size={13} aria-hidden="true" />
          <span>Hover or focus on chart to inspect simulated data points</span>
        </div>
      </div>

        {/* SVG Responsive Chart Viewport */}
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            style={{ width: '100%', height: 'auto', display: 'block', cursor: 'crosshair' }}
            onMouseMove={handleSvgMouseMove}
            onMouseLeave={handleSvgMouseLeave}
            onFocus={handleSvgFocus}
            onBlur={handleSvgMouseLeave}
            tabIndex={0}
            role="img"
            aria-label="Rolling synthetic trajectory chart. Interactive demo data: SpO₂ and respiratory rate over the selected window. Use the time-range and layer controls above to change the view."
          >
          <defs>
            <linearGradient id="liveSpo2Fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4B8C81" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#4B8C81" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="liveRRFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D98A6C" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#D98A6C" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding.top + chartH * ratio;
            const spo2Val = Math.round(spo2Max - ratio * (spo2Max - spo2Min));
            const rrVal = Math.round(rrMin + (1 - ratio) * (rrMax - rrMin));

            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={padding.left + chartW}
                  y2={y}
                  stroke="rgba(44, 62, 53, 0.07)"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="var(--sage-teal-dark)"
                  fontFamily="var(--font-mono)"
                >
                  {spo2Val}%
                </text>
                <text
                  x={padding.left + chartW + 10}
                  y={y + 4}
                  textAnchor="start"
                  fontSize="11"
                  fill="var(--terracotta-dark)"
                  fontFamily="var(--font-mono)"
                >
                  {rrVal}
                </text>
              </g>
            );
          })}

          {/* Area Fills */}
          {showSpo2 && <path d={spo2Area} fill="url(#liveSpo2Fill)" />}
          {showRR && <path d={rrArea} fill="url(#liveRRFill)" />}

          {/* Signal Lines with animated transitions */}
          {showSpo2 && (
            <path
              d={spo2Path}
              fill="none"
              stroke="#4B8C81"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'd 0.3s ease-in-out' }}
            />
          )}

          {showRR && (
            <path
              d={rrPath}
              fill="none"
              stroke="#D98A6C"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'd 0.3s ease-in-out' }}
            />
          )}

          {/* Data Points */}
          {data.map((d, i) => {
            const x = getX(i);
            const ySpo2 = getYSpo2(d.spo2);
            const yRR = getYRR(d.rr);

            return (
              <g key={i}>
                {showSpo2 && <circle cx={x} cy={ySpo2} r="2.8" fill="#4B8C81" stroke="#FFFFFF" strokeWidth="1.2" />}
                {showRR && <circle cx={x} cy={yRR} r="2.8" fill="#D98A6C" stroke="#FFFFFF" strokeWidth="1.2" />}

                {/* Event annotation banner */}
                {d.annotation && (
                  <g>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={padding.top + chartH}
                      stroke="rgba(217, 138, 108, 0.45)"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <rect
                      x={x - 60}
                      y={padding.top + 6}
                      width="120"
                      height="20"
                      rx="4"
                      fill="#FFFFFF"
                      stroke="var(--terracotta-border)"
                      strokeWidth="1"
                    />
                    <text
                      x={x}
                      y={padding.top + 20}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="var(--terracotta-dark)"
                      fontWeight="600"
                    >
                      {d.annotation}
                    </text>
                  </g>
                )}

                {/* X-axis time labels */}
                {(i === 0 || i === Math.floor(data.length / 2) || i === data.length - 1) && (
                  <text
                    x={x}
                    y={padding.top + chartH + 22}
                    textAnchor="middle"
                    fontSize="11"
                    fill="var(--text-subtle)"
                    fontFamily="var(--font-mono)"
                  >
                    {d.timeLabel}
                  </text>
                )}
              </g>
            );
          })}

          {/* Crosshair cursor */}
          {hoveredPoint && mousePos && (
            <g>
              <line
                x1={mousePos.x}
                y1={padding.top}
                x2={mousePos.x}
                y2={padding.top + chartH}
                stroke="var(--text-slate)"
                strokeWidth="1.5"
                strokeDasharray="2 2"
                opacity="0.6"
              />
              {showSpo2 && (
                <circle
                  cx={mousePos.x}
                  cy={getYSpo2(hoveredPoint.spo2)}
                  r="6"
                  fill="#4B8C81"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              )}
              {showRR && (
                <circle
                  cx={mousePos.x}
                  cy={getYRR(hoveredPoint.rr)}
                  r="6"
                  fill="#D98A6C"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              )}
            </g>
          )}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredPoint && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-slate-subtle)',
              pointerEvents: 'none',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              gap: '18px',
            }}
          >
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
                Time: {hoveredPoint.timestamp} (simulated)
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '2px' }}>
                <span style={{ color: 'var(--sage-teal-dark)', fontWeight: 700, fontSize: '0.92rem' }}>
                  SpO₂: {hoveredPoint.spo2}%
                </span>
                <span style={{ color: 'var(--terracotta-dark)', fontWeight: 700, fontSize: '0.92rem' }}>
                  RR: {hoveredPoint.rr} /min
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                  Signal status: {hoveredPoint.signalQuality}% (synthetic, illustrative)
                </span>
              </div>
            </div>

            <div
              style={{
                borderLeft: '1px solid var(--border-slate-subtle)',
                paddingLeft: '12px',
                fontSize: '0.72rem',
                color: 'var(--text-subtle)',
              }}
            >
              <div>Synthetic stream</div>
              <div style={{ color: '#C2410C', fontWeight: 600 }}>Not a clinical score</div>
            </div>
          </div>
        )}
      </div>

      {/* Synthetic Waveform Flow Strip */}
      <div
        style={{
          marginTop: '16px',
          padding: '12px 16px',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'rgba(246, 243, 238, 0.75)',
          border: '1px solid var(--border-slate-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={14} style={{ color: 'var(--sage-teal)' }} aria-hidden="true" />
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-slate)' }}>
              Synthetic Waveform Flow — Photoplethysmogram (PPG)
            </span>
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              color: 'var(--terracotta-dark)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              backgroundColor: 'rgba(217, 138, 108, 0.12)',
              padding: '2px 8px',
              borderRadius: '9999px',
            }}
          >
            Synthetic waveform — not diagnostic ECG
          </span>
        </div>

        {/* Oscillating synthetic PPG pulse curve */}
        <div style={{ height: '36px', width: '100%', overflow: 'hidden' }}>
          <svg viewBox="0 0 600 36" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
            <path
              d="M 0 24 
                 C 20 24, 25 24, 30 18 C 35 10, 38 6, 42 6 C 46 6, 50 14, 55 18 C 60 21, 65 20, 70 21 C 75 22, 85 24, 100 24
                 C 120 24, 125 24, 130 18 C 135 10, 138 6, 142 6 C 146 6, 150 14, 155 18 C 160 21, 165 20, 170 21 C 175 22, 185 24, 200 24
                 C 220 24, 225 24, 230 18 C 235 10, 238 6, 242 6 C 246 6, 250 14, 255 18 C 260 21, 265 20, 270 21 C 275 22, 285 24, 300 24
                 C 320 24, 325 24, 330 18 C 335 10, 338 6, 342 6 C 346 6, 350 14, 355 18 C 360 21, 365 20, 370 21 C 375 22, 385 24, 400 24
                 C 420 24, 425 24, 430 18 C 435 10, 438 6, 442 6 C 446 6, 450 14, 455 18 C 460 21, 465 20, 470 21 C 475 22, 485 24, 500 24
                 C 520 24, 525 24, 530 18 C 535 10, 538 6, 542 6 C 546 6, 550 14, 555 18 C 560 21, 565 20, 570 21 C 575 22, 585 24, 600 24"
              fill="none"
              stroke="var(--sage-teal)"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
