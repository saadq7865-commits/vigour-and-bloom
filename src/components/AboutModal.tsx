import React from 'react';
import { X, Check } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/50 cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs uppercase tracking-widest font-semibold text-emerald-800 block mb-1">
          Editorial Manifesto
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-4">
          The Vigour & Bloom Philosophy
        </h2>

        <div className="space-y-4 text-stone-700 text-sm leading-relaxed mb-6">
          <p>
            Vigour & Bloom was founded on a simple realization: the modern wellness landscape is flooded with extreme biohacks, grueling punishment workouts, and conflicting diet dogma that leave everyday people exhausted and intimidated.
          </p>
          <p>
            We believe that physical vitality is not reserved for 20-year-old fitness influencers or elite sprinters. Sustainable health is built upon low-friction daily rituals, evidence-backed exercise physiology, natural circadian rhythms, and unconditional self-compassion.
          </p>
          <p>
            Every field guide in this publication is written without bro-science or affiliate bias. We focus strictly on the minimum effective dose: the fundamental 20% of effort that produces 80% of physiological resilience, joint longevity, and mental clarity.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 mb-6 space-y-2.5">
          <h3 className="text-xs uppercase tracking-wider font-bold text-stone-900 mb-2">
            Our Three Editorial Tenets
          </h3>
          <div className="flex items-start gap-2.5 text-xs text-stone-700">
            <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <span><strong>Consistency Over Intensity:</strong> Three 20-minute sessions executed faithfully outperform five grueling sessions that lead to burnout.</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-stone-700">
            <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <span><strong>Movement Between Workouts:</strong> True vitality lives in your daily steps, postural adjustments, and micro-movement snacks across all 16 waking hours.</span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-stone-700">
            <Check className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
            <span><strong>Rest Is Where Adaptation Occurs:</strong> We honor deep sleep, parasympathetic down-regulation, and seasonal life periodization as non-negotiables.</span>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 cursor-pointer"
          >
            Continue Reading
          </button>
        </div>
      </div>
    </div>
  );
};
