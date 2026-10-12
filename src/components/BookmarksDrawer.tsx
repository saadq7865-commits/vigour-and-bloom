import React from 'react';
import { Article } from '../types/blog';
import { X, Bookmark, ArrowRight, Trash2 } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedSlugs: string[];
  articles: Article[];
  onSelectArticle: (slug: string) => void;
  onRemoveBookmark: (slug: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedSlugs,
  articles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const savedArticles = articles.filter((a) => bookmarkedSlugs.includes(a.slug));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-stone-200 p-6 flex flex-col shadow-2xl">
          <div className="flex items-center justify-between pb-5 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-emerald-800" />
              <h2 className="font-serif text-lg font-medium text-stone-900">
                Saved Reading List
              </h2>
              <span className="text-xs text-stone-500">({savedArticles.length})</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {savedArticles.length === 0 ? (
              <div className="text-center py-16 px-4">
                <Bookmark className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-stone-700">No saved guides yet</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Click the bookmark icon on any article card or guide header to save it for offline reading reference.
                </p>
              </div>
            ) : (
              savedArticles.map((art) => (
                <div
                  key={art.slug}
                  className="bg-white border border-stone-200 rounded-xl p-4 transition-all hover:border-stone-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                      <span className="text-emerald-800 font-medium">{art.category}</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h4
                      onClick={() => {
                        onSelectArticle(art.slug);
                        onClose();
                      }}
                      className="font-serif text-sm font-medium text-stone-900 hover:text-emerald-900 cursor-pointer line-clamp-2 leading-snug"
                    >
                      {art.title}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-100 text-xs">
                    <button
                      onClick={() => onRemoveBookmark(art.slug)}
                      className="text-stone-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>

                    <button
                      onClick={() => {
                        onSelectArticle(art.slug);
                        onClose();
                      }}
                      className="font-medium text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {savedArticles.length > 0 && (
            <div className="pt-4 border-t border-stone-200 flex justify-between items-center text-xs">
              <button
                onClick={onClearAll}
                className="text-stone-500 hover:text-rose-600 cursor-pointer"
              >
                Clear all saved
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
