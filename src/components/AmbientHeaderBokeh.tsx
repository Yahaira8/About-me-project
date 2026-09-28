import React from 'react';

interface FloatingOrb {
  id: string;
  size: number;
  left: string;
  driftX: number;
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
  background: string;
}

// 20+ Curated luminous orbs & bokeh bubbles in neon hot pink, electric magenta, soft rose, and glowing white cores
const globalOrbs: FloatingOrb[] = [
  {
    id: 'g-orb-1',
    size: 56,
    left: '4%',
    driftX: 28,
    duration: 18,
    delay: -3,
    blur: 16,
    opacity: 0.32,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.65) 0%, rgba(247, 37, 133, 0.3) 50%, transparent 80%)',
  },
  {
    id: 'g-orb-2',
    size: 16,
    left: '9%',
    driftX: -20,
    duration: 13,
    delay: -9,
    blur: 3,
    opacity: 0.45,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 112, 166, 0.85) 45%, rgba(255, 0, 127, 0.3) 80%, transparent 100%)',
  },
  {
    id: 'g-orb-3',
    size: 76,
    left: '15%',
    driftX: 32,
    duration: 22,
    delay: -14,
    blur: 22,
    opacity: 0.28,
    background: 'radial-gradient(circle, rgba(247, 37, 133, 0.5) 0%, rgba(255, 42, 141, 0.25) 55%, transparent 80%)',
  },
  {
    id: 'g-orb-4',
    size: 20,
    left: '21%',
    driftX: -16,
    duration: 14,
    delay: -6,
    blur: 4,
    opacity: 0.5,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 0, 127, 0.75) 55%, transparent 95%)',
  },
  {
    id: 'g-orb-5',
    size: 44,
    left: '28%',
    driftX: 22,
    duration: 17,
    delay: -11,
    blur: 14,
    opacity: 0.3,
    background: 'radial-gradient(circle, rgba(255, 42, 141, 0.55) 0%, rgba(247, 166, 223, 0.3) 50%, transparent 75%)',
  },
  {
    id: 'g-orb-6',
    size: 14,
    left: '34%',
    driftX: -18,
    duration: 12,
    delay: -2,
    blur: 3,
    opacity: 0.45,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 110, 199, 0.8) 50%, transparent 90%)',
  },
  {
    id: 'g-orb-7',
    size: 68,
    left: '40%',
    driftX: 30,
    duration: 23,
    delay: -16,
    blur: 20,
    opacity: 0.25,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.55) 0%, rgba(131, 24, 89, 0.2) 60%, transparent 85%)',
  },
  {
    id: 'g-orb-8',
    size: 22,
    left: '46%',
    driftX: -24,
    duration: 15,
    delay: -8,
    blur: 5,
    opacity: 0.42,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 42, 141, 0.7) 45%, transparent 85%)',
  },
  {
    id: 'g-orb-9',
    size: 82,
    left: '53%',
    driftX: 35,
    duration: 24,
    delay: -12,
    blur: 24,
    opacity: 0.27,
    background: 'radial-gradient(circle, rgba(247, 37, 133, 0.55) 0%, rgba(255, 0, 127, 0.3) 50%, transparent 80%)',
  },
  {
    id: 'g-orb-10',
    size: 18,
    left: '59%',
    driftX: -20,
    duration: 13,
    delay: -4,
    blur: 4,
    opacity: 0.48,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 112, 166, 0.8) 50%, transparent 90%)',
  },
  {
    id: 'g-orb-11',
    size: 52,
    left: '66%',
    driftX: 25,
    duration: 19,
    delay: -15,
    blur: 15,
    opacity: 0.32,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.55) 0%, rgba(247, 166, 223, 0.3) 55%, transparent 80%)',
  },
  {
    id: 'g-orb-12',
    size: 15,
    left: '72%',
    driftX: -15,
    duration: 11,
    delay: -7,
    blur: 3,
    opacity: 0.46,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(247, 37, 133, 0.75) 50%, transparent 85%)',
  },
  {
    id: 'g-orb-13',
    size: 74,
    left: '79%',
    driftX: 30,
    duration: 21,
    delay: -10,
    blur: 22,
    opacity: 0.28,
    background: 'radial-gradient(circle, rgba(255, 42, 141, 0.55) 0%, rgba(247, 37, 133, 0.25) 55%, transparent 85%)',
  },
  {
    id: 'g-orb-14',
    size: 20,
    left: '85%',
    driftX: -22,
    duration: 16,
    delay: -13,
    blur: 5,
    opacity: 0.4,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 110, 199, 0.75) 50%, transparent 85%)',
  },
  {
    id: 'g-orb-15',
    size: 58,
    left: '91%',
    driftX: 24,
    duration: 20,
    delay: -5,
    blur: 18,
    opacity: 0.3,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.6) 0%, rgba(255, 112, 166, 0.3) 50%, transparent 80%)',
  },
  {
    id: 'g-orb-16',
    size: 16,
    left: '96%',
    driftX: -14,
    duration: 12,
    delay: -1,
    blur: 3,
    opacity: 0.45,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(247, 37, 133, 0.8) 50%, transparent 90%)',
  },
  {
    id: 'g-orb-17',
    size: 40,
    left: '11%',
    driftX: -24,
    duration: 16,
    delay: -15,
    blur: 12,
    opacity: 0.34,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.55) 0%, rgba(247, 166, 223, 0.25) 50%, transparent 80%)',
  },
  {
    id: 'g-orb-18',
    size: 60,
    left: '31%',
    driftX: 26,
    duration: 21,
    delay: -8,
    blur: 18,
    opacity: 0.26,
    background: 'radial-gradient(circle, rgba(247, 37, 133, 0.5) 0%, rgba(255, 42, 141, 0.2) 60%, transparent 85%)',
  },
  {
    id: 'g-orb-19',
    size: 16,
    left: '50%',
    driftX: -16,
    duration: 13,
    delay: -11,
    blur: 4,
    opacity: 0.44,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 112, 166, 0.8) 50%, transparent 85%)',
  },
  {
    id: 'g-orb-20',
    size: 48,
    left: '63%',
    driftX: 22,
    duration: 18,
    delay: -17,
    blur: 16,
    opacity: 0.32,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.5) 0%, rgba(255, 110, 199, 0.25) 55%, transparent 80%)',
  },
  {
    id: 'g-orb-21',
    size: 18,
    left: '76%',
    driftX: -18,
    duration: 14,
    delay: -5,
    blur: 4,
    opacity: 0.42,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(247, 37, 133, 0.7) 45%, transparent 85%)',
  },
  {
    id: 'g-orb-22',
    size: 66,
    left: '88%',
    driftX: 28,
    duration: 22,
    delay: -19,
    blur: 20,
    opacity: 0.28,
    background: 'radial-gradient(circle, rgba(247, 37, 133, 0.55) 0%, rgba(255, 0, 127, 0.25) 50%, transparent 80%)',
  },
];

