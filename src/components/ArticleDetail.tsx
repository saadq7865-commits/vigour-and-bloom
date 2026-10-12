import React, { useState, useEffect } from 'react';
import { Article } from '../types/blog';
import { ARTICLES } from '../data/articles';
import { ReadingProgressBar } from './ReadingProgressBar';
import { InteractiveMovementTool } from './InteractiveMovementTool';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  CheckSquare,
  Square,
  MessageSquare,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Type,
  ChevronRight,
  Dumbbell
} from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [largeText, setLargeText] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Interactive Checklist State (saved in localStorage)
  const [completedItems, setCompletedItems] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(`checklist_${article.slug}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // User Reflection Notes State (saved in localStorage)
  const [notes, setNotes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(`notes_${article.slug}`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newNote, setNewNote] = useState('');

  // Scroll to top when article loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setImageError(false);
  }, [article.slug]);

  const toggleChecklist = (index: number) => {
    const updated = completedItems.includes(index)
      ? completedItems.filter((i) => i !== index)
      : [...completedItems, index];
    setCompletedItems(updated);
    try {
      localStorage.setItem(`checklist_${article.slug}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const updated = [newNote.trim(), ...notes];
    setNotes(updated);
    try {
      localStorage.setItem(`notes_${article.slug}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setNewNote('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  // Find related articles
  const relatedArticles = ARTICLES.filter((a) =>
    article.relatedArticleSlugs.includes(a.slug)
  );

  return (
    <article className="min-h-screen bg-[#FAF8F5] pb-24">
      <ReadingProgressBar />

      {/* Top Utility Ribbon */}
      <div className="bg-[#FAF8F5] border-b border-stone-200/80 sticky top-18 z-30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Journal</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLargeText(!largeText)}
              title="Toggle reading font size"
              className={`p-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                largeText
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">{largeText ? 'Standard' : 'Larger text'}</span>
            </button>

            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              title="Listen to audio overview"
              className={`p-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                isPlayingAudio
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              {isPlayingAudio ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="text-[11px] hidden sm:inline">{isPlayingAudio ? 'Pause Narration' : 'Listen'}</span>
            </button>

            <button
              onClick={() => onToggleBookmark(article.slug)}
              className={`p-1.5 rounded-md text-xs font-medium border transition-colors cursor-pointer flex items-center gap-1 ${
                isBookmarked
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-300'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-emerald-800' : ''}`} />
              <span className="text-[11px] hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 rounded-md text-xs font-medium bg-white text-stone-700 border border-stone-200 hover:border-stone-300 transition-colors cursor-pointer flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">{copiedShare ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Audio Player Bar */}
      {isPlayingAudio && (
        <div className="bg-emerald-950 text-white px-4 py-2.5 text-xs text-center border-b border-emerald-900 flex items-center justify-center gap-3">
          <span className="animate-pulse w-2 h-2 rounded-full bg-emerald-400" />
          <span>Now Playing: Synthesized Audio Overview for {article.title}</span>
          <button
            onClick={() => setIsPlayingAudio(false)}
            className="underline ml-2 cursor-pointer text-emerald-200 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Article Header Container */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8">
        {/* Zero-Pill Metadata */}
        <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-4">
          <span className="text-emerald-800 tracking-wide font-semibold">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>Published {article.publishedDate}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-stone-900 leading-tight mb-4 text-balance">
          {article.title}
        </h1>

        <p className="text-stone-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl">
          {article.subtitle}
        </p>

        {/* Author Line */}
        <div className="flex items-center gap-3 pt-6 border-t border-stone-200">
          <div className="w-10 h-10 rounded-full bg-stone-200 text-stone-800 font-bold text-sm flex items-center justify-center border border-stone-300">
            {article.author.avatarText}
          </div>
          <div>
            <div className="text-sm font-semibold text-stone-900">{article.author.name}</div>
            <div className="text-xs text-stone-500">{article.author.role}</div>
          </div>
        </div>
      </header>

      {/* Article Hero Media with Zero-Broken-Image Policy */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="rounded-2xl overflow-hidden border border-stone-200/90 shadow-xs bg-stone-100 aspect-[16/9]">
          {!imageError ? (
            <img
              src={article.heroImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-8">
              <Dumbbell className="w-12 h-12 stroke-[1.5] mb-2 text-stone-400" />
              <span className="text-xs uppercase tracking-wider font-medium text-stone-500">
                Editorial Field Guide Image
              </span>
            </div>
          )}
        </div>
        <p className="text-xs font-serif text-stone-500 italic mt-2.5 px-1">
          {article.imageCaption}
        </p>
      </div>

      {/* Main Content Layout with Asymmetric Sidebar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Table of Contents Column */}
        <aside className="lg:col-span-4 order-2 lg:order-1">
          <div className="sticky top-32 space-y-6">
            <div className="bg-white border border-stone-200/90 rounded-xl p-5 shadow-2xs">
              <h3 className="text-xs uppercase tracking-wider font-bold text-stone-900 mb-3 pb-2 border-b border-stone-100">
                Guide Chapters
              </h3>
              <nav className="space-y-2">
                {article.sections.map((section, idx) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block text-xs font-medium text-stone-600 hover:text-emerald-800 transition-colors leading-snug py-1"
                  >
                    {section.heading}
                  </a>
                ))}
                <a
                  href="#checklist"
                  className="block text-xs font-medium text-emerald-800 hover:text-emerald-950 transition-colors leading-snug py-1 pt-2 border-t border-stone-100"
                >
                  Practical Checklist
                </a>
              </nav>
            </div>

            {/* Quick Summary Pill-Free Box */}
            <div className="bg-stone-100/80 border border-stone-200/80 rounded-xl p-5">
              <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block mb-2">
                Quick Summary
              </span>
              <p className="text-xs text-stone-600 leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          </div>
        </aside>

        {/* Narrative Prose Column (65-75ch Measure) */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-10">
          {/* Key Takeaways Box (Clean hairline border, no thick left border!) */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 sm:p-7 shadow-2xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
              Core Principles At A Glance
            </h2>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deep Informative Article Sections */}
          <div className={`space-y-12 ${largeText ? 'text-lg leading-loose' : 'text-base leading-relaxed'}`}>
            {article.sections.map((section, sectionIdx) => (
              <section key={section.id} id={section.id} className="scroll-mt-36">
                <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mb-4 pb-2 border-b border-stone-200/60">
                  {section.heading}
                </h2>

                <div className="space-y-4 text-stone-700">
                  {section.content.map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      className={
                        sectionIdx === 0 && pIdx === 0
                          ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900 leading-relaxed'
                          : 'leading-relaxed'
                      }
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Callout Box (Subtle hairline border, light stone background) */}
                {section.callout && (
                  <div className="my-6 p-5 sm:p-6 bg-stone-50 border border-stone-200 rounded-xl">
                    <div className="text-xs uppercase tracking-wider font-bold text-stone-800 mb-1.5">
                      {section.callout.title}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {section.callout.text}
                    </p>
                  </div>
                )}

                {/* Informative Table if present */}
                {section.table && (
                  <div className="my-6 overflow-x-auto rounded-xl border border-stone-200 bg-white">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-stone-50 border-b border-stone-200">
                        <tr>
                          {section.table.headers.map((th, hIdx) => (
                            <th key={hIdx} className="p-3.5 font-semibold text-stone-900">
                              {th}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {section.table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-stone-50/50 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`p-3.5 text-stone-700 ${
                                  cIdx === 0 ? 'font-medium text-stone-900' : ''
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Interactive Tool Placement */}
          <InteractiveMovementTool />

          {/* Practical Implementation Checklist */}
          <div id="checklist" className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 scroll-mt-36">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 block">
                  Action Steps
                </span>
                <h3 className="font-serif text-xl font-medium text-stone-900">
                  {article.practicalChecklist.title}
                </h3>
              </div>
              <div className="text-xs text-stone-500 font-medium">
                {completedItems.length} of {article.practicalChecklist.items.length} completed
              </div>
            </div>

            <div className="space-y-3">
              {article.practicalChecklist.items.map((item, idx) => {
                const isChecked = completedItems.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleChecklist(idx)}
                    className="w-full text-left flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-stone-50"
                    style={{
                      borderColor: isChecked ? '#a7f3d0' : '#e7e5e4',
                      backgroundColor: isChecked ? '#f0fdf4' : 'transparent',
                    }}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-800 mt-0.5 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                    )}
                    <span
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isChecked ? 'line-through text-stone-400' : 'text-stone-800 font-medium'
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reader Reflections & Notes */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8">
            <h3 className="font-serif text-xl font-medium text-stone-900 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-800" />
              <span>Personal Reflection & Action Notes</span>
            </h3>
            <p className="text-xs text-stone-600 mb-5">
              Jot down thoughts or key takeaways from this guide. Your notes are stored securely on your browser.
            </p>

            <form onSubmit={handleAddNote} className="flex gap-2 mb-6">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write a personal note or goal (e.g. 'Start with 15m chair squats on Monday')..."
                className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Save Note</span>
              </button>
            </form>

            {notes.length > 0 && (
              <div className="space-y-2.5">
                {notes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-stone-200/80 rounded-lg text-xs text-stone-700 leading-relaxed flex items-center justify-between"
                  >
                    <span>{note}</span>
                    <button
                      onClick={() => {
                        const updated = notes.filter((_, i) => i !== idx);
                        setNotes(updated);
                        localStorage.setItem(`notes_${article.slug}`, JSON.stringify(updated));
                      }}
                      className="text-[11px] text-stone-400 hover:text-rose-600 ml-3 cursor-pointer shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Author Bio Box */}
          <div className="pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-stone-200 text-stone-800 text-base font-bold flex items-center justify-center border border-stone-300 shrink-0">
              {article.author.avatarText}
            </div>
            <div>
              <div className="text-sm font-bold text-stone-900">{article.author.name}</div>
              <div className="text-xs text-emerald-800 font-medium mb-1.5">{article.author.role}</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Dedicated to translating exercise physiology and behavioral science into practical, low-friction habits for modern professionals and beginners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Reading Row */}
      {relatedArticles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 mt-20 border-t border-stone-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 block mb-1">
                Continue Exploring
              </span>
              <h2 className="font-serif text-2xl font-medium text-stone-900">
                Related Editorial Guides
              </h2>
            </div>
            <button
              onClick={onBack}
              className="text-xs font-medium text-stone-600 hover:text-stone-900 flex items-center gap-1 cursor-pointer"
            >
              <span>View All 10 Guides</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.slug}
                onClick={() => onSelectArticle(rel.slug)}
                className="group bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-300 transition-all hover:shadow-sm cursor-pointer flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden bg-stone-100">
                  <img
                    src={rel.heroImage}
                    alt={rel.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1.5">
                      <span className="text-emerald-800">{rel.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{rel.readTime}</span>
                    </div>
                    <h4 className="font-serif text-base font-medium text-stone-900 group-hover:text-emerald-900 leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="text-xs text-emerald-800 font-medium pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
                    <span>Read guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
