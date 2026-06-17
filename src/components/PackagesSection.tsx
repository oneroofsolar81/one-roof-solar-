import React from 'react';
import { FadeIn } from "@/src/components/ui/FadeIn";
import { Link } from "react-router-dom";

export function PackagesSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#f4f7fb] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 text-brand-500">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M2 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="M12 20v2"/><path d="m19.07 19.07-1.41-1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="m8 15 4-4 4 4"/><path d="M12 11v8"/></svg>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 text-slate-800 font-black mb-3 text-[13px] uppercase tracking-widest">
              Designed for Darwin Homes
            </div>
            <h2 className="text-[40px] md:text-[48px] font-black tracking-tight text-[#223351] mb-12">
              Exclusive Solar & Battery Deals
            </h2>
          </FadeIn>
        </div>

        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
            {[
              {
                price: "$7",
                suitability: "Small-Medium Homes",
                capacity: "35%",
                title: "Smart Saver Package\n7.5kW Solar + 23.3kWh Battery",
                features: [
                  "Ideal for small to medium homes",
                  "7.5kW high-efficiency solar system",
                  "Large 23.3kWh battery storage",
                  "Reliable 5kW inverter included",
                  "Blackout protection included",
                  "Expandable battery capacity",
                  "Reduce power bills and grid reliance",
                  "Professional installation included"
                ],
                color: "green"
              },
              {
                price: "$9",
                suitability: "Larger Family Homes",
                capacity: "70%",
                title: "Family Power Package\n15.67kW Solar + 23.3kWh Battery",
                features: [
                  "Perfect for larger family homes",
                  "Ideal for EV charging and higher energy usage",
                  "Powerful 15.67kW solar system",
                  "23.3kWh battery for day & night power",
                  "Premium 10kW inverter included",
                  "Blackout protection included",
                  "Expandable battery storage option",
                  "Maximise savings and energy independence"
                ],
                color: "orange"
              },
              {
                price: "$10",
                suitability: "High-Energy Homes",
                capacity: "100%",
                title: "Ultimate Energy Package\n19.95kW Solar + 23.3kWh Battery",
                features: [
                  "Maximum power and savings",
                  "Huge 19.95kW solar system",
                  "Large 23.3kWh battery storage",
                  "High-performance 10kW inverter",
                  "Blackout protection included",
                  "Expandable battery capacity",
                  "Ideal for high-energy homes and businesses",
                  "Premium future-ready energy solution"
                ],
                color: "blue"
              }
            ].map((pack, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white rounded-[24px] px-6 pt-8 pb-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border-2 border-transparent flex flex-col h-full relative hover:shadow-[0_20px_40px_rgba(140,198,63,0.12)] hover:-translate-y-1 transition-all overflow-hidden group">
                  
                  {/* Badge and Save Ribbon Container */}
                  <div className="relative h-[320px] mb-6 mt-4 w-full">
                     <img referrerPolicy="no-referrer" src="https://i.postimg.cc/26GPFnnx/Chat-GPT-Image-Jun-7-2026-02-40-19-AM.webp" className="absolute inset-0 w-full h-full object-contain object-bottom transform group-hover:scale-[1.05] transition-transform duration-500 scale-[1.15]" alt="Solar Installation" loading="lazy" />
                     
                     {/* Price Ribbon */}
                     <div className="absolute -top-6 -right-6 z-30">
                        <div className="bg-brand-500 text-white w-[100px] h-[100px] flex flex-col items-center justify-center p-2 rounded-tr-[24px] rounded-bl-[32px] shadow-[0_8px_15px_rgba(140,198,63,0.25)]">
                           <span className="text-[10px] font-black uppercase tracking-wider mb-0.5 text-center leading-tight">From Only</span>
                           <span className="text-[32px] font-black leading-[1] tracking-tighter my-0.5">{pack.price}</span>
                           <span className="text-[10px] font-bold text-white/90">per day</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center mb-6 w-full h-[30px] rounded-sm overflow-hidden">
                    <div className="bg-brand-500 text-white text-[11px] font-black uppercase px-4 h-full flex items-center tracking-wider shrink-0 shadow-inner">
                      For: {pack.suitability}
                    </div>
                    <div className="h-full flex-grow bg-slate-100 relative">
                      <div className="h-full bg-brand-200" style={{ width: pack.capacity }}></div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 mb-6 px-1">
                    <div className="text-brand-500 shrink-0 mt-1">
                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                    </div>
                    <h3 className="text-[22px] md:text-[24px] font-black text-[#1a2b49] leading-[1.2] whitespace-pre-line tracking-tight">
                      {pack.title}
                    </h3>
                  </div>

                  <ul className="space-y-[12px] mb-8 flex-grow px-1">
                    {pack.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[14px] text-slate-600 font-medium leading-snug">
                        <svg className="w-[18px] h-[18px] text-brand-500 shrink-0 mt-[2px]" viewBox="0 0 20 20" fill="currentColor">
                           <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/contact" className="mt-auto flex items-center justify-center gap-2 w-full bg-brand-500 text-slate-900 font-bold uppercase tracking-widest text-[13px] py-4 rounded-xl hover:bg-brand-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-500/20 transition-all duration-300 group/link">
                    Get a Free Quote <svg className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <div className="text-center text-[10px] sm:text-xs text-slate-400 max-w-4xl mx-auto px-4 leading-relaxed pb-8">
          Displayed Solar & Battery Package pricing includes estimated Federal Government battery rebate deductions. Eligibility criteria apply. Rebates are subject to government approval, program availability, funding, and applicable terms and conditions. Final pricing may vary based on location, system size, installation requirements, and other site-specific factors.
        </div>

      </div>
    </section>
  );
}
