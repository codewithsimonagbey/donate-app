import React from 'react';

const Progress = ({ value = 0, srLabel = 'Progress' }) => {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      <div
        className="h-2 rounded-full bg-[--color-muted]/40 overflow-hidden"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={srLabel}
      >
        <div
          className="h-full rounded-full bg-[--color-accent] transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
