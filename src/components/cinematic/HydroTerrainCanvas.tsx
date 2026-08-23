'use client';

import React, { useEffect, useRef } from 'react';

interface HydroTerrainCanvasProps {
  className?: string;
  intensity?: number;
  interactive?: boolean;
}

export const HydroTerrainCanvas: React.FC<HydroTerrainCanvasProps> = ({
  className = '',
  intensity = 1,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; radius: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
    radius: 0.25,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
    };

    const handleClick = () => {
      mouseRef.current.radius = 0.6; // Ripple burst
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Particle / Grid points for 3D bathymetric mesh
    const cols = Math.floor(Math.min(width / 24, 60));
    const rows = Math.floor(Math.min(height / 28, 36));
    let time = 0;

    const render = () => {
      time += 0.015 * intensity;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      mouseRef.current.radius += (0.25 - mouseRef.current.radius) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Gradient Background Mesh lines
      const cellW = width / (cols - 1);
      const cellH = height / (rows - 1);

      ctx.lineWidth = 1.2;

      // Calculate heights
      const grid: number[][] = [];
      for (let r = 0; r < rows; r++) {
        grid[r] = [];
        for (let c = 0; c < cols; c++) {
          const u = c / (cols - 1);
          const v = r / (rows - 1);

          // Distance from mouse
          const dx = u - mouseRef.current.x;
          const dy = v - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseEffect = Math.exp(-(dist * dist) / (mouseRef.current.radius * mouseRef.current.radius * 0.5)) * 35;

          // Hydrological wave synthesis (Simulating riverbed & flood wave attenuation)
          const wave1 = Math.sin(u * 5 + time * 1.2) * Math.cos(v * 4 + time * 0.8) * 16;
          const wave2 = Math.sin(u * 12 - time * 1.5 + v * 8) * 8;
          const wave3 = Math.cos((u + v) * 6 - time) * 10;

          const elevation = (wave1 + wave2 + wave3 + mouseEffect) * intensity;
          grid[r][c] = elevation;
        }
      }

      // Draw horizontal contour flow lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        const v = r / (rows - 1);

        for (let c = 0; c < cols; c++) {
          const x = c * cellW;
          const y = r * cellH - grid[r][c];

          if (c === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Color based on depth and elevation
        const alpha = Math.max(0.08, Math.min(0.4, (r / rows) * 0.35 + 0.1));
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(0, `rgba(0, 229, 255, ${alpha * 0.3})`);
        gradient.addColorStop(0.5, `rgba(0, 229, 255, ${alpha})`);
        gradient.addColorStop(1, `rgba(16, 185, 129, ${alpha * 0.5})`);

        ctx.strokeStyle = gradient;
        ctx.stroke();
      }

      // Draw vertical cross-flow stream lines
      for (let c = 0; c < cols; c += 2) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const x = c * cellW;
          const y = r * cellH - grid[r][c];

          if (r === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.06)';
        ctx.stroke();
      }

      // Draw active telemetry focal nodes at key intersections
      for (let r = 2; r < rows; r += 4) {
        for (let c = 2; c < cols; c += 5) {
          const x = c * cellW;
          const y = r * cellH - grid[r][c];
          const elev = grid[r][c];

          if (Math.abs(elev) > 12) {
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = elev > 18 ? 'rgba(245, 158, 11, 0.7)' : 'rgba(0, 229, 255, 0.7)';
            ctx.fill();

            // Tiny altitude ring
            ctx.beginPath();
            ctx.arc(x, y, 5.5, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, interactive]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block opacity-75" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background pointer-events-none" />
    </div>
  );
};

export default HydroTerrainCanvas;
