import React, { useState } from 'react';
import { Article } from '../types/blog';
import { Bookmark, Clock, ArrowUpRight, Dumbbell } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (slug: string, e: React.MouseEvent) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  featured = false,
}) => {
  const [imageError, setImageError] = useState(false);

  if (featured) {
    return (
      <article
        onClick={() => onSelect(article.slug)}
        className="group relative bg-white border border-stone-200/80 rounded-2xl overflow-hidden hover:border-stone-300 transition-all duration-300 hover:shadow-lg cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0"
      >
        <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[320px] overflow-hidden bg-stone-100">
          {!imageError ? (
            <img
              src={article.heroImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-6">
              <Dumbbell className="w-12 h-12 stroke-[1.5] mb-2 text-stone-400" />
              <span className="text-xs uppercase tracking-wider font-medium text-stone-500">
                Editorial Field Guide
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
          <div>
            {/* Zero-Pill Metadata */}
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-3">
              <span className="text-emerald-800 tracking-wide">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{article.publishedDate}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 group-hover:text-emerald-900 transition-colors leading-tight mb-3">
              {article.title}
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-3 mb-6">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold flex items-center justify-center border border-stone-200">
                {article.author.avatarText}
              </div>
              <span className="text-xs font-medium text-stone-700">{article.author.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => onToggleBookmark(article.slug, e)}
                aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark guide'}
                className="p-2 text-stone-400 hover:text-emerald-800 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer"
              >
                <Bookmark
                  className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-800 text-emerald-800' : ''}`}
                />
              </button>
              <div className="flex items-center text-xs font-medium text-emerald-800 group-hover:translate-x-0.5 transition-transform">
                <span>Read guide</span>
                <ArrowUpRight className="w-4 h-4 ml-0.5" />
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect(article.slug)}
      className="group bg-white border border-stone-200/80 rounded-xl overflow-hidden hover:border-stone-300 transition-all duration-300 hover:shadow-md cursor-pointer flex flex-col h-full"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
        {!imageError ? (
          <img
            src={article.heroImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-4">
            <Dumbbell className="w-8 h-8 stroke-[1.5] mb-1 text-stone-400" />
            <span className="text-[10px] uppercase tracking-wider font-medium text-stone-500">
              Vigour & Bloom
            </span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
        <div>
          {/* Zero-Pill Metadata */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-2.5">
            <span className="text-emerald-800 tracking-wide">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug mb-2.5">
            {article.title}
          </h3>

          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-500">{article.author.name}</span>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => onToggleBookmark(article.slug, e)}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark guide'}
              className="p-1.5 text-stone-400 hover:text-emerald-800 hover:bg-stone-50 rounded-md transition-colors cursor-pointer"
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-emerald-800 text-emerald-800' : ''}`}
              />
            </button>
            <span className="text-xs font-medium text-emerald-800 flex items-center group-hover:translate-x-0.5 transition-transform">
              Read <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
