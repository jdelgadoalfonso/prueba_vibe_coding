/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { planets } from './data';
import { Planet } from './types';
import { Controls } from './components/Controls';
import { InfoPanel } from './components/InfoPanel';
import { StarBackground } from './components/StarBackground';

export default function App() {
  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  
  const requestRef = useRef<number>(0);
  const previousTimeRef = useRef<number | null>(null);

  const animate = (currentRealTime: number) => {
    if (previousTimeRef.current !== null && isPlaying) {
      const deltaTime = currentRealTime - previousTimeRef.current;
      // 1 unit of time = 1 year.
      // Adjust the multiplier to make the base speed pleasant visually.
      // 0.0002 means 1 real second roughly equals 0.2 Earth years at 1x speed.
      setTime(prevTime => prevTime + deltaTime * 0.0002 * speed);
    }
    previousTimeRef.current = currentRealTime;
    
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      previousTimeRef.current = null;
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, speed]);

  const handleReset = () => {
    setTime(0);
  };

  const handlePlanetClick = (planet: Planet, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPlanet(planet);
  };

  return (
    <div className="w-full h-screen bg-[#050510] overflow-hidden relative font-sans">
      {/* Interactive SVG Canvas */}
      <div 
        className="w-full h-full cursor-crosshair"
        onClick={() => setSelectedPlanet(null)}
      >
        <svg 
          viewBox="-850 -850 1700 1700" 
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1" />
              <stop offset="70%" stopColor="#ca8a04" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
            </radialGradient>
          </defs>

          <StarBackground />

          {/* Central Sun */}
          <g className="sun">
            {/* Sun Glow Animation */}
            <circle cx={0} cy={0} r={65} fill="url(#sun-glow)">
              <animate 
                attributeName="r" 
                values="65;70;65" 
                dur="4s" 
                repeatCount="indefinite" 
              />
              <animate 
                attributeName="opacity" 
                values="0.6;0.9;0.6" 
                dur="4s" 
                repeatCount="indefinite" 
              />
            </circle>
            <circle cx={0} cy={0} r={40} fill="#facc15" />
          </g>

          {/* Orbits */}
          <g className="orbits">
            {planets.map(p => (
              <circle 
                key={`orbit-${p.id}`}
                r={p.orbitRadius} 
                fill="none" 
                stroke="rgba(255,255,255,0.08)" 
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
            ))}
          </g>

          {/* Planets */}
          <g className="planets">
            {planets.map(p => {
              const angle = (time / p.period) * Math.PI * 2;
              const x = Math.cos(angle) * p.orbitRadius;
              const y = Math.sin(angle) * p.orbitRadius;
              const isSelected = selectedPlanet?.id === p.id;

              return (
                <g 
                  key={`planet-${p.id}`}
                  transform={`translate(${x}, ${y})`} 
                  onClick={(e) => handlePlanetClick(p, e as unknown as React.MouseEvent)}
                  className="cursor-pointer transition-transform duration-300 hover:scale-110"
                >
                  {/* Selection Highlight */}
                  {isSelected && (
                    <circle 
                      r={p.radius + 6} 
                      fill="none" 
                      stroke="#60a5fa" 
                      strokeWidth="2" 
                      className="opacity-70 animate-pulse"
                    />
                  )}

                  {/* Saturn Rings */}
                  {p.hasRings && (
                    <ellipse 
                      rx={p.radius * 2.2} 
                      ry={p.radius * 0.5} 
                      fill="transparent"
                      stroke="rgba(227, 213, 153, 0.6)"
                      strokeWidth="4"
                      transform="rotate(-20)" 
                    />
                  )}
                  {p.hasRings && (
                    <ellipse 
                      rx={p.radius * 2.6} 
                      ry={p.radius * 0.6} 
                      fill="transparent"
                      stroke="rgba(227, 213, 153, 0.3)"
                      strokeWidth="2"
                      transform="rotate(-20)" 
                    />
                  )}
                  
                  {/* Planet Body */}
                  <circle r={p.radius} fill={p.color} />
                  
                  {/* Label */}
                  <text 
                    y={p.radius + 20} 
                    fill={isSelected ? '#60a5fa' : 'white'} 
                    fontSize="16" 
                    fontWeight={isSelected ? '600' : '400'}
                    textAnchor="middle"
                    className="pointer-events-none drop-shadow-md select-none transition-colors"
                  >
                    {p.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <InfoPanel 
        planet={selectedPlanet} 
        onClose={() => setSelectedPlanet(null)} 
      />

      <Controls 
        isPlaying={isPlaying} 
        togglePlay={() => setIsPlaying(!isPlaying)} 
        speed={speed} 
        setSpeed={setSpeed} 
        reset={handleReset} 
      />
    </div>
  );
}
