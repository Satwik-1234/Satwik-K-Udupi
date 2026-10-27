/**
 * HydroCast data adapter.
 *
 * The operational system (github.com/satwikcccss-crypto/CCCSS-SUK-Panchganga_Hydrocast) archives every
 * 6-hourly forecast cycle as JSON in a public repo, so the portfolio reads the real forecast straight from
 * GitHub's raw CDN (CORS-enabled) — no server needed. If that is unreachable, a clearly-labelled demo
 * series is shown instead.
 */
const RAW = 'https://raw.githubusercontent.com/satwikcccss-crypto/CCCSS-SUK-Panchganga_Hydrocast/main/data/runs/';

export const HYDROCAST_LINKS = {
  dashboard: 'https://cccss-suk-panchganga-hydrocast.vercel.app/dashboard',
  repo: 'https://github.com/satwikcccss-crypto/CCCSS-SUK-Panchganga_Hydrocast',
  docs: 'https://satwikcccss-crypto.github.io/CCCSS-SUK-Panchganga_Hydrocast/',
};

export interface CycleRow {
  id: string; runDate: string; cycleTime: string; start: number;
  peakQ: number; peakStage: number; alert: string; rainfallMm: number;
}
export interface Thresholds { alert: number; warning: number; danger: number; extreme: number; hfl: number }
export interface Pt { t: number; v: number }
export interface HydrocastRun {
  live: boolean; id: string; start: number; station: string;
  thresholds: Thresholds;
  stage: Pt[]; stageRajaram: Pt[]; discharge: Pt[]; observed: Pt[];
  peakQ: number; peakStage: number; leadToPeak: number; alert: string; receding: boolean;
  rainfallMm: number; ciHours: number | null; components: Record<string, string>;
}

const cache = new Map<string, HydrocastRun>();

export async function loadIndex(): Promise<CycleRow[] | null> {
  try {
    const r = await fetch(RAW + 'runs_index.json');
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    return (j as any[]).map((x) => ({
      id: x.cycle_id, runDate: x.run_date, cycleTime: x.cycle_time, start: new Date(x.start_time).getTime(),
      peakQ: x.peak_discharge_m3s, peakStage: x.shivaji_peak_stage_m, alert: x.alert_level, rainfallMm: x.total_rainfall_mm,
    }));
  } catch { return null; }
}

export async function loadRun(id: string): Promise<HydrocastRun | null> {
  if (cache.has(id)) return cache.get(id)!;
  try {
    const r = await fetch(`${RAW}${id}.json`);
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    const sh = j.bridgeShivaji, ra = j.bridgeRajaram ?? { forecast: [] };
    const t = (v: string) => new Date(v).getTime();
    const s = sh.site ?? {};
    // thresholds fall back to the system's own defaults (src/hydrology/stage_converter.py) for older archived cycles
    const thresholds: Thresholds = { alert: s.alert_stage_m ?? 542.1, warning: s.warning_stage_m ?? 542.7, danger: s.danger_stage_m ?? 543.3, extreme: s.extreme_stage_m ?? 544.0, hfl: s.hfl_m ?? 545.33 };
    const stage: Pt[] = sh.forecast.map((p: any) => ({ t: t(p.forecast_time), v: +p.stage_m }));
    const discharge: Pt[] = sh.forecast.map((p: any) => ({ t: t(p.forecast_time), v: +p.discharge_m3s }));
    const peakIdx = discharge.reduce((bi, p, i, arr) => (p.v > arr[bi].v ? i : bi), 0);
    const levelFor = (st: number) => (st >= thresholds.extreme ? 'EXTREME' : st >= thresholds.danger ? 'DANGER' : st >= thresholds.warning ? 'WARNING' : st >= thresholds.alert ? 'ALERT' : 'NORMAL');
    const maxStage = Math.max(...stage.map((p) => p.v));
    const run: HydrocastRun = {
      live: true, id: j.cycle_id ?? id, start: stage[0].t,
      station: 'Chhatrapati Shivaji Maharaj Bridge, Kolhapur',
      thresholds, stage, discharge,
      stageRajaram: (ra.forecast ?? []).map((p: any) => ({ t: t(p.forecast_time), v: +p.stage_m })),
      observed: (j.validation?.actual_observed_series ?? []).filter((p: any) => p.has_observation && p.observed_stage_m != null).map((p: any) => ({ t: t(p.timestamp), v: +p.observed_stage_m })),
      peakQ: discharge[peakIdx].v, peakStage: maxStage, leadToPeak: peakIdx,
      alert: levelFor(maxStage), receding: peakIdx === 0,
      rainfallMm: j.status?.last_cycle?.total_rainfall_mm ?? j.summary?.total_rainfall_mm ?? 0,
      ciHours: sh.peak_arrival?.confidence_interval?.margin_hours ?? null,
      components: j.pipeline?.components ?? {},
    };
    cache.set(id, run);
    return run;
  } catch { return null; }
}

/** Shown only if GitHub is unreachable. Synthetic — clearly labelled in the UI. */
export function demoRun(): HydrocastRun {
  const H = 3600_000, now = Math.floor(Date.now() / H) * H;
  const th = { alert: 542.1, warning: 542.7, danger: 543.3, extreme: 544.0, hfl: 545.33 };
  const q = (h: number) => 9.4 + 70 * Math.exp(-Math.pow((h - 30) / 14, 2));
  const stageOf = (Q: number) => 531.55 + Math.pow(Q / 9.4, 0.62) * 0.55 - 0.55;
  const stage: Pt[] = [], discharge: Pt[] = [];
  for (let h = 0; h < 90; h++) { stage.push({ t: now + h * H, v: +stageOf(q(h)).toFixed(2) }); discharge.push({ t: now + h * H, v: +q(h).toFixed(1) }); }
  return { live: false, id: 'DEMO', start: now, station: 'Sample series (HydroCast feed unreachable)', thresholds: th, stage, stageRajaram: stage.map((p) => ({ t: p.t, v: p.v + 0.65 })), discharge, observed: [],
    peakQ: Math.max(...discharge.map((p) => p.v)), peakStage: Math.max(...stage.map((p) => p.v)), leadToPeak: 30, alert: 'NORMAL', receding: false, rainfallMm: 0, ciHours: 2, components: {} };
}
