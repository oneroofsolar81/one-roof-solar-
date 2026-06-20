import React, { useEffect } from 'react';
import { FadeIn } from './ui/FadeIn';

export function GoogleReviews() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://elfsightcdn.com/platform.js"]')) {
      const script = document.createElement('script');
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-slate-200 opacity-50 pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <FadeIn delay={0.1}>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-4">Customer Reviews</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              See what our community is saying about our solar solutions and service.
            </p>
          </div>
          <div className="w-full text-center text-slate-500">
            <div className="elfsight-app-97fdc0ab-99c9-4ba4-9322-5d5c0458539a" data-elfsight-app-lazy></div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
