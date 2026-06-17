import { FadeIn } from "@/src/components/ui/FadeIn";
import { CheckCircle2, Shield, Users, Sun, PenTool as Tool } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { GoogleReviews } from "@/src/components/GoogleReviews";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import Markdown from 'react-markdown';

import { SEO } from "@/src/components/SEO";

export function About() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'pages', 'about');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setPageData(docSnap.data());
      } catch (e) {
        console.warn("Using offline fallback data for CMS");
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-[160px] lg:pt-[200px] pb-32 overflow-hidden">
      <SEO seo={pageData?.seo} />
      {/* Hero */}
      <section className="relative -mt-[160px] lg:-mt-[200px] pt-[180px] lg:pt-[240px] pb-32 lg:pb-40 bg-[#0A1118]">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-500/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-slate-900/50 block"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeIn isHero>
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 backdrop-blur-md px-6 py-3 text-sm font-semibold text-brand-400 mb-10">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                <span className="text-base tracking-wide uppercase">{pageData?.title || 'About Us'}</span>
              </div>
              {pageData?.heroTitle ? (
                <h1 
                  className="text-[40px] md:text-[48px] lg:text-[57px] font-black tracking-tight text-white mb-8 leading-[1.1]"
                  dangerouslySetInnerHTML={{ __html: pageData.heroTitle }}
                />
              ) : (
                <h1 className="text-[40px] md:text-[48px] lg:text-[57px] font-black tracking-tight text-white mb-8 leading-[1.1]">
                  Your Trusted Solar Partner in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">Northern Territory</span>
                </h1>
              )}
              <div className="text-[18px] lg:text-[20px] text-slate-300 font-light mb-12 leading-relaxed border-l-4 border-brand-500/50 pl-6 lg:pl-10 relative">
                {pageData?.content ? (
                  <div className="markdown-body space-y-4">
                     <Markdown>{pageData.content}</Markdown>
                  </div>
                ) : (
                  <p>At Oneroof Solar, we are dedicated to helping homes and businesses across Darwin, Alice Springs, and Palmerston transition to clean, renewable energy. We believe in providing top-tier equipment, flawless installation, and exceptional customer service.</p>
                )}
              </div>
              
              <div className="flex items-center justify-between gap-2 sm:gap-6 lg:gap-10 border-t border-slate-800 pt-8 mt-8 lg:pt-10 lg:mt-10 w-full">
                <div>
                  <div className="text-3xl lg:text-5xl font-extrabold text-white mb-1 lg:mb-2"><span className="text-brand-500">#</span>1</div>
                  <div className="text-xs sm:text-sm lg:text-base text-slate-400 font-medium">Rated Installer in NT</div>
                </div>
                <div className="w-px h-12 lg:h-16 bg-slate-800 hidden sm:block"></div>
                <div>
                  <div className="text-3xl lg:text-5xl font-extrabold text-white mb-1 lg:mb-2">10k+</div>
                  <div className="text-xs sm:text-sm lg:text-base text-slate-400 font-medium">Installs Completed</div>
                </div>
                <div className="w-px h-12 lg:h-16 bg-slate-800 hidden sm:block"></div>
                <div>
                  <div className="text-3xl lg:text-5xl font-extrabold text-white mb-1 lg:mb-2">15+</div>
                  <div className="text-xs sm:text-sm lg:text-base text-slate-400 font-medium">Years Experience</div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn isHero delay={0.2} className="relative mt-12 lg:mt-0">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-800/80 min-h-[500px] lg:min-h-[700px] w-full group">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent mix-blend-overlay z-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-40"></div>
                <img referrerPolicy="no-referrer" fetchPriority="high" src="https://i.postimg.cc/rw0QWBNZ/6-2-(1).webp" alt="Solar installation team" className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-[2000ms]" />
              </div>
              <div className="absolute -bottom-8 -left-8 lg:-bottom-12 lg:-left-12 bg-white p-6 lg:p-8 rounded-[2rem] shadow-2xl z-20 flex items-center gap-6 max-w-sm">
                <div className="w-20 h-20 rounded-full border-4 border-white bg-brand-100 flex items-center justify-center text-brand-600 shadow-inner flex-shrink-0">
                   <Sun className="h-10 w-10" />
                </div>
                <div>
                   <p className="text-lg lg:text-xl font-bold text-slate-900 leading-tight mb-1">Clean Energy Council</p>
                   <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Approved Retailer</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-slate-50 py-24 sm:py-32 relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50/50 -skew-x-12 transform origin-top-right"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3">The Oneroof Difference</h2>
            <h3 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-6">
              Why Choose Oneroof Solar?
            </h3>
            <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full mb-6"></div>
            <p className="text-lg lg:text-xl text-slate-600">
              We don't just install panels; we build long-term relationships based on trust, quality, and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Local NT-focused team",
                desc: "Dedicated local experts providing tailored solutions for Northern Territory homes and businesses."
              },
              {
                icon: Sun,
                title: "Designed for NT climate",
                desc: "Our solar systems are specifically engineered to withstand the intense heat and humidity of the Northern Territory."
              },
              {
                icon: Shield,
                title: "Local support",
                desc: "We are always here when you need us, offering fast and reliable local support for your peace of mind."
              },
              {
                icon: Tool,
                title: "Cyclone-ready installations",
                desc: "Secure, heavy-duty mounting and robust installations designed to survive extreme cyclone conditions safely."
              }
            ].map((feature, i) => (
              <FadeIn key={feature.title} delay={i * 0.1} className="group bg-white p-8 sm:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-all duration-300">
                <div className="mb-8 inline-flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 w-16 h-16 text-slate-400 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-colors duration-500 shadow-sm">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className="mb-4 text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed text-sm lg:text-base">{feature.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 sm:py-32 bg-white overflow-hidden relative">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
               <FadeIn className="order-2 lg:order-1 relative">
                 <div className="absolute -inset-4 bg-brand-50 rounded-[3rem] -z-10 transform -rotate-3 scale-105"></div>
                 <img referrerPolicy="no-referrer" loading="lazy" src="https://esaenergy.com.pk/wp-content/uploads/2025/05/Why-Solar-Panels-Are-a-Smart-Investment-for-Small-Businesses-1024x683.jpg" alt="Solar installation process" className="w-full h-full object-cover rounded-[2rem] shadow-xl" />
               </FadeIn>
               
               <FadeIn delay={0.2} className="order-1 lg:order-2 flex flex-col justify-center">
                 <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-6">
                   Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-green-500">Values</span>
                 </h2>
                 <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    We believe in delivering excellence at every stage of your solar journey. Our commitment goes beyond installation; it's about providing long-term value.
                 </p>
                 
                 <div className="space-y-6">
                    {[
                      { title: "Transparency", desc: "Honest quotes, no hidden fees, and straightforward advice tailored to your energy needs." },
                      { title: "Innovation", desc: "Always adopting the latest technologies to ensure you get the most efficient solar system." },
                      { title: "Sustainability", desc: "Helping the Northern Territory transition to a cleaner, greener future, one roof at a time." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                         <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-brand-600" />
                         </div>
                         <div>
                            <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                            <p className="text-slate-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
               </FadeIn>
            </div>
         </div>
      </section>

      <GoogleReviews />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <FadeIn className="bg-[#0A1118] rounded-[2rem] sm:rounded-[3rem] px-6 py-12 sm:p-12 lg:p-20 relative overflow-hidden text-center shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-500/20 via-slate-900 to-[#0A1118] -z-0 pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Ready to make the switch?</h2>
            <p className="text-lg text-slate-300 mb-10">
              Contact us today for a free, no-obligation quote and find out exactly how much you can save on your energy bills.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-full w-full sm:w-auto shadow-[0_0_30px_rgba(140,198,63,0.3)] hover:shadow-[0_0_50px_rgba(140,198,63,0.4)]" asChild>
                <Link to="/contact">Get Your Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-full w-full sm:w-auto border-white/20 text-white hover:bg-transparent hover:text-white hover:border-white/20" asChild>
                <a href="tel:0483986444">Call Us 0483986444</a>
              </Button>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
