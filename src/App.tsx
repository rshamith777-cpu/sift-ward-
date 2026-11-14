import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

import { SyntheticDataBanner } from './components/SyntheticDataBanner';
import { TopNavigation } from './components/TopNavigation';
import { HeroSection } from './components/HeroSection';
import { ScrollStoryScene } from './components/ScrollStoryScene';
import { ObservationGapStory } from './components/ObservationGapStory';
import { VascularFrame } from './components/VascularFrame';
import { PatientContext } from './components/PatientContext';
import { MetricCards } from './components/MetricCards';
import { TrendChart } from './components/TrendChart';
import { SensorValueGate } from './components/SensorValueGate';
import { ActivityTable } from './components/ActivityTable';
import { ResponseWorkflow } from './components/ResponseWorkflow';
import { EvaluationRoadmap } from './components/EvaluationRoadmap';
import { ResponseWorkflowModal } from './components/ResponseWorkflowModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

import { INITIAL_METRICS, NOTIFICATIONS_DATA, MOCK_ACTIVITIES, TREND_15M, TREND_1H, TREND_6H } from './mockData';
import { TimeRange, VitalMetric, NotificationItem, TrendDataPoint, ActivityRecord, ScenarioState } from './types';

export const App: React.FC = () => {
  const [metrics, setMetrics] = useState<VitalMetric[]>(INITIAL_METRICS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS_DATA);
  const [activities, setActivities] = useState<ActivityRecord[]>(MOCK_ACTIVITIES);
  const [timeRange, setTimeRange] = useState<TimeRange>('1h');
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [lastTick, setLastTick] = useState<string>('Just now');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scenario state engine
  const [scenarioState, setScenarioState] = useState<ScenarioState>('idle');
  const scenarioTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Live dynamic trend points for the current range
  const [currentTrendSeries, setCurrentTrendSeries] = useState<TrendDataPoint[]>(TREND_1H);

  // Scroll progress for reading story experience
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Switch base trend dataset when time range changes
  useEffect(() => {
    switch (timeRange) {
      case '15m':
        setCurrentTrendSeries(TREND_15M);
        break;
      case '1h':
        setCurrentTrendSeries(TREND_1H);
        break;
      case '6h':
        setCurrentTrendSeries(TREND_6H);
        break;
      default:
        setCurrentTrendSeries(TREND_1H);
    }
  }, [timeRange]);

  // Rolling real-time synthetic stream (every ~1.6 seconds)
  useEffect(() => {
    if (!isSimulating || scenarioState !== 'idle') return;

    const interval = setInterval(() => {
      // 1. Modest jitter on metrics
      setMetrics((prev) =>
        prev.map((m) => {
          if (m.id === 'hr') {
            const currentNum = typeof m.value === 'number' ? m.value : 82;
            const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.random() > 0.6 ? 1 : 0);
            const newVal = Math.min(84, Math.max(80, currentNum + delta));
            return {
              ...m,
              value: newVal,
              sparkline: [...m.sparkline.slice(1), newVal],
              change: `${newVal >= 78 ? '+' : ''}${newVal - 78} from baseline`,
            };
          }
          if (m.id === 'spo2') {
            const possible = [96, 97, 97, 98];
            const newVal = possible[Math.floor(Math.random() * possible.length)];
            return {
              ...m,
              value: newVal,
              sparkline: [...m.sparkline.slice(1), newVal],
            };
          }
          if (m.id === 'rr') {
            const possible = [17, 18, 18, 19];
            const newVal = possible[Math.floor(Math.random() * possible.length)];
            return {
              ...m,
              value: newVal,
              sparkline: [...m.sparkline.slice(1), newVal],
              change: `+${newVal - 16} from baseline`,
            };
          }
          if (m.id === 'sqi') {
            const possible = [97, 98, 98, 99];
            const newVal = possible[Math.floor(Math.random() * possible.length)];
            return {
              ...m,
              value: newVal,
              sparkline: [...m.sparkline.slice(1), newVal],
              change: 'Updated just now',
            };
          }
          return m;
        })
      );

      // 2. Rolling update on trend series (append simulated point, slide window)
      setCurrentTrendSeries((prevSeries) => {
        if (!prevSeries || prevSeries.length === 0) return prevSeries;
        const last = prevSeries[prevSeries.length - 1];
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        const newPoint: TrendDataPoint = {
          timestamp: timeStr,
          timeLabel: timeStr.slice(0, 5),
          spo2: Math.min(99, Math.max(95, last.spo2 + (Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
          rr: Math.min(20, Math.max(16, last.rr + (Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0))),
          heartRate: Math.min(84, Math.max(78, last.heartRate + (Math.random() > 0.5 ? 1 : -1))),
          signalQuality: 98,
        };

        return [...prevSeries.slice(1), newPoint];
      });

      const now = new Date();
      setLastTick(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`);
    }, 1800);

    return () => clearInterval(interval);
  }, [isSimulating, scenarioState]);

  // Scenario Replay Execution Engine
  const startScenario = () => {
    if (scenarioTimerRef.current) clearTimeout(scenarioTimerRef.current);
    setScenarioState('baseline');
    setToastMessage('Illustrative Scenario: Step 1 — Establishing baseline ward observations');

    // Step 1: Baseline (0s)
    setMetrics((prev) =>
      prev.map((m) => {
        if (m.id === 'hr') return { ...m, value: 80, baseline: '78 bpm', status: 'optimal' };
        if (m.id === 'spo2') return { ...m, value: 98, baseline: '98% on 2L', status: 'optimal' };
        if (m.id === 'rr') return { ...m, value: 16, baseline: '16 /min', status: 'optimal' };
        if (m.id === 'sqi') return { ...m, value: 99, status: 'optimal' };
        return m;
      })
    );

    // Step 2: Emerging sub-acute shift after 3.5s
    scenarioTimerRef.current = setTimeout(() => {
      setScenarioState('shift');
      setToastMessage('Illustrative Scenario: Step 2 — Emerging sub-acute respiratory drift');

      setMetrics((prev) =>
        prev.map((m) => {
          if (m.id === 'hr') return { ...m, value: 86, change: '+8 from baseline', status: 'moderate' };
          if (m.id === 'spo2') return { ...m, value: 94, change: '-4% drop', status: 'moderate' };
          if (m.id === 'rr') return { ...m, value: 22, change: '+6 /min drift', status: 'moderate' };
          if (m.id === 'sqi') return { ...m, value: 97, status: 'optimal' };
          return m;
        })
      );

      // Append point with annotation in trend series
      setCurrentTrendSeries((prev) => [
        ...prev.slice(1),
        {
          timestamp: '14:26:00',
          timeLabel: '14:26',
          spo2: 94,
          rr: 22,
          heartRate: 86,
          signalQuality: 97,
          annotation: 'Sub-acute drift (Simulated)',
        },
      ]);

      // Step 3: Advisory trigger after another 4s
      scenarioTimerRef.current = setTimeout(() => {
        setScenarioState('advisory');
        setToastMessage('Illustrative Scenario: Step 3 — Advisory review request triggered');

        const newAlertRecord: ActivityRecord = {
          id: `act-scenario-${Date.now()}`,
          timestamp: new Date().toLocaleTimeString(),
          signal: 'Illustrative Scenario — Advisory Review Request',
          value: 'SpO₂ 93% / RR 24 /min (synthetic values)',
          source: 'Continuous Oximeter',
          state: 'Review',
          details: 'Scripted demo alert, not a model prediction: requests a named nurse bedside assessment under local procedures. No treatment, medication, or oxygen change is automated.',
          syntheticCategory: 'review',
        };
        setActivities((prev) => [newAlertRecord, ...prev]);

        // Step 4: Completed after 4s
        scenarioTimerRef.current = setTimeout(() => {
          setScenarioState('completed');
          setToastMessage('Scenario completed — Clinical assessment logged for post-hoc study');
        }, 4000);
      }, 4000);
    }, 3500);
  };

  const resetScenario = () => {
    if (scenarioTimerRef.current) clearTimeout(scenarioTimerRef.current);
    setScenarioState('idle');
    setMetrics(INITIAL_METRICS);
    setCurrentTrendSeries(TREND_1H);
    setToastMessage('Scenario reset to initial synthetic baseline');
  };

  const handleToggleSimulate = () => {
    setIsSimulating((prev) => {
      const next = !prev;
      setToastMessage(next ? 'Live synthetic telemetry resumed' : 'Synthetic telemetry paused');
      return next;
    });
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setToastMessage('Notification marked as read');
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setToastMessage('All notifications marked as read');
  };

  const handleExportCsv = () => {
    const headers = [
      'Timestamp_Simulated',
      'Signal_Name',
      'Synthetic_Value',
      'Data_Source',
      'Signal_State',
      'Verification_Notes',
      'Compliance_Notice',
    ];

    const rows = activities.map((rec) => [
      `"${rec.timestamp}"`,
      `"${rec.signal}"`,
      `"${rec.value}"`,
      `"${rec.source}"`,
      `"${rec.state}"`,
      `"${rec.details}"`,
      '"SYNTHETIC DEMO — NOT FOR CLINICAL USE"',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'sift_ward_synthetic_demo_events.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setToastMessage(`Exported ${activities.length} synthetic demo event rows as CSV`);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Scroll Story Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--sage-teal) 0%, var(--terracotta) 100%)',
          transformOrigin: '0%',
          scaleX,
          zIndex: 120,
        }}
        aria-hidden="true"
      />

      {/* Ambient background glow accents */}
      <div className="ambient-glow-wrapper" aria-hidden="true">
        <div className="ambient-glow-sage" />
        <div className="ambient-glow-peach" />
      </div>

      {/* 1. Global Safety Notice */}
      <SyntheticDataBanner />

      {/* 2. Floating Pill Navigation */}
      <TopNavigation
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        isSimulating={isSimulating}
        onToggleSimulate={handleToggleSimulate}
        onOpenWorkflowModal={() => setIsModalOpen(true)}
      />

      <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
        {/* 3. Hero Section with Cinematic Translucent Heart, Veins & Blood-Flow Particles */}
        <HeroSection
          onOpenWorkflowModal={() => setIsModalOpen(true)}
          isSimulating={isSimulating}
        />

        {/* 4. Compact Scroll-Driven Visualization: the Information Gap & Sensor Gate Question */}
        <ScrollStoryScene />

        {/* 5. Interactive Illustrative Observation-Gap Timeline */}
        <ObservationGapStory />

        {/* 6. Live Signals Section Wrapped in Custom VascularFrame */}
        <section
          id="live-signals"
          style={{
            paddingTop: '32px',
            paddingBottom: '48px',
          }}
          aria-labelledby="signals-heading"
        >
          <div className="layout-container">
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <span className="section-eyebrow section-eyebrow--coral">
                  SIMULATED LIVE DEMO — NOT FOR CLINICAL USE
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
                  Synthetic telemetry · no real clinical data connection is configured
                </span>
              </div>
              <h2
                id="signals-heading"
                style={{
                  fontSize: 'clamp(1.6rem, 2.8vw, 2.3rem)',
                  fontWeight: 800,
                  color: 'var(--text-slate)',
                  letterSpacing: '-0.02em',
                }}
              >
                Ward Bedside Physiological Stream
              </h2>
            </div>

            {/* Custom Branching Vein-like Border Component */}
            <VascularFrame isActive={isSimulating}>
              <div style={{ padding: '4px' }}>
                {/* Patient Context Strip */}
                <PatientContext
                  isSimulating={isSimulating}
                  onToggleSimulate={handleToggleSimulate}
                  lastTickTimestamp={lastTick}
                />

                {/* 4 Responsive Biometric Metric Cards */}
                <MetricCards metrics={metrics} />

                {/* Rolling Real-Time Trend Chart with Scenario Controls */}
                <TrendChart
                  activeRange={timeRange}
                  onRangeChange={(r) => {
                    setTimeRange(r);
                    setToastMessage(`Switched trend chart window to ${r}`);
                  }}
                  data={currentTrendSeries}
                  scenarioState={scenarioState}
                  onStartScenario={startScenario}
                  onResetScenario={resetScenario}
                  isSimulating={isSimulating}
                  onToggleSimulate={handleToggleSimulate}
                />
              </div>
            </VascularFrame>

            {/* Synthetic Activity & Signal Event Log */}
            <ActivityTable activities={activities} onExportCsv={handleExportCsv} />
          </div>
        </section>

        {/* 7. "Every Sensor Must Earn Its Alert" & Sensor Value Gate */}
        <SensorValueGate />

        {/* 8. Human-in-the-Loop Clinical Response Workflow */}
        <ResponseWorkflow onOpenWorkflowModal={() => setIsModalOpen(true)} />

        {/* 9. Staged Evaluation Roadmap */}
        <EvaluationRoadmap />
      </main>

      {/* 9. Comprehensive Footer */}
      <Footer />

      {/* 10. Accessible Response Workflow Modal */}
      <ResponseWorkflowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* 11. Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
};

export default App;
