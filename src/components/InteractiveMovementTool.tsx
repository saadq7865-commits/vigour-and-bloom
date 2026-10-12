import React, { useState } from 'react';
import { Calendar, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';

export const InteractiveMovementTool: React.FC = () => {
  const [goal, setGoal] = useState<'strength' | 'energy' | 'habits'>('strength');
  const [timeAvailable, setTimeAvailable] = useState<number>(20);
  const [level, setLevel] = useState<'day1' | 'restarting' | 'intermediate'>('day1');
  const [copied, setCopied] = useState(false);

  // Generate customized weekly template based on selections
  const generateSchedule = () => {
    if (goal === 'strength') {
      return [
        { day: 'Mon', focus: `Full-Body Strength (${timeAvailable}m)`, detail: 'Box squats, incline push-ups, glute bridges, door rows' },
        { day: 'Tue', focus: 'Active Walk (15m)', detail: 'Brisk nasal-breathing walk + posture reset' },
        { day: 'Wed', focus: `Full-Body Strength (${timeAvailable}m)`, detail: 'Bodyweight Romanian deadlifts, wall push-ups, plank hold' },
        { day: 'Thu', focus: 'Gentle Mobility (10m)', detail: 'Thoracic rotations, cat-cow, 90/90 hip flow' },
        { day: 'Fri', focus: `Full-Body Strength (${timeAvailable}m)`, detail: 'Chair squats, step jacks, suitcase carries' },
        { day: 'Sat', focus: 'Outdoor Movement (30m)', detail: 'Scenic nature stroll or social walk' },
        { day: 'Sun', focus: 'Full Biological Rest', detail: 'Warm bath, reading, nervous system down-regulation' },
      ];
    } else if (goal === 'energy') {
      return [
        { day: 'Mon', focus: `Post-Meal Walks (3x 10m)`, detail: 'Regulate blood sugar spikes immediately after meals' },
        { day: 'Tue', focus: `Joint Mobility Flow (${timeAvailable}m)`, detail: 'Floor living, hip openers, gentle neck stretches' },
        { day: 'Wed', focus: `Brisk Cardio Walk (${timeAvailable}m)`, detail: 'Zone 2 steady-state pace (110 steps/min)' },
        { day: 'Thu', focus: `Exercise Snacks (5x 2m)`, detail: 'Air squats and desk push-ups throughout workday' },
        { day: 'Fri', focus: `Low-Impact Circuit (${timeAvailable}m)`, detail: 'Step jacks, skater taps, inchworm walkouts' },
        { day: 'Sat', focus: 'Long Leisure Walk (45m)', detail: 'Optic flow in green space with sunlight' },
        { day: 'Sun', focus: 'Rest & Circadian Reset', detail: 'Morning sunlight exposure + screen-free evening' },
      ];
    } else {
      return [
        { day: 'Mon', focus: 'Micro Habit: 5m Movement', detail: 'Perform 10 squats right after morning coffee' },
        { day: 'Tue', focus: 'Micro Habit: 5m Movement', detail: 'Perform 30s plank right before evening shower' },
        { day: 'Wed', focus: `Beginner Circuit (${timeAvailable}m)`, detail: 'Gentle living room sequence with long rest periods' },
        { day: 'Thu', focus: 'Never Miss Twice Protection', detail: 'If busy, commit strictly to 10 arm circles & deep breaths' },
        { day: 'Fri', focus: `Beginner Circuit (${timeAvailable}m)`, detail: 'Chair squats and door rows at easy tempo' },
        { day: 'Sat', focus: 'Weekend Habit Celebration', detail: 'Walk to a local market or park with a friend' },
        { day: 'Sun', focus: 'Weekly Cadence Reflection', detail: 'Review what felt energizing and prepare gear for Monday' },
      ];
    }
  };

  const schedule = generateSchedule();

  const handleCopy = () => {
    const text = schedule.map((s) => `${s.day}: ${s.focus} - ${s.detail}`).join('\n');
    navigator.clipboard.writeText(`My Vigour & Bloom 7-Day Plan:\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-stone-50 border border-stone-200/90 rounded-2xl p-6 sm:p-8 my-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/80">
        <div>
          <div className="text-xs uppercase tracking-widest font-medium text-emerald-800 mb-1">
            Interactive Physiology Tool
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900">
            Personal Movement Cadence Planner
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Configure your lifestyle variables to construct a friction-free 7-day movement rhythm.
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="self-start sm:self-center px-3.5 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap cursor-pointer"
        >
          {copied ? 'Copied Plan!' : 'Copy 7-Day Schedule'}
        </button>
      </div>

      {/* Selector Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-6 border-b border-stone-200/80">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
            Primary Target
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'strength', label: 'Foundational Strength' },
              { id: 'energy', label: 'All-Day Energy & Mobility' },
              { id: 'habits', label: 'Consistent Habit Building' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setGoal(item.id as any)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  goal === item.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
            Time Budget Per Session
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              { time: 15, label: '15 Minutes (Micro-Session)' },
              { time: 25, label: '25 Minutes (Recommended)' },
              { time: 40, label: '40 Minutes (Comprehensive)' },
            ].map((item) => (
              <button
                key={item.time}
                onClick={() => setTimeAvailable(item.time)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  timeAvailable === item.time
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
            Current Movement State
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'day1', label: 'Absolute Beginner (Starting out)' },
              { id: 'restarting', label: 'Restarting after long break' },
              { id: 'intermediate', label: 'Active but craving structure' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setLevel(item.id as any)}
                className={`text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  level === item.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Schedule Grid */}
      <div className="pt-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700 mb-3 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-emerald-800" />
          <span>Recommended Weekly Cadence</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
          {schedule.map((slot) => (
            <div
              key={slot.day}
              className="bg-white border border-stone-200/90 rounded-xl p-3.5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest">
                  {slot.day}
                </span>
                <p className="text-xs font-semibold text-stone-900 mt-1 leading-snug">
                  {slot.focus}
                </p>
              </div>
              <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
                {slot.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
