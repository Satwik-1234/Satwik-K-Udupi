'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from 'recharts';
import {
  Waves,
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  CloudRain,
  Flame,
  AlertTriangle,
  Info,
  Droplets,
  Activity,
} from 'lucide-react';

export const HydroSandbox: React.FC = () => {
  // Simulator Parameters
  const [rainfallMm, setRainfallMm] = useState<number>(120); // 24-hr Rainfall depth (mm)
  const [curveNumber, setCurveNumber] = useState<number>(78); // SCS Curve Number
  const [manningN, setManningN] = useState<number>(0.035); // Channel Roughness
  const [catchmentAreaSqKm, setCatchmentAreaSqKm] = useState<number>(250); // Catchment Area in km²
  const [breachMode, setBreachMode] = useState<boolean>(false);

  // Hydrological Calculations (SCS-CN Runoff Method & Unit Hydrograph)
  const simulationResults = useMemo(() => {
    // S = Potential Maximum Retention in mm
    const S = (25400 / curveNumber) - 254;
    const initialAbstraction = 0.2 * S;

    // Direct Runoff Q (mm)
    let directRunoffMm = 0;
    if (rainfallMm > initialAbstraction) {
      directRunoffMm = Math.pow(rainfallMm - initialAbstraction, 2) / (rainfallMm + 0.8 * S);
    }

    // Peak Discharge Estimation (SCS Triangular Unit Hydrograph)
    // Time of concentration Tc ≈ (L^0.8 * (S + 25.4)^0.7) / (4238 * sqrt(Y)) simplified
    const timeOfConcentrationHours = Math.max(1.5, Math.min(12, (Math.sqrt(catchmentAreaSqKm) * 0.4) * (0.05 / manningN)));
    const timeToPeakHours = breachMode
      ? 1.2
      : 0.6 * timeOfConcentrationHours + 0.5 * 2.0;

    // Peak Discharge Qp (m³/s)
    let peakDischarge = (0.208 * catchmentAreaSqKm * directRunoffMm) / timeToPeakHours;
    if (breachMode) {
      // Froehlich Dam Breach peak multiplier
      peakDischarge *= 4.5;
    }

    // Generate Hydrograph Timeseries points (24 hours)
    const hydrographData = [];
    const totalDurationHours = Math.ceil(timeToPeakHours * 4 + 6);

    for (let t = 0; t <= totalDurationHours; t += 0.5) {
      let discharge = 0;
      if (t <= timeToPeakHours) {
        discharge = peakDischarge * Math.pow(t / timeToPeakHours, 1.8);
      } else {
        // Recession limb exponential decay
        const recFactor = (t - timeToPeakHours) / (timeToPeakHours * 2.2);
        discharge = peakDischarge * Math.exp(-recFactor * 1.5);
      }

      // Add small baseflow
      const baseflow = catchmentAreaSqKm * 0.05;
      const totalQ = Math.max(0, discharge + baseflow);

      hydrographData.push({
        time: `${t.toFixed(1)}h`,
        timeNum: t,
        discharge: Math.round(totalQ * 10) / 10,
        stageHeight: Math.round((Math.pow(totalQ / (manningN * 50), 0.6) + 0.5) * 100) / 100, // Manning stage (m)
      });
    }

    // Water level height for cross-section visualizer
    const maxStage = Math.max(...hydrographData.map((d) => d.stageHeight));
    const runoffVolumeMCM = (directRunoffMm * catchmentAreaSqKm * 1000) / 1e6; // Million Cubic Meters

    return {
      directRunoffMm: Math.round(directRunoffMm * 10) / 10,
      peakDischarge: Math.round(peakDischarge),
      timeToPeakHours: Math.round(timeToPeakHours * 10) / 10,
      runoffVolumeMCM: Math.round(runoffVolumeMCM * 100) / 100,
      maxStage: Math.round(maxStage * 10) / 10,
      hydrographData,
    };
  }, [rainfallMm, curveNumber, manningN, catchmentAreaSqKm, breachMode]);

  const resetDefaults = () => {
    setRainfallMm(120);
    setCurveNumber(78);
    setManningN(0.035);
    setCatchmentAreaSqKm(250);
    setBreachMode(false);
  };

  return (
    <div className="w-full cinematic-card p-6 md:p-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/[0.08] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Hydrodynamic Sandbox</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Hydraulic & Rainfall-Runoff Simulator
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Real-time SCS-CN runoff modeling & hydrodynamic flood wave calculation based on HEC-HMS and HEC-RAS principles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setBreachMode(!breachMode)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
              breachMode
                ? 'bg-destructive/20 border border-destructive text-destructive-foreground shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                : 'bg-muted hover:bg-muted/80 border border-white/10 text-muted-foreground'
            }`}
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${breachMode ? 'text-red-400 animate-bounce' : ''}`} />
            {breachMode ? 'DAM BREACH: ACTIVE' : 'SIMULATE DAM BREACH'}
          </button>

          <button
            onClick={resetDefaults}
            title="Reset to default basin parameters"
            className="p-2 rounded-xl bg-card border border-white/10 text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Controls on Left, Charts & Visualization on Right */}
      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: Interactive Parametric Sliders (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Slider 1: Rainfall Depth */}
          <div className="space-y-2 p-4 rounded-xl bg-background/50 border border-white/[0.06]">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-primary" />
                24-Hour Precipitation ($P$)
              </span>
              <span className="text-primary font-bold">{rainfallMm} mm</span>
            </div>
            <input
              type="range"
              min="20"
              max="400"
              step="5"
              value={rainfallMm}
              onChange={(e) => setRainfallMm(Number(e.target.value))}
              className="w-full accent-primary bg-muted rounded-lg h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground/60">
              <span>20mm (Moderate)</span>
              <span>200mm (Heavy)</span>
              <span>400mm (PMP Extreme)</span>
            </div>
          </div>

          {/* Slider 2: SCS Curve Number */}
          <div className="space-y-2 p-4 rounded-xl bg-background/50 border border-white/[0.06]">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted-foreground flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-accent" />
                SCS Curve Number ($CN$)
              </span>
              <span className="text-accent font-bold">{curveNumber}</span>
            </div>
            <input
              type="range"
              min="40"
              max="98"
              step="1"
              value={curveNumber}
              onChange={(e) => setCurveNumber(Number(e.target.value))}
              className="w-full accent-accent bg-muted rounded-lg h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground/60">
              <span>CN 40 (Dense Forest)</span>
              <span>CN 78 (Agri Soil C)</span>
              <span>CN 95 (Paved Urban)</span>
            </div>
          </div>

          {/* Slider 3: Catchment Area */}
          <div className="space-y-2 p-4 rounded-xl bg-background/50 border border-white/[0.06]">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted-foreground">Catchment Area ($A$)</span>
              <span className="text-white font-bold">{catchmentAreaSqKm} km²</span>
            </div>
            <input
              type="range"
              min="20"
              max="1500"
              step="10"
              value={catchmentAreaSqKm}
              onChange={(e) => setCatchmentAreaSqKm(Number(e.target.value))}
              className="w-full accent-emerald-400 bg-muted rounded-lg h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground/60">
              <span>20 km² (Sub-basin)</span>
              <span>500 km² (River Basin)</span>
              <span>1500 km² (Large Catchment)</span>
            </div>
          </div>

          {/* Slider 4: Manning Roughness */}
          <div className="space-y-2 p-4 rounded-xl bg-background/50 border border-white/[0.06]">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-muted-foreground">Manning Roughness ($n$)</span>
              <span className="text-cyan-400 font-bold">{manningN}</span>
            </div>
            <input
              type="range"
              min="0.015"
              max="0.080"
              step="0.005"
              value={manningN}
              onChange={(e) => setManningN(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-muted rounded-lg h-1.5 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground/60">
              <span>0.015 (Concrete Canal)</span>
              <span>0.035 (Clean Channel)</span>
              <span>0.075 (Dense Vegetation)</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-card/80 border border-white/[0.08]">
              <span className="text-[10px] font-mono text-muted-foreground block uppercase">Direct Runoff Depth</span>
              <span className="text-xl font-bold text-primary">{simulationResults.directRunoffMm} mm</span>
            </div>
            <div className="p-3 rounded-xl bg-card/80 border border-white/[0.08]">
              <span className="text-[10px] font-mono text-muted-foreground block uppercase">Total Runoff Volume</span>
              <span className="text-xl font-bold text-accent">{simulationResults.runoffVolumeMCM} MCM</span>
            </div>
            <div className="p-3 rounded-xl bg-card/80 border border-white/[0.08]">
              <span className="text-[10px] font-mono text-muted-foreground block uppercase">Peak Discharge ($Q_p$)</span>
              <span className="text-xl font-bold text-cyan-300">{simulationResults.peakDischarge.toLocaleString()} m³/s</span>
            </div>
            <div className="p-3 rounded-xl bg-card/80 border border-white/[0.08]">
              <span className="text-[10px] font-mono text-muted-foreground block uppercase">Time to Peak ($T_p$)</span>
              <span className="text-xl font-bold text-emerald-400">{simulationResults.timeToPeakHours} hrs</span>
            </div>
          </div>
        </div>

        {/* Right: Hydrograph Chart & Dynamic River Cross-Section (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Hydrograph Chart */}
          <div className="p-5 rounded-2xl bg-background/70 border border-white/[0.08] relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono font-semibold text-foreground">
                  Simulated Inflow / Breach Hydrograph [$Q(t)$]
                </span>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                Peak: {simulationResults.peakDischarge} m³/s @ {simulationResults.timeToPeakHours}h
              </span>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulationResults.hydrographData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="hydroGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={breachMode ? '#ef4444' : '#00E5FF'} stopOpacity={0.4} />
                      <stop offset="95%" stopColor={breachMode ? '#ef4444' : '#00E5FF'} stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                  <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 10, fontFamily: 'monospace' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(5, 8, 17, 0.95)',
                      borderColor: 'rgba(0, 229, 255, 0.3)',
                      borderRadius: '12px',
                      fontSize: '11px',
                      fontFamily: 'monospace',
                    }}
                    formatter={(value: any) => [`${value} m³/s`, 'Discharge']}
                  />
                  <Area
                    type="monotone"
                    dataKey="discharge"
                    stroke={breachMode ? '#ef4444' : '#00E5FF'}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#hydroGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Dynamic River Channel Inundation Cross-Section */}
          <div className="p-5 rounded-2xl bg-background/70 border border-white/[0.08]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-cyan-400" />
                Downstream Channel Cross-Section & Inundation Depth
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                Max Flood Stage: {simulationResults.maxStage} m
              </span>
            </div>

            {/* SVG Cross-section render */}
            <div className="relative h-32 w-full rounded-xl bg-card overflow-hidden border border-white/5 flex items-end justify-center p-2">
              <svg viewBox="0 0 400 120" className="w-full h-full">
                {/* Valley / Channel Profile */}
                <path
                  d="M 10 20 L 120 95 L 280 95 L 390 20 L 390 120 L 10 120 Z"
                  fill="#111827"
                  stroke="#374151"
                  strokeWidth="1.5"
                />

                {/* Flood Water Level Body */}
                <motion.path
                  animate={{
                    d: `M ${120 - Math.min(100, simulationResults.maxStage * 12)} ${
                      95 - Math.min(70, simulationResults.maxStage * 10)
                    } L 120 95 L 280 95 L ${280 + Math.min(100, simulationResults.maxStage * 12)} ${
                      95 - Math.min(70, simulationResults.maxStage * 10)
                    } Z`,
                  }}
                  transition={{ duration: 0.6 }}
                  fill={breachMode ? 'rgba(239, 68, 68, 0.45)' : 'rgba(0, 229, 255, 0.4)'}
                  stroke={breachMode ? '#ef4444' : '#00E5FF'}
                  strokeWidth="2"
                />

                {/* Water Surface Ripple lines */}
                <line
                  x1={120 - Math.min(100, simulationResults.maxStage * 12)}
                  y1={95 - Math.min(70, simulationResults.maxStage * 10)}
                  x2={280 + Math.min(100, simulationResults.maxStage * 12)}
                  y2={95 - Math.min(70, simulationResults.maxStage * 10)}
                  stroke={breachMode ? '#f87171' : '#38bdf8'}
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />

                {/* Stage marker */}
                <text
                  x="200"
                  y={Math.max(30, 95 - Math.min(70, simulationResults.maxStage * 10) - 8)}
                  textAnchor="middle"
                  fill={breachMode ? '#fca5a5' : '#67e8f9'}
                  fontSize="10"
                  fontFamily="monospace"
                >
                  Depth: {simulationResults.maxStage}m
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HydroSandbox;
