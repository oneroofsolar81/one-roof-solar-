import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { Button } from "@/src/components/ui/Button";

export const FaqItem = ({ q, a, index, isOpen, onClick }: { q: string; a: string; index: number; isOpen: boolean; onClick: () => void }) => {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-brand-200"
          : "bg-white border-slate-100 hover:border-brand-200 hover:shadow-md"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full text-left px-6 py-5 sm:p-6 flex items-start sm:items-center justify-between focus:outline-none gap-4"
      >
        <div className="flex items-start sm:items-center gap-4">
          <div
            className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              isOpen
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                : "bg-slate-50 text-slate-500 border border-slate-200"
            }`}
          >
            0{index + 1}
          </div>
          <h3
            className={`text-base sm:text-lg font-bold leading-tight transition-colors ${
              isOpen ? "text-brand-600" : "text-slate-900"
            }`}
          >
            {q}
          </h3>
        </div>
        <div
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isOpen
              ? "border-brand-500 bg-brand-50 text-brand-500 rotate-180"
              : "border-slate-200 text-slate-400 bg-white"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 px-6 sm:px-6 ${
          isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-slate-600 leading-relaxed font-medium pl-12 sm:pl-14 text-base sm:text-lg">
          {a}
        </p>
      </div>
    </div>
  );
};

export function FaqSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-100/30 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-100/30 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <FadeIn>
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">Support</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
                Common <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500">Inquiries</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium mb-8 max-w-md">
                Everything you need to know about making the switch to solar. Can't find the answer you're looking for?
              </p>
              <div className="mt-8">
                <Link to="/contact">
                  <Button className="rounded-full shadow-lg hover:-translate-y-1 transition-all h-14 px-8 font-bold">
                    Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: FAQs */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <FaqItem 
                  q={faq.q} 
                  a={faq.a} 
                  index={i} 
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </FadeIn>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
