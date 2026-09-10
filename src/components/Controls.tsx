import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  speed: number;
  setSpeed: (speed: number) => void;
  reset: () => void;
}

const speeds = [0.25, 0.5, 1, 2, 4, 8];

export function Controls({ isPlaying, togglePlay, speed, setSpeed, reset }: ControlsProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl z-10">
      <button 
        onClick={togglePlay}
        className="text-white hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-white/5"
        aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
      </button>

      <div className="h-8 w-px bg-white/20"></div>

      <div className="flex items-center gap-2">
        <FastForward size={16} className="text-white/50" />
        <div className="flex bg-white/5 rounded-lg overflow-hidden border border-white/5">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`px-3 py-1 text-sm font-medium transition-colors ${
                speed === s 
                  ? 'bg-blue-500/30 text-blue-300' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      <div className="h-8 w-px bg-white/20"></div>

      <button 
        onClick={reset}
        className="text-white/70 hover:text-red-400 transition-colors p-2 rounded-full hover:bg-white/5"
        title="Reiniciar"
        aria-label="Reiniciar"
      >
        <RotateCcw size={20} />
      </button>
    </div>
  );
}
