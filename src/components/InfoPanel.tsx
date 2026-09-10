import { Planet } from '../types';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InfoPanelProps {
  planet: Planet | null;
  onClose: () => void;
}

export function InfoPanel({ planet, onClose }: InfoPanelProps) {
  return (
    <AnimatePresence>
      {planet && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="absolute top-6 right-6 w-80 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl z-20 text-white"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div 
              className="w-10 h-10 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
              style={{ backgroundColor: planet.color }}
            />
            <h2 className="text-2xl font-semibold tracking-tight">{planet.name}</h2>
          </div>

          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 border-b border-white/10 pb-3">
              <span className="text-white/50">Diámetro</span>
              <span className="text-right font-medium">{planet.diameter}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-white/10 pb-3">
              <span className="text-white/50">Distancia al Sol</span>
              <span className="text-right font-medium">{planet.distanceToSun}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-white/10 pb-3">
              <span className="text-white/50">Período Orbital</span>
              <span className="text-right font-medium">{planet.orbitalPeriodStr}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-white/10 pb-3">
              <span className="text-white/50">Tamaño Relativo</span>
              <span className="text-right font-medium">{planet.relativeSize}</span>
            </div>
            
            <div className="pt-2">
              <span className="text-white/50 block mb-2">Acerca de</span>
              <p className="text-white/90 leading-relaxed">
                {planet.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