export interface AmbientBokehProps {
  className?: string;
  variant?: 'hero' | 'navbar' | 'compact' | 'global';
}

export const GlobalAmbientBokeh: React.FC<AmbientBokehProps> = ({ className = '' }) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden select-none ${className}`}
    >
      {/* 1. Multiple Slow Wandering Atmospheric Nebula Clouds spread across entire screen */}
      {/* Top-Left Ambient Neon Pink Nebula */}
      <div
        className="ambient-drift-random absolute -top-32 -left-28 w-[450px] h-[450px] rounded-full"
        style={
          {
            background:
              'radial-gradient(circle, rgba(255, 0, 127, 0.17) 0%, rgba(247, 37, 133, 0.11) 40%, rgba(255, 110, 199, 0.04) 70%, transparent 100%)',
            filter: 'blur(55px)',
            '--bokeh-duration': '22s',
            '--bokeh-delay': '0s',
          } as React.CSSProperties
        }
      />

      {/* Top-Right Ambient Magenta Glow */}
      <div
        className="ambient-drift-random absolute -top-20 -right-24 w-[480px] h-[480px] rounded-full"
        style={
          {
            background:
              'radial-gradient(circle, rgba(247, 37, 133, 0.15) 0%, rgba(255, 42, 141, 0.09) 45%, rgba(255, 222, 245, 0.02) 75%, transparent 100%)',
            filter: 'blur(60px)',
            '--bokeh-duration': '26s',
            '--bokeh-delay': '-6s',
          } as React.CSSProperties
        }
      />

      {/* Mid-Screen Left Soft Rose Ambient Pool */}
      <div
        className="ambient-drift-random absolute top-1/3 -left-36 w-[520px] h-[520px] rounded-full"
        style={
          {
            background:
              'radial-gradient(circle, rgba(255, 42, 141, 0.14) 0%, rgba(247, 166, 223, 0.08) 50%, transparent 80%)',
            filter: 'blur(65px)',
            '--bokeh-duration': '28s',
            '--bokeh-delay': '-14s',
          } as React.CSSProperties
        }
      />

      {/* Mid-Screen Right Hot Pink Ambient Pool */}
      <div
        className="ambient-drift-random absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full"
        style={
          {
            background:
              'radial-gradient(circle, rgba(255, 0, 127, 0.15) 0%, rgba(255, 110, 199, 0.08) 45%, transparent 80%)',
            filter: 'blur(60px)',
            '--bokeh-duration': '24s',
            '--bokeh-delay': '-9s',
          } as React.CSSProperties
        }
      />

      {/* Lower-Screen Center Deep Glowing Orchid Pool */}
      <div
        className="ambient-drift-random absolute -bottom-28 left-1/4 w-[560px] h-[560px] rounded-full"
        style={
          {
            background:
              'radial-gradient(circle, rgba(247, 37, 133, 0.14) 0%, rgba(131, 24, 89, 0.08) 40%, rgba(255, 222, 245, 0.02) 70%, transparent 100%)',
            filter: 'blur(70px)',
            '--bokeh-duration': '30s',
            '--bokeh-delay': '-18s',
          } as React.CSSProperties
        }
      />

      {/* 2. Floating Luminous Bokeh Orbs Rising from Bottom to Top Continuously */}
      {globalOrbs.map((orb) => (
        <div
          key={orb.id}
          className="ambient-float-up absolute bottom-0 rounded-full"
          style={
            {
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              left: orb.left,
              background: orb.background,
              filter: `blur(${orb.blur}px)`,
              '--bokeh-opacity': orb.opacity,
              '--bokeh-drift': `${orb.driftX}px`,
              '--bokeh-duration': `${orb.duration}s`,
              '--bokeh-delay': `${orb.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};

// Backwards compatibility alias
export const AmbientHeaderBokeh = GlobalAmbientBokeh;
