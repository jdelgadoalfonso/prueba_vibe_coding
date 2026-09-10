import { useMemo } from 'react';

export function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 800 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 16000,
      y: (Math.random() - 0.5) * 16000,
      r: Math.random() * 4 + 1,
      opacity: Math.random() * 0.8 + 0.2,
    }));
  }, []);

  return (
    <g className="stars-layer">
      {stars.map((star) => (
        <circle
          key={star.id}
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="white"
          opacity={star.opacity}
        />
      ))}
    </g>
  );
}
