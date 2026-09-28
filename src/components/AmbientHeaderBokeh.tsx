import React from 'react';

interface AmbientHeaderBokehProps {
  className?: string;
  variant?: 'hero' | 'navbar' | 'compact';
}

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

// Curated orbs in varied shades of translucent neon hot pink, magenta, and soft rose
const heroOrbs: FloatingOrb[] = [
  // Left area orbs
  {
    id: 'orb-1',
    size: 52,
    left: '8%',
    driftX: 25,
    duration: 18,
    delay: -4,
    blur: 16,
    opacity: 0.35,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.6) 0%, rgba(247, 37, 133, 0.3) 50%, transparent 75%)',
  },
  {
    id: 'orb-2',
    size: 18,
    left: '14%',
    driftX: -18,
    duration: 14,
    delay: -9,
    blur: 4,
    opacity: 0.45,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 112, 166, 0.8) 45%, rgba(255, 0, 127, 0.3) 80%, transparent 100%)',
  },
  {
    id: 'orb-3',
    size: 70,
    left: '22%',
    driftX: 30,
    duration: 22,
    delay: -12,
    blur: 20,
    opacity: 0.28,
    background: 'radial-gradient(circle, rgba(247, 37, 133, 0.5) 0%, rgba(255, 42, 141, 0.25) 55%, transparent 80%)',
  },
  {
    id: 'orb-4',
    size: 14,
    left: '28%',
    driftX: -15,
    duration: 12,
    delay: -2,
    blur: 3,
    opacity: 0.5,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 0, 127, 0.7) 60%, transparent 100%)',
  },
  // Center area orbs
  {
    id: 'orb-5',
    size: 42,
    left: '38%',
    driftX: -22,
    duration: 19,
    delay: -7,
    blur: 14,
    opacity: 0.32,
    background: 'radial-gradient(circle, rgba(255, 42, 141, 0.55) 0%, rgba(247, 166, 223, 0.3) 50%, transparent 75%)',
  },
  {
    id: 'orb-6',
    size: 16,
    left: '46%',
    driftX: 20,
    duration: 13,
    delay: -10,
    blur: 4,
    opacity: 0.42,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 110, 199, 0.75) 50%, rgba(247, 37, 133, 0.3) 85%, transparent 100%)',
  },
  {
    id: 'orb-7',
    size: 64,
    left: '52%',
    driftX: 28,
    duration: 24,
    delay: -15,
    blur: 18,
    opacity: 0.26,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.5) 0%, rgba(131, 24, 89, 0.2) 60%, transparent 80%)',
  },
  {
    id: 'orb-8',
    size: 20,
    left: '60%',
    driftX: -25,
    duration: 15,
    delay: -5,
    blur: 5,
    opacity: 0.4,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 42, 141, 0.7) 45%, transparent 85%)',
  },
  // Right area orbs (behind profile card)
  {
    id: 'orb-9',
    size: 78,
    left: '72%',
    driftX: 35,
    duration: 21,
    delay: -8,
    blur: 22,
    opacity: 0.3,
    background: 'radial-gradient(circle, rgba(247, 37, 133, 0.55) 0%, rgba(255, 0, 127, 0.3) 50%, transparent 75%)',
  },
  {
    id: 'orb-10',
    size: 15,
    left: '80%',
    driftX: -18,
    duration: 11,
    delay: -3,
    blur: 3,
    opacity: 0.48,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 112, 166, 0.8) 50%, transparent 90%)',
  },
  {
    id: 'orb-11',
    size: 48,
    left: '88%',
    driftX: -24,
    duration: 17,
    delay: -11,
    blur: 15,
    opacity: 0.32,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.5) 0%, rgba(247, 166, 223, 0.3) 55%, transparent 80%)',
  },
  {
    id: 'orb-12',
    size: 22,
    left: '94%',
    driftX: 18,
    duration: 16,
    delay: -14,
    blur: 5,
    opacity: 0.38,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(247, 37, 133, 0.7) 50%, transparent 85%)',
  },
];

