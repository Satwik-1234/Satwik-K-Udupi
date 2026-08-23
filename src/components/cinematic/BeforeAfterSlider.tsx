'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Layers, MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectRatio?: string;
  title?: string;
  subtitle?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Optical Satellite / Baseline',
  afterLabel = 'Hydraulic Model / Inundation Zone',
  className = '',
  aspectRatio = 'aspect-[16/10]',
  title,
  subtitle,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {(title || subtitle) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
          {title && <h4 className="text-sm font-semibold text-foreground tracking-tight">{title}</h4>}
          {subtitle && <p className="text-xs text-muted-foreground font-mono">{subtitle}</p>}
        </div>
      )}

      <div
        ref={containerRef}
        className={`relative ${aspectRatio} w-full rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/10 shadow-2xl bg-card group`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* "After" Image (Background Layer) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* "Before" Image (Clipped Foreground Layer) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-primary z-20 pointer-events-none shadow-[0_0_12px_rgba(0,229,255,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Grip */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary shadow-xl flex items-center justify-center text-primary backdrop-blur-md">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Floating Labels */}
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-lg bg-black/75 border border-white/10 backdrop-blur-md text-[11px] font-mono text-white/90">
          {beforeLabel}
        </div>
        <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-lg bg-black/75 border border-primary/30 backdrop-blur-md text-[11px] font-mono text-primary font-medium">
          {afterLabel}
        </div>

        {/* Helper Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/5 text-[10px] font-mono text-white/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
          Drag slider to compare layers
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
