import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export const CustomHeartCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // Instant 1:1 real mouse position tracking with 0 lag
  useEffect(() => {
    // Only enable custom cursor if fine pointer (desktop mouse, not touch screen)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Instantaneous 1:1 hardware-accurate positioning
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest(
            'a, button, [role="button"], input, textarea, select, label, .neon-card, .cursor-pointer, [data-clickable]'
          )
        );
        setIsHovering(isInteractive);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Trigger ripple
      const rippleId = Date.now() + Math.random();
      setRipples((prev) => [...prev, { id: rippleId, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 600);

      // Trigger burst of sparkling mini hearts
      const count = 7;
      const newParticles: Particle[] = [];
      const colors = ['#ff2a8d', '#f72585', '#ff70a6', '#ffdef5', '#ffffff'];

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6;
        const speed = Math.random() * 2.8 + 1.8;
        newParticles.push({
          id: Date.now() + i + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2, // slight upward float
          size: Math.random() * 8 + 8,
          rotation: (Math.random() - 0.5) * 50,
          opacity: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Dedicated lightweight loop for click burst particles only
  useEffect(() => {
    if (particles.length === 0) return;
    let animId: number;

    const animateParticles = () => {
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1,
            opacity: p.opacity - 0.04,
            size: Math.max(0, p.size - 0.15),
          }))
          .filter((p) => p.opacity > 0 && p.size > 0);
      });
      animId = requestAnimationFrame(animateParticles);
    };

    animId = requestAnimationFrame(animateParticles);
    return () => cancelAnimationFrame(animId);
  }, [particles.length]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] overflow-hidden transition-opacity duration-150 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Ripple Rings on Click */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ff2a8d] animate-ping"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            width: '32px',
            height: '32px',
            boxShadow: '0 0 12px rgba(255, 42, 141, 0.8)',
            animationDuration: '0.55s',
          }}
        />
      ))}

      {/* Bursting Sparkling Mini Hearts on Click */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: p.opacity,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg) scale(${p.size / 12})`,
            filter: 'drop-shadow(0 0 5px rgba(255, 42, 141, 0.9))',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill={p.color}
            stroke="none"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Main Glowing Neon Pink Heart Cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
      >
        <div
          className={`relative transition-transform duration-150 ease-out ${
            isClicking ? 'scale-75' : isHovering ? 'scale-135' : 'scale-100'
          }`}
          style={{
            filter: isHovering
              ? 'drop-shadow(0 0 8px #ff007f) drop-shadow(0 0 16px #f72585) drop-shadow(0 0 26px #ff70a6)'
              : 'drop-shadow(0 0 5px rgba(255, 0, 127, 0.85)) drop-shadow(0 0 12px rgba(247, 37, 133, 0.6)) drop-shadow(0 0 20px rgba(255, 110, 199, 0.4))',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id="neonHeartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff70a6" />
                <stop offset="50%" stopColor="#ff007f" />
                <stop offset="100%" stopColor="#c2185b" />
              </linearGradient>
              <linearGradient id="neonHeartStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#ffdef5" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#neonHeartGradient)"
              stroke="url(#neonHeartStroke)"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Cute glossy reflection highlight inside the heart lobe */}
            <ellipse
              cx="7.5"
              cy="7.5"
              rx="2.2"
              ry="1.4"
              transform="rotate(-25 7.5 7.5)"
              fill="rgba(255, 255, 255, 0.75)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