// Orbs for the top navbar header bar
const navbarOrbs: FloatingOrb[] = [
  {
    id: 'nav-orb-1',
    size: 24,
    left: '12%',
    driftX: 20,
    duration: 14,
    delay: -2,
    blur: 8,
    opacity: 0.25,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.6) 0%, transparent 75%)',
  },
  {
    id: 'nav-orb-2',
    size: 14,
    left: '30%',
    driftX: -15,
    duration: 10,
    delay: -5,
    blur: 4,
    opacity: 0.35,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(247, 37, 133, 0.7) 60%, transparent 90%)',
  },
  {
    id: 'nav-orb-3',
    size: 28,
    left: '55%',
    driftX: 25,
    duration: 16,
    delay: -8,
    blur: 10,
    opacity: 0.22,
    background: 'radial-gradient(circle, rgba(255, 42, 141, 0.5) 0%, transparent 80%)',
  },
  {
    id: 'nav-orb-4',
    size: 16,
    left: '75%',
    driftX: -20,
    duration: 12,
    delay: -3,
    blur: 5,
    opacity: 0.3,
    background: 'radial-gradient(circle, #ffffff 0%, rgba(255, 110, 199, 0.7) 55%, transparent 85%)',
  },
  {
    id: 'nav-orb-5',
    size: 22,
    left: '90%',
    driftX: 16,
    duration: 13,
    delay: -7,
    blur: 7,
    opacity: 0.28,
    background: 'radial-gradient(circle, rgba(255, 0, 127, 0.55) 0%, transparent 80%)',
  },
];

export const AmbientHeaderBokeh: React.FC<AmbientHeaderBokehProps> = ({
  className = '',
  variant = 'hero',
}) => {
  const isNavbar = variant === 'navbar';
  const orbs = isNavbar ? navbarOrbs : heroOrbs;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none -z-0 ${className}`}
    >
      {/* Soft atmospheric background pools with slow random wandering drift */}
      {!isNavbar && (
        <>
          {/* Top-Left Ambient Neon Pink Pool */}
          <div
            className="ambient-drift-random absolute -top-24 -left-20 w-80 h-80 rounded-full"
            style={
              {
                background:
                  'radial-gradient(circle, rgba(255, 0, 127, 0.18) 0%, rgba(247, 37, 133, 0.12) 40%, rgba(255, 110, 199, 0.04) 70%, transparent 100%)',
                filter: 'blur(50px)',
                '--bokeh-duration': '22s',
                '--bokeh-delay': '0s',
              } as React.CSSProperties
            }
          />

          {/* Center-Top Ambient Magenta Glow */}
          <div
            className="ambient-drift-random absolute -top-16 left-1/3 w-96 h-96 rounded-full"
            style={
              {
                background:
                  'radial-gradient(circle, rgba(247, 37, 133, 0.15) 0%, rgba(255, 42, 141, 0.08) 45%, rgba(255, 222, 245, 0.02) 75%, transparent 100%)',
                filter: 'blur(60px)',
                '--bokeh-duration': '26s',
                '--bokeh-delay': '-6s',
              } as React.CSSProperties
            }
          />

          {/* Right-Side Ambient Glow behind Profile Card */}
          <div
            className="ambient-drift-random absolute top-10 -right-20 w-96 h-96 rounded-full"
            style={
              {
                background:
                  'radial-gradient(circle, rgba(255, 0, 127, 0.16) 0%, rgba(255, 110, 199, 0.1) 45%, transparent 80%)',
                filter: 'blur(55px)',
                '--bokeh-duration': '20s',
                '--bokeh-delay': '-11s',
              } as React.CSSProperties
            }
          />
        </>
      )}

      {/* Floating Bokeh / Orbs slowly floating upwards and swaying */}
      {orbs.map((orb) => (
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
