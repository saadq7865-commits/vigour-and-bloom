import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES, CATEGORIES } from './data/articles';
import { Article, Category } from './types/blog';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AboutModal } from './components/AboutModal';
import { NewsletterSection } from './components/NewsletterSection';
import { InteractiveMovementTool } from './components/InteractiveMovementTool';
import {
  Search,
  Sparkles,
  Bookmark,
  CheckCircle2,
  Compass,
  ArrowRight,
  TrendingUp,
  SlidersHorizontal,
  X
} from 'lucide-react';

export default function App() {
  // Navigation & routing state synced with URL hash
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookmarksDrawerOpen, setBookmarksDrawerOpen] = useState<boolean>(false);
  const [aboutModalOpen, setAboutModalOpen] = useState<boolean>(false);

  // Bookmarks state in localStorage
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vb_saved_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync with browser hash on initial mount and popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#article/')) {
        const slug = hash.replace('#article/', '');
        const found = ARTICLES.find((a) => a.slug === slug);
        if (found) {
          setActiveSlug(slug);
        } else {
          setActiveSlug(null);
        }
      } else {
        setActiveSlug(null);
      }
    };

    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const handleSelectArticle = (slug: string) => {
    window.location.hash = `#article/${slug}`;
    setActiveSlug(slug);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleGoHome = () => {
    window.location.hash = '';
    setActiveSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleBookmark = (slug: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const updated = bookmarkedSlugs.includes(slug)
      ? bookmarkedSlugs.filter((s) => s !== slug)
      : [...bookmarkedSlugs, slug];
    setBookmarkedSlugs(updated);
    try {
      localStorage.setItem('vb_saved_bookmarks', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveBookmark = (slug: string) => {
    const updated = bookmarkedSlugs.filter((s) => s !== slug);
    setBookmarkedSlugs(updated);
    try {
      localStorage.setItem('vb_saved_bookmarks', JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedSlugs([]);
    try {
      localStorage.removeItem('vb_saved_bookmarks');
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.excerpt.toLowerCase().includes(q) ||
        article.keyTakeaways.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Current active article if viewing detail
  const currentArticle = useMemo(() => {
    if (!activeSlug) return null;
    return ARTICLES.find((a) => a.slug === activeSlug) || null;
  }, [activeSlug]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header
        currentCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenBookmarks={() => setBookmarksDrawerOpen(true)}
        onOpenAbout={() => setAboutModalOpen(true)}
        onGoHome={handleGoHome}
        bookmarkedCount={bookmarkedSlugs.length}
      />

      {currentArticle ? (
        /* Dedicated Article Page */
        <ArticleDetail
          article={currentArticle}
          onBack={handleGoHome}
          onSelectArticle={handleSelectArticle}
          isBookmarked={bookmarkedSlugs.includes(currentArticle.slug)}
          onToggleBookmark={(slug) => toggleBookmark(slug)}
        />
      ) : (
        /* Editorial Homepage */
        <main className="flex-1">
          {/* Institutional Utility Ribbon */}
          <div className="border-b border-stone-200/70 bg-[#F5F2EB]/60 py-2.5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-600 font-medium tracking-wider uppercase gap-1 text-center sm:text-left">
              <span>Vol. III · Autumn 2026 Edition</span>
              <div className="flex items-center gap-3">
                <span>10 In-Depth Field Guides</span>
                <span aria-hidden="true">·</span>
                <span>Evidence-Backed Physiology</span>
                <span aria-hidden="true">·</span>
                <span>Zero Fad Diets</span>
              </div>
            </div>
          </div>

          {/* Hero Masthead & Introductory Statement */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 sm:pt-16 sm:pb-12 text-center max-w-3xl">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-stone-900 leading-[1.12] mb-5 text-balance">
              The Architecture of Mindful Movement
            </h1>
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              A curated publication dedicated to sustainable fitness routines, functional strength at home, restorative sleep, and habit psychology designed for real life.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Beginner Progressive Protocols</span>
              </span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Living Room Circuits</span>
              </span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Daily Habit Automation</span>
              </span>
            </div>
          </section>

          {/* Featured Lead Story (Article #1) */}
          {selectedCategory === 'All' && !searchQuery && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                  Lead Publication Story
                </span>
                <span className="text-xs text-stone-500">Essential Reading</span>
              </div>
              <ArticleCard
                article={ARTICLES[0]}
                onSelect={handleSelectArticle}
                isBookmarked={bookmarkedSlugs.includes(ARTICLES[0].slug)}
                onToggleBookmark={toggleBookmark}
                featured={true}
              />
            </section>
          )}

          {/* Controls & Filter Zone: Clean functional Segmented Buttons & Search */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Search Bar with instant search and clear affordance */}
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search guides (e.g., walking, habits, workouts, equipment)..."
                    className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 focus:bg-white transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Article count indicator */}
                <div className="text-xs text-stone-500 font-medium self-end md:self-center">
                  Showing <span className="font-semibold text-stone-900">{filteredArticles.length}</span> of {ARTICLES.length} curated guides
                </div>
              </div>

              {/* Functional Segmented Controls (Interactive filter buttons) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Article Grid of All 10 Guides */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            {filteredArticles.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center max-w-lg mx-auto">
                <Compass className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-medium text-stone-900 mb-1">
                  No matching guides found
                </h3>
                <p className="text-xs text-stone-500 mb-4">
                  We could not find any articles matching "{searchQuery}". Try searching for terms like "exercise", "rest", "habits", or "morning".
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-4 py-2 text-xs font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredArticles.map((article, index) => (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    onSelect={handleSelectArticle}
                    isBookmarked={bookmarkedSlugs.includes(article.slug)}
                    onToggleBookmark={toggleBookmark}
                    featured={false}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Interactive Cadence Planner on Homepage */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <InteractiveMovementTool />
          </section>

          {/* Curated Editorial Standards Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
            <div className="border border-stone-200/90 bg-white rounded-2xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  01. The Evidence Standard
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                  Rooted in Exercise Physiology
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every recommendation is checked against peer-reviewed exercise science, sports medicine guidelines, and circadian biology.
                </p>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  02. Zero Bro-Science
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                  Dismantling Toxic Gym Dogma
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We discard extreme soreness badges, painful supplements, and punitive 5:00 AM culture in favor of genuine long-term biological resilience.
                </p>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                  03. The Habit Architecture
                </div>
                <h3 className="font-serif text-lg font-medium text-stone-900 mb-2">
                  Engineered for Frictionless Living
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We design movement habits that survive 60-hour workweeks, family emergencies, and low-energy evenings without guilt.
                </p>
              </div>
            </div>
          </section>

          {/* Newsletter Subscribe Section */}
          <NewsletterSection />
        </main>
      )}

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={bookmarksDrawerOpen}
        onClose={() => setBookmarksDrawerOpen(false)}
        bookmarkedSlugs={bookmarkedSlugs}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearAllBookmarks}
      />

      {/* Philosophy / About Modal */}
      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />

      <Footer
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        onOpenAbout={() => setAboutModalOpen(true)}
        onGoHome={handleGoHome}
        onSelectArticle={handleSelectArticle}
      />
    </div>
  );
}
