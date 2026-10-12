import React, { useEffect, useState } from 'react';
import { Bookmark, Menu, X, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenBookmarks: () => void;
  onOpenAbout: () => void;
  onGoHome: () => void;
  bookmarkedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectCategory,
  onOpenBookmarks,
  onOpenAbout,
  onGoHome,
  bookmarkedCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-stone-200/80 shadow-xs'
            : 'bg-[#FAF8F5] border-stone-200/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar Contract: 3 zones separated by gap-8 */}
          <div className="flex items-center justify-between gap-8 h-18">
            {/* Zone 1: Brand Wordmark (Single text element in display face) */}
            <button
              onClick={onGoHome}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="font-serif text-2xl tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0">
                Vigour & Bloom
              </span>
            </button>

            {/* Zone 2: 4-5 Concise Single-Line Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
              <button
                onClick={onGoHome}
                className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Journal
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Beginner Fitness');
                  onGoHome();
                }}
                className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Routines
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Habit & Mindset');
                  onGoHome();
                }}
                className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Mindset
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Recovery & Balance');
                  onGoHome();
                }}
                className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Recovery
              </button>
              <button
                onClick={onOpenAbout}
                className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Philosophy
              </button>
            </nav>

            {/* Zone 3: 1 Primary Action & Utilities */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenBookmarks}
                aria-label={`Saved guides (${bookmarkedCount})`}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100/80 hover:bg-stone-200/70 rounded-lg transition-colors cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-stone-600" />
                <span className="hidden sm:inline">Saved</span>
                {bookmarkedCount > 0 && (
                  <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-semibold bg-emerald-800 text-white rounded-full">
                    {bookmarkedCount}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenAbout}
                className="hidden lg:inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                About The Journal
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation"
                className="md:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-stone-900/40 backdrop-blur-xs flex flex-col justify-start">
          <div className="bg-[#FAF8F5] border-b border-stone-200 p-5 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <span className="font-serif text-xl font-medium text-stone-900">Vigour & Bloom</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-stone-600 hover:text-stone-900 cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-2 py-4 text-base font-medium text-stone-700">
              <button
                onClick={() => {
                  onGoHome();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-md hover:bg-stone-100 cursor-pointer"
              >
                All Articles
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Beginner Fitness');
                  onGoHome();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-md hover:bg-stone-100 cursor-pointer"
              >
                Beginner Fitness
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Home Workouts');
                  onGoHome();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-md hover:bg-stone-100 cursor-pointer"
              >
                Home Workouts
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Habit & Mindset');
                  onGoHome();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-md hover:bg-stone-100 cursor-pointer"
              >
                Habits & Motivation
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Daily Movement');
                  onGoHome();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-md hover:bg-stone-100 cursor-pointer"
              >
                Walking & Active Living
              </button>
              <button
                onClick={() => {
                  onSelectCategory('Recovery & Balance');
                  onGoHome();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-md hover:bg-stone-100 cursor-pointer"
              >
                Recovery & Rest
              </button>
              <button
                onClick={() => {
                  onOpenAbout();
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 px-3 rounded-md hover:bg-stone-100 cursor-pointer"
              >
                Editorial Philosophy
              </button>
            </nav>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenBookmarks();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium text-stone-800 cursor-pointer"
              >
                <Bookmark className="w-4 h-4 text-emerald-800" />
                <span>Saved Reading List ({bookmarkedCount})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
