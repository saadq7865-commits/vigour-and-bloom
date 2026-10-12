import React from 'react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onOpenAbout: () => void;
  onGoHome: () => void;
  onSelectArticle: (slug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenAbout,
  onGoHome,
  onSelectArticle,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <span className="font-serif text-xl font-medium text-white block">
              Vigour & Bloom
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              An independent fitness and lifestyle journal dedicated to evidence-backed movement, restorative daily rhythms, and lifelong vitality.
            </p>
          </div>

          {/* Quick Pillars */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-3">
              Editorial Pillars
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Beginner Fitness');
                    onGoHome();
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Beginner Training Protocols
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Home Workouts');
                    onGoHome();
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home Workouts & Gear
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Habit & Mindset');
                    onGoHome();
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Habit Architecture & Mindset
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Daily Movement');
                    onGoHome();
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Walking & Non-Exercise Activity
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectCategory('Recovery & Balance');
                    onGoHome();
                  }}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Rest, Sleep & Life Pacing
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Guides */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-3">
              Essential Guides
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectArticle('beginners-guide-starting-fitness-routine')}
                  className="hover:text-white transition-colors cursor-pointer text-left line-clamp-1"
                >
                  Beginner's Guide to Starting a Routine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArticle('best-home-workouts-for-beginners')}
                  className="hover:text-white transition-colors cursor-pointer text-left line-clamp-1"
                >
                  Best Home Workouts for Beginners
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArticle('how-to-build-a-consistent-exercise-habit')}
                  className="hover:text-white transition-colors cursor-pointer text-left line-clamp-1"
                >
                  How to Build a Consistent Exercise Habit
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArticle('walking-for-fitness-a-beginners-guide')}
                  className="hover:text-white transition-colors cursor-pointer text-left line-clamp-1"
                >
                  Walking for Fitness: A Beginner's Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectArticle('how-to-balance-exercise-rest-and-daily-life')}
                  className="hover:text-white transition-colors cursor-pointer text-left line-clamp-1"
                >
                  How to Balance Exercise, Rest & Life
                </button>
              </li>
            </ul>
          </div>

          {/* Publication Info */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-white mb-3">
              Journal Standards
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              All guides are grounded in peer-reviewed exercise physiology and clinical habit research. We reject crash diets and unsafe training extremes.
            </p>
            <button
              onClick={onOpenAbout}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline cursor-pointer"
            >
              Read our full editorial charter
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Vigour & Bloom Journal. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <button onClick={onOpenAbout} className="hover:text-stone-300 cursor-pointer">
              About
            </button>
            <button onClick={onGoHome} className="hover:text-stone-300 cursor-pointer">
              Index of 10 Guides
            </button>
            <span className="text-stone-600">Updated Autumn 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
