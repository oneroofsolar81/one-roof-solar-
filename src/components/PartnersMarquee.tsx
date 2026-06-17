export function PartnersMarquee() {
  return (
    <section className="py-12 border-b border-slate-200 bg-white overflow-hidden relative">
      {/* Gradients to fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      {/* Marquee Container */}
      <div className="flex w-fit animate-marquee hover:[animation-play-state:paused] items-center">
        {/* We render the original set and duplicate it immediately for seamless looping */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-16 md:gap-24 items-center justify-around flex-shrink-0 px-8 w-max">
            <img referrerPolicy="no-referrer" loading="lazy" src="https://i.postimg.cc/VsW-wzvGJ/Chat-GPT-Image-Jun-5-2026-11-54-38-PM.png" alt="Partner 1" className="h-20 md:h-24 w-auto object-contain mix-blend-multiply" />
            <img referrerPolicy="no-referrer" loading="lazy" src="https://i.postimg.cc/tg4ZN8sH/Chat-GPT-Image-Jun-6-2026-01-38-27-AM.png" alt="Partner 2" className="h-20 md:h-24 w-auto object-contain mix-blend-multiply" />
            <img referrerPolicy="no-referrer" loading="lazy" src="https://i.postimg.cc/wB84tcMF/Chat-GPT-Image-Jun-6-2026-01-45-19-AM.png" alt="Partner 3" className="h-20 md:h-24 w-auto object-contain mix-blend-multiply" />
            <img referrerPolicy="no-referrer" loading="lazy" src="https://i.postimg.cc/SsVgtBrP/Chat-GPT-Image-Jun-6-2026-01-51-16-AM.png" alt="Partner 4" className="h-20 md:h-24 w-auto object-contain mix-blend-multiply" />
            <img referrerPolicy="no-referrer" loading="lazy" src="https://i.postimg.cc/tJYNvY7C/Chat-GPT-Image-Jun-6-2026-02-08-13-AM.png" alt="Partner 5" className="h-20 md:h-24 w-auto object-contain mix-blend-multiply" />
          </div>
        ))}
      </div>
    </section>
  );
}
