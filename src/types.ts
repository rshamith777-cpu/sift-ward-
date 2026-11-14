export type TimeRange = '15m' | '1h' | '6h';

export type ScenarioState = 'idle' | 'baseline' | 'shift' | 'advisory' | 'completed';

export interface VitalMetric {
  id: string;
  label: string;
  value: number | string;
  unit: string;
  change: string;
  baseline: string;
  status: 'optimal' | 'moderate' | 'elevated' | 'quality_check';
  syntheticSource: string;
  sparkline: number[];
  colorTheme: 'terracotta' | 'sage' | 'white';
  /** Explicit synthetic-data qualifier shown under the value, e.g. "synthetic, illustrative — not a clinical score" */
  footnote?: string;
}

export interface TrendDataPoint {
  timestamp: string;
  timeLabel: string;
  spo2: number;
  rr: number;
  heartRate: number;
  signalQuality: number;
  annotation?: string;
  isSimulatedShift?: boolean;
}

export interface ActivityRecord {
  id: string;
  timestamp: string;
  signal: string;
  value: string;
  source: 'Continuous Oximeter' | 'EHR Flowsheet' | 'Manual Obs' | 'Signal QC Filter';
  state: 'Review' | 'Nominal' | 'Data Quality' | 'Awaiting Ack';
  details: string;
  syntheticCategory: 'review' | 'nominal' | 'quality';
}

export interface NotificationItem {
  id: string;
  title: string;
  timestamp: string;
  category: 'workflow' | 'quality' | 'system';
  message: string;
  read: boolean;
  actionLabel?: string;
}

export interface SensorComparisonItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: 'teal' | 'coral' | 'slate' | 'amber';
  potentialValue: string[];
  limitations: string[];
  proposedRole: string;
  alertBurdenRisk: 'Low' | 'Medium' | 'High' | 'Very High';
  integrationComplexity: 'Low' | 'Moderate' | 'High' | 'Research Grade';
}

export interface SensorGateMetric {
  dimension: string;
  routineObs: string;
  ehrTrends: string;
  ehrPlusContinuous: string;
  targetEvaluationOutcome: string;
  measurementStatus: 'To be evaluated' | 'Baseline protocol';
}
