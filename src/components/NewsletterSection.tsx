import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    try {
      localStorage.setItem('vb_newsletter_subscribed', email);
    } catch {}
  };

  return (
    <section className="bg-stone-100/70 border border-stone-200 rounded-2xl p-8 sm:p-12 my-16 max-w-5xl mx-auto text-center">
      <div className="max-w-xl mx-auto">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-800 text-white mb-4">
          <Mail className="w-5 h-5" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-2">
          The Weekly Cadence Dispatch
        </h3>
        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
          Every Sunday morning, we deliver one evidence-backed fitness principle, one simple living room workout, and one mindful lifestyle tip. No spam, ever.
        </p>

        {subscribed ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-center gap-2 text-emerald-800 text-xs sm:text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Welcome to the dispatch! Your Sunday reading is confirmed.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-800"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              Subscribe Free
            </button>
          </form>
        )}

        {error && <p className="text-rose-600 text-xs mt-2">{error}</p>}

        <p className="text-[11px] text-stone-400 mt-4">
          Join over 14,000 mindful movers. Unsubscribe with one click anytime.
        </p>
      </div>
    </section>
  );
};
