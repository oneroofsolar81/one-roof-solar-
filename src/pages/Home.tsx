import { useState, useEffect } from "react";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { Button } from "@/src/components/ui/Button";
import { GoogleReviews } from "@/src/components/GoogleReviews";
import { PartnersMarquee } from "@/src/components/PartnersMarquee";
import { PackagesSection } from "@/src/components/PackagesSection";
import { ArrowRight, CheckCircle2, Zap, Battery, HomeIcon, Building2, CircleDollarSign, Lightbulb, Grid, Activity, Wifi, Wrench, Droplets, Waves, Recycle, BatteryMedium, ChevronsRight, Layers, MapPin, Smartphone, ShieldCheck, Sun, Award, HeadphonesIcon, Power, ChevronDown, MessageCircleQuestion, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { FaqSection } from "@/src/components/FaqSection";
import { SEO } from "@/src/components/SEO";

export function Home() {
  const [pageData, setPageData] = useState<any>(null);
  const [servicesData, setServicesData] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'pages', 'home');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setPageData(docSnap.data());

        const servicesSnap = await getDocs(collection(db, 'services'));
        if (!servicesSnap.empty) {
           setServicesData(servicesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      } catch (e) {
        console.warn("Using offline fallback data for CMS");
      }
    }
    loadData();
  }, []);

  const sd = pageData?.sections;

  return (
    <div className="flex flex-col">
      <SEO seo={pageData?.seo} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A1118] px-4 pt-[110px] pb-16 md:pt-36 lg:pt-[160px] md:pb-36 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-[#0A1118]" />
          <img referrerPolicy="no-referrer"
            src="https://i.postimg.cc/1XWKZZkw/Bayview-0820-(2).webp"
            alt="Solar Panel Installation Background"
            className="absolute inset-0 w-full h-full object-cover brightness-[0.7] max-w-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1118] via-[#0A1118]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118] via-transparent to-[#0A1118]/50 opacity-90" />
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl pt-[45px] lg:pt-[45px]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8 xl:gap-0 lg:items-start">
            
            <FadeIn isHero className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-brand-400 mb-8 shadow-[0_0_20px_rgba(140,198,63,0.15)] animate-fade-in-up">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
                </span>
                {sd?.hero?.badge || "Federal Rebate: Save 30% on Solar Batteries"}
              </div>
              
              {/* Headline */}
              {(sd?.hero?.title || pageData?.heroTitle) ? (
                 <h1 
                    className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-[4.5rem] leading-[1.1] mb-6 animate-fade-in-up md:delay-100"
                    dangerouslySetInnerHTML={{ __html: sd?.hero?.title || pageData?.heroTitle }} 
                 />
              ) : (
                <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-[4.5rem] leading-[1.1] mb-6 animate-fade-in-up md:delay-100">
                  Solar Solutions Built for <br />
                  <span className="text-brand-500 pb-2 inline-block">Northern Territory Conditions</span>
                </h1>
              )}
              
              {/* Description */}
              {(sd?.hero?.subtitle || pageData?.heroSubtitle) ? (
                <p 
                  className="max-w-xl text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed font-light animate-fade-in-up md:delay-200"
                  dangerouslySetInnerHTML={{ __html: sd?.hero?.subtitle || pageData?.heroSubtitle }}
                />
              ) : (
                <p className="max-w-xl text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed font-light animate-fade-in-up md:delay-200">
                  Trusted by homeowners and businesses across Darwin, Palmerston, Katherine, Alice Springs and regional NT. Premium solar panels, batteries and installation backed by local support.
                </p>
              )}

              {/* Extra Features Row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10 text-sm font-medium text-white animate-fade-in-up md:delay-200">
                {(sd?.hero?.topFeatures || [
                  "NT Licensed Electricians",
                  "Premium Tier-1 Solar Panels",
                  "Local Support Team"
                ]).map((feat: string, i: number) => (
                  <span key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-brand-500" />
                    {feat}
                  </span>
                ))}
              </div>
              
              {/* CTA Area */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up md:delay-300">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-green-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-300"></div>
                  <Button size="lg" className="relative rounded-full font-bold text-base px-8 h-14 bg-brand-500 hover:bg-brand-600 text-[#0f172a] hover:scale-[1.02] transition-all" asChild>
                    <Link to="/contact">{sd?.hero?.ctaText || "Get Free Quote"} <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-slate-300">
                  {(sd?.hero?.features || [
                    "$0 Deposit Options",
                    "25 Years Performance"
                  ]).map((feat: string, i: number) => (
                    <span key={i} className="flex items-center gap-2 font-medium">
                      <div className="rounded-full bg-green-500/20 p-1"><CheckCircle2 className="h-4 w-4 text-green-400" /></div>
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Trust/Reviews */}
              <div className="mt-14 flex items-center gap-4 border-t border-white/10 pt-8 max-w-lg animate-fade-in-up md:delay-500">
                <div className="flex -space-x-3">
                  <img referrerPolicy="no-referrer" className="w-10 h-10 rounded-full border-2 border-[#0A1118]" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=60&w=100&auto=format&fit=crop" alt="User" />
                  <img referrerPolicy="no-referrer" className="w-10 h-10 rounded-full border-2 border-[#0A1118]" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=60&w=100&auto=format&fit=crop" alt="User" />
                  <img referrerPolicy="no-referrer" className="w-10 h-10 rounded-full border-2 border-[#0A1118]" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=60&w=100&auto=format&fit=crop" alt="User" />
                  <div className="w-10 h-10 rounded-full border-2 border-[#0A1118] bg-slate-800 flex items-center justify-center text-xs font-bold text-white">+500</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 mb-0.5">
                    {[1,2,3,4,5].map(i => <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <div className="text-xs font-semibold text-slate-300">{sd?.hero?.trustText || "Loved by Darwin homeowners"}</div>
                </div>
              </div>
            </FadeIn>
            
            {/* Value Props Glass Cards (Right Side) */}
            <FadeIn isHero delay={0.2} className="lg:col-span-5 relative mt-10 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/20 to-transparent blur-3xl rounded-[3rem] -z-10 mt-10 animate-pulse"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 lg:ml-auto w-full max-w-[420px] ml-auto relative animate-float">
                
                {/* Main Featured Card */}
                <div className="rounded-[2.5rem] bg-[#162719]/80 backdrop-blur-xl border border-white/10 p-8 sm:p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/10 rounded-bl-[120px] transition-colors group-hover:bg-brand-500/20"></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="rounded-2xl bg-brand-500/20 p-4 shadow-inner">
                      <Zap className="h-8 w-8 text-brand-400" />
                    </div>
                    <span className="text-sm font-bold px-4 py-1.5 bg-white/10 rounded-full text-white backdrop-blur-md">
                      {sd?.hero?.cards?.card1?.badge || "Premium"}
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold text-white mb-3">{sd?.hero?.cards?.card1?.title || "High Efficiency"}</h3>
                    <p className="text-slate-400 text-base leading-relaxed mb-8">{sd?.hero?.cards?.card1?.description || "Featuring top-tier JinkoSolar & AIKO N-Type panels for maximum output in Darwin heat."}</p>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-500 to-green-400 transition-all duration-1000" 
                        style={{ width: `${sd?.hero?.cards?.card1?.percent || 95}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-3 text-sm text-slate-400 font-medium">
                      <span>Performance</span>
                      <span className="text-brand-400 font-bold">{sd?.hero?.cards?.card1?.percent || 95}%</span>
                    </div>
                  </div>
                </div>
                
                {/* Secondary Cards Row */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Storage Card */}
                  <div className="rounded-[2rem] bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col cursor-pointer hover:bg-[#1e293b]/80 transition-colors shadow-lg min-h-[180px]">
                    <div className="rounded-2xl bg-orange-500/20 p-3 w-max mb-5">
                      <Battery className="h-6 w-6 text-orange-400" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-1">{sd?.hero?.cards?.card2?.title || "Smart Storage"}</h3>
                    <p className="text-sm text-slate-400 mt-auto leading-snug">{sd?.hero?.cards?.card2?.description || "Hybrid Inverters"}</p>
                  </div>
                  
                  {/* Warranty Card */}
                  <div className="rounded-[2rem] bg-brand-500 backdrop-blur-xl border border-brand-400/50 p-6 sm:p-8 flex flex-col cursor-pointer hover:bg-brand-400 transition-colors shadow-lg shadow-brand-500/20 min-h-[180px]">
                    <div className="rounded-2xl bg-slate-900/10 p-3 w-max mb-5">
                      <HomeIcon className="h-6 w-6 text-slate-900" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-1">{sd?.hero?.cards?.card3?.title || "Residential"}</h3>
                    <p className="text-sm font-bold text-slate-800 mt-auto leading-snug">{sd?.hero?.cards?.card3?.description || "Tailored Solutions"}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Partners Marquee/Logos */}
      <PartnersMarquee />

      {/* Services Overview */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-dot-slate-200 opacity-50 pointer-events-none" />
        <div className="absolute -left-40 top-40 w-96 h-96 bg-brand-200/30 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <FadeIn>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
                  <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">{sd?.expertise?.badge || "Our Expertise"}</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]" 
                  dangerouslySetInnerHTML={{ __html: sd?.expertise?.title || "Complete Energy <br class=\"hidden sm:block\" /><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500\">Solutions</span>" }}
                />
              </FadeIn>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1 - Solar Panel Installation */}
            <FadeIn delay={0.1} className="md:col-span-2 lg:row-span-2 group relative rounded-[2.5rem] bg-white p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-2xl hover:border-brand-200 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer">
              <div className="absolute -right-12 -bottom-12 text-brand-500 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700 pointer-events-none transform">
                <Grid className="w-80 h-80" />
              </div>
              <div className="mb-10 inline-flex rounded-3xl bg-brand-50 p-5 text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-500 shadow-sm relative z-10 w-max border border-brand-100">
                <Grid className="h-8 w-8" />
              </div>
              <h3 className="mb-4 text-3xl font-black text-slate-900 relative z-10 group-hover:text-brand-600 transition-colors">{sd?.expertise?.items?.[0]?.title || "Residential & Commercial Solar"}</h3>
              <p className="text-slate-600 leading-relaxed relative z-10 flex-grow font-medium text-lg">
                {sd?.expertise?.items?.[0]?.description || "Expert installation of premium Tier 1 solar panels tailored to maximize your energy production. We analyze your roof's orientation, local weather patterns, and your specific energy consumption profile."}
              </p>
              <Link to="/contact" className="mt-12 flex items-center text-sm font-bold text-slate-900 group-hover:text-brand-600 transition-colors relative z-10 w-fit">
                <span className="uppercase tracking-widest">Learn more</span>
                <div className="ml-4 rounded-full bg-slate-50 border border-slate-200 p-2 group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </FadeIn>

            {/* 2 - Battery Storage */}
            <FadeIn delay={0.2} className="md:col-span-2 group relative rounded-[2.5rem] bg-slate-900 p-8 sm:p-10 shadow-xl border border-slate-800 hover:border-brand-500/30 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[60px] pointer-events-none"></div>
              <div className="flex justify-between items-start mb-6">
                <div className="inline-flex rounded-[1.25rem] bg-white/10 backdrop-blur-md p-4 text-white border border-white/10 group-hover:scale-110 transition-transform duration-500 relative z-10">
                  <Battery className="h-7 w-7" />
                </div>
                <div className="px-4 py-1.5 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider border border-brand-500/30 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse"></span>
                  Rebate Eligible
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-white relative z-10">{sd?.expertise?.items?.[1]?.title || "Battery Storage Systems"}</h3>
              <p className="text-slate-400 leading-relaxed relative z-10 font-medium">
                {sd?.expertise?.items?.[1]?.description || "Store your excess solar energy for nighttime use and protect against grid blackouts with advanced lithium technology."}
              </p>
            </FadeIn>

            {/* 3 - Inverters */}
            <FadeIn delay={0.3} className="group relative rounded-[2.5rem] bg-white p-8 sm:p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-200 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer">
              <div className="mb-6 inline-flex rounded-[1.25rem] bg-slate-50 p-4 text-slate-700 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-500 relative z-10 border border-slate-100">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-900 relative z-10 group-hover:text-brand-600 transition-colors">{sd?.expertise?.items?.[2]?.title || "Smart Inverters"}</h3>
              <p className="text-slate-600 leading-relaxed relative z-10 font-medium text-sm">
                {sd?.expertise?.items?.[2]?.description || "High-efficiency inverters to reliably convert energy."}
              </p>
            </FadeIn>

            {/* 4 - Repairs */}
            <FadeIn delay={0.4} className="group relative rounded-[2.5rem] bg-brand-500 p-8 sm:p-10 shadow-lg shadow-brand-500/20 border border-brand-400 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer hover:bg-brand-400 text-slate-900">
              <div className="absolute right-[-20%] bottom-[-20%] opacity-[0.08] pointer-events-none transform -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Wrench className="w-64 h-64" />
              </div>
              <div className="mb-6 inline-flex rounded-[1.25rem] bg-white/20 p-4 text-slate-900 transition-colors duration-500 relative z-10 border border-slate-900/10">
                <Wrench className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-black relative z-10">{sd?.expertise?.items?.[3]?.title || "Repairs & Maintenance"}</h3>
              <p className="opacity-90 leading-relaxed relative z-10 font-medium text-sm">
                {sd?.expertise?.items?.[3]?.description || "Keep your system running at peak performance."}
              </p>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 pointer-events-none opacity-50" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <FadeIn className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-brand-500 font-bold mb-4 uppercase tracking-wider text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500"></span>
                {sd?.whyChooseUs?.badge || "Why Choose Us"}
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6 leading-tight">
                {sd?.whyChooseUs?.title || "Premium Solar Solutions For The Northern Territory"}
              </h2>
              
              <div className="space-y-8 mt-10">
                {(Array.isArray(sd?.whyChooseUs?.items) ? sd.whyChooseUs.items : [
                  { 
                    title: "Huge Savings & Government Grants", 
                    description: "Maximize your energy savings. Customized solar solutions. Trust us to slash your bills. Top-tier solar panels & batteries with government grants.",
                    icon: "CircleDollarSign"
                  },
                  { 
                    title: "Easy Processing Fully Taken Care By Our Experts", 
                    description: "Your stress-free solar journey. We handle everything, from rebates to custom solutions.",
                    icon: "Lightbulb"
                  },
                  { 
                    title: "Power Your Life, Naturally", 
                    description: "Enjoy the benefits of your fully functional solar energy system. Get started today with our hassle-free solar panel installation process.",
                    icon: "Zap"
                  }
                ]).map((item: any, i: number) => {
                  const icons: any = { CircleDollarSign, Lightbulb, Zap };
                  const Icon = icons[item.icon] || CheckCircle2;
                  return (
                  <div key={i} className="flex gap-4 group">
                    <div className="mt-1 flex-shrink-0 w-14 h-14 bg-slate-50 flex items-center justify-center rounded-2xl border border-slate-100 group-hover:bg-brand-50 group-hover:border-brand-200 transition-colors">
                      <Icon className="h-6 w-6 text-brand-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                )})}
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full h-12 px-8 text-base w-full sm:w-auto" asChild>
                  <Link to="/contact">{sd?.whyChooseUs?.ctaText || "Get Your Free Quote"}</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base font-bold text-slate-700 border-slate-200 hover:bg-transparent hover:text-slate-700 hover:border-slate-200 w-full sm:w-auto" asChild>
                  <a href={`tel:${sd?.whyChooseUs?.phone || "0483986444"}`}>Call Us {sd?.whyChooseUs?.phone || "0483986444"}</a>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="relative order-1 lg:order-2">
              <div className="relative rounded-[2rem] overflow-hidden aspect-square lg:aspect-auto lg:h-[650px] shadow-2xl">
                <img referrerPolicy="no-referrer" src={sd?.whyChooseUs?.image || "https://i.postimg.cc/fWGBJR1G/dji-fly-20240620-115258-79-1718868305112-photo.webp"} alt="Solar panel installation" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-transparent"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-grid-slate-200 rounded-3xl -z-10"></div>
              <div className="absolute -top-12 -left-12 w-40 h-40 bg-brand-100 rounded-full blur-3xl opacity-50 -z-10"></div>
              
              <div className="absolute bottom-8 -left-6 lg:-left-12 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="w-14 h-14 bg-green-50 text-green-600 flex items-center justify-center rounded-full">
                  <Activity className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-lg">100%</p>
                  <p className="text-sm text-slate-500 font-medium">Clean Energy</p>
                </div>
              </div>
            </FadeIn>
            
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-slate-900 overflow-hidden relative">
        {/* Background elements */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
            <div className="max-w-2xl">
              <FadeIn>
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm mb-6 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                  <span className="text-sm font-bold text-white uppercase tracking-widest">{sd?.process?.badge || "How It Works"}</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]"
                  dangerouslySetInnerHTML={{ __html: sd?.process?.title || "Your Seamless Journey to <br class=\"hidden sm:block\" />\n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400\">Solar Energy</span>" }}
                />
              </FadeIn>
            </div>
            <FadeIn delay={0.2} className="max-w-md lg:pb-3">
              <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed border-l-2 border-brand-500/50 pl-6">
                {sd?.process?.subtitle || "We've completely streamlined our process to make switching to solar as easy, fast, and stress-free as possible."}
              </p>
            </FadeIn>
          </div>

          <div className="relative mt-16">
            {/* Connecting Dashboard Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-brand-500 to-transparent animate-[shimmer-slide_3s_linear_infinite]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 relative z-10">
              {(sd?.process?.steps || [
                {
                  step: "01",
                  title: "Free Consultation",
                  description: "We assess your energy needs and evaluate your roof space remotely."
                },
                {
                  step: "02",
                  title: "Custom Design",
                  description: "Our engineers design a tailored solar solution to maximize your ROI."
                },
                {
                  step: "03",
                  title: "Installation",
                  description: "Certified professionals install your system quickly and safely."
                },
                {
                  step: "04",
                  title: "Power On",
                  description: "Start saving immediately while reducing your carbon footprint."
                }
              ]).map((item: any, i: number) => {
                const icons = [
                  <Activity className="w-7 h-7 text-white" />,
                  <Layers className="w-7 h-7 text-white" />,
                  <Wrench className="w-7 h-7 text-white" />,
                  <Zap className="w-7 h-7 text-white" />
                ];
                const colors = [
                  "from-brand-500 to-green-500",
                  "from-green-500 to-emerald-500",
                  "from-emerald-500 to-teal-500",
                  "from-teal-500 to-cyan-500"
                ];
                return (
                  <FadeIn key={item.step || i} delay={i * 0.15} className={`relative group ${i % 2 !== 0 ? 'lg:translate-y-8' : 'lg:-translate-y-8'}`}>
                    <div className="bg-[#111A24]/90 backdrop-blur-2xl border border-white/5 p-8 rounded-[2rem] hover:bg-[#162231]/90 transition-all duration-500 flex flex-col h-full hover:border-brand-500/30 hover:shadow-[0_0_40px_rgba(140,198,63,0.1)] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-110"></div>
                      
                      <div className="flex justify-between items-start mb-12 relative z-10">
                        <div className={`w-16 h-16 rounded-[1.25rem] bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                          {icons[i % icons.length]}
                        </div>
                        <div className="text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-500 tracking-tighter">
                          {item.step || `0${i + 1}`}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors relative z-10">{item.title}</h3>
                      <p className="text-slate-400 leading-relaxed font-medium relative z-10">
                        {item.description || item.desc}
                      </p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Darwin Solar Panel Installer */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-50/50 -z-0 hidden lg:block rounded-bl-[120px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-100/40 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Image (Left) */}
            <FadeIn className="relative order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-brand-100 to-transparent rounded-[2.5rem] -z-10 opacity-70 blur-xl"></div>
                
                <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] md:aspect-square lg:aspect-[4/5] shadow-2xl group border border-slate-100">
                  <img referrerPolicy="no-referrer" src={sd?.installer?.image || "https://i.postimg.cc/05nhGvxW/Stuart-Park-0820.webp"} alt="Darwin Solar Panel Installer" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="bg-white/95 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-white/20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <div className="flex items-center gap-5">
                        <div className="bg-gradient-to-br from-brand-400 to-brand-600 p-3.5 rounded-xl text-white shadow-lg shadow-brand-500/30">
                          <MapPin className="w-8 h-8" />
                        </div>
                        <div>
                          <div className="font-black text-3xl text-slate-900 leading-none mb-1">Top Rated</div>
                          <div className="font-bold text-brand-600 text-sm tracking-wide uppercase">Darwin Solar Experts</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>



              </div>
            </FadeIn>

            {/* Text (Right) */}
            <FadeIn delay={0.2} className="relative z-10 order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 shadow-sm mb-8">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                <span className="text-sm font-bold text-slate-700 uppercase tracking-widest">
                  {sd?.installer?.badge || "Top Quality Installers"}
                </span>
              </div>
              <h2 
                className="text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-8 animate-fade-in-up"
                dangerouslySetInnerHTML={{ __html: sd?.installer?.title || "Your Expert <br/> <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500\">Darwin Solar Installer</span>" }}
              />
              
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-12">
                <p>
                  {sd?.installer?.paragraphs?.[0] || "As Darwin's premier solar panel installers, we are dedicated to providing the highest quality renewable energy solutions tailored specifically for the harsh Northern Territory climate."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-start">
                    <ShieldCheck className="w-8 h-8 text-brand-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{sd?.installer?.features?.[0]?.title || "CEC Accredited"}</h4>
                    <p className="text-slate-500 text-sm">{sd?.installer?.features?.[0]?.description || "Certified professionals ensuring the strictest safety standards."}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-start">
                    <Sun className="w-8 h-8 text-orange-500 mb-4" />
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{sd?.installer?.features?.[1]?.title || "Climate Ready"}</h4>
                    <p className="text-slate-500 text-sm">{sd?.installer?.features?.[1]?.description || "Systems designed to withstand Darwin's extreme weather."}</p>
                  </div>
                </div>
                <p>
                  {sd?.installer?.paragraphs?.[1] || "From the initial consultation to final commissioning, our expert installers handle every aspect of your solar journey, guaranteeing a seamless transition to clean, affordable, and sustainable power."}
                </p>
              </div>
              
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <Button className="w-full sm:w-auto justify-center rounded-full h-12 px-8 font-bold text-base shadow-sm bg-[#8cc63f] text-slate-900 hover:bg-[#7ab133] transition-all hover:-translate-y-1" asChild>
                  <Link to="/contact">{sd?.installer?.ctaText || "Get Your Free Quote"}</Link>
                </Button>
                <Button variant="outline" className="w-full sm:w-auto justify-center rounded-full h-12 px-8 font-bold text-base border-2 border-slate-200 text-slate-900 hover:bg-slate-50 hover:-translate-y-1 transition-all" asChild>
                  <a href={`tel:${sd?.whyChooseUs?.phone || "0483986444"}`} className="flex items-center justify-center">
                    Call Us {sd?.whyChooseUs?.phone || "0483986444"}
                  </a>
                </Button>
              </div>
            </FadeIn>
            
          </div>
        </div>
      </section>

      {/* Exclusive Solar & Battery Deals */}
      <PackagesSection />
      


      {/* Premium Battery Storage Section */}
      <section className="py-24 bg-[#101522] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <FadeIn className="order-2 lg:order-1 relative">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl group border border-slate-700/50">
                <img referrerPolicy="no-referrer" src={sd?.battery?.image || "https://i.postimg.cc/pLr9VPVS/Nightcliff-0810-(1)-(1).webp"} alt="Solar Battery Storage" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101522] via-[#101522]/40 to-transparent opacity-80"></div>
                
                {/* Top Badge */}
                <div className="absolute top-8 left-8 bg-[#1A2A40]/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
                   <div className="relative w-12 h-12 flex items-center justify-center">
                     <svg className="w-12 h-12 transform -rotate-90">
                       <circle cx="24" cy="24" r="20" className="stroke-slate-700" strokeWidth="4" fill="none" />
                       <circle cx="24" cy="24" r="20" className="stroke-brand-400" strokeWidth="4" fill="none" strokeDasharray="125.6" strokeDashoffset="18.8" strokeLinecap="round" />
                     </svg>
                     <div className="absolute text-white font-bold text-sm">85%</div>
                   </div>
                   <div>
                     <div className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-0.5">Current Charge</div>
                     <div className="text-white font-bold text-sm">Ready for Peak</div>
                   </div>
                </div>

                {/* Floating Capacity Card */}
                <div className="absolute bottom-8 left-8 right-8 bg-[#1A2A40]/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                        <BatteryMedium className="w-5 h-5 text-brand-400" />
                      </div>
                      <div className="text-white font-bold text-lg">Home Battery</div>
                    </div>
                    <div className="text-brand-400 font-black text-xl">13.5 kWh</div>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-3 mb-3 overflow-hidden border border-slate-800 shadow-inner">
                    <div className="bg-gradient-to-r from-brand-600 to-emerald-400 h-full rounded-full w-[85%] relative">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[bg-slide_1s_linear_infinite]"></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider pt-2">
                    <span className="text-slate-400">Status</span>
                    <span className="text-emerald-400 flex items-center gap-1.5 bg-emerald-400/10 px-2 py-1 rounded-md border border-emerald-400/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      System Active
                    </span>
                  </div>
                </div>

              </div>
            </FadeIn>

            <FadeIn delay={0.2} className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-brand-400 font-bold mb-6 uppercase tracking-wider text-sm">
                <span className="h-2 w-2 rounded-full bg-brand-400"></span>
                {sd?.battery?.badge || "Energy Independence"}
              </div>
              <h2 
                className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-8"
                dangerouslySetInnerHTML={{ __html: sd?.battery?.title || "Uninterrupted Power for <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500\">Your Home</span>" }}
              />
              
              <div className="space-y-6">
                {(sd?.battery?.items || [
                  { title: "Blackout Protection", description: "Keep your essential appliances running seamlessly during grid outages." },
                  { title: "Peak Shifting", description: "Store cheap solar energy during the day to use during expensive evening peak times. Save up to $1,500 extra per year." },
                  { title: "Maximum ROI", description: "Combine with the 30% Federal Battery Rebate for unprecedented return on investment." }
                ]).map((feature: any, i: number) => {
                  const icons = [
                    <ShieldCheck className="w-6 h-6" />,
                    <Activity className="w-6 h-6" />,
                    <CircleDollarSign className="w-6 h-6" />
                  ];
                  return (
                    <div key={i} className="flex gap-5 group">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-400 group-hover:bg-brand-500/20 group-hover:text-brand-300 transition-all">
                        {icons[i % icons.length]}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                        <p className="text-slate-400 leading-relaxed font-medium">{feature.description || feature.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4">
                <Button size="lg" className="rounded-full h-14 px-8 font-bold text-base shadow-[0_8px_30px_rgba(140,198,63,0.3)] hover:shadow-[0_8px_30px_rgba(140,198,63,0.5)] transition-all hover:-translate-y-1 group w-full sm:w-auto" asChild>
                  <Link to="/contact">{sd?.battery?.ctaText || "Get a Free Quote"}</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 font-bold text-base border-white/20 text-white bg-transparent hover:bg-transparent hover:text-white hover:border-white/20 transition-all hover:scale-105 w-full sm:w-auto" asChild>
                  <a href={`tel:${sd?.whyChooseUs?.phone || "0483986444"}`}>Call Us {sd?.whyChooseUs?.phone || "0483986444"}</a>
                </Button>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Featured Projects Gallery */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <FadeIn>
                <div className="inline-flex items-center gap-2 text-brand-600 font-bold mb-4 uppercase tracking-wider text-sm">
                  <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                  Our Portfolio
                </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                  Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">Installations</span>
                </h2>
              </FadeIn>
            </div>
            <FadeIn delay={0.2}>
              <Button variant="outline" className="rounded-full font-bold" asChild>
                <Link to="/projects">View All Projects <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: "https://i.postimg.cc/KYkV73fq/Bayview-0820.webp", title: "Bayview - 0820", loc: "Bayview, NT 0820", desc: "Residential solar installation", systemSize: "6.6kW", battery: "None" },
              { img: "https://i.postimg.cc/ydTT0VqV/Berrimah-0828.webp", title: "Berrimah - 0828", loc: "Berrimah, NT 0828", desc: "Commercial setup", systemSize: "10kW", battery: "None" },
              { img: "https://i.postimg.cc/xjRszPYm/Bellamack-0832-(2)-(1).webp", title: "Bellamack - 0832", loc: "Bellamack, NT 0832", desc: "Solar with battery backup", systemSize: "8kW", battery: "13.5kWh" }
            ].map((p, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-500 group flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    <img referrerPolicy="no-referrer" loading="lazy" src={p.img} alt={p.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    
                    <div className="absolute bottom-4 left-4 z-20 flex gap-4 text-white text-sm font-medium">
                      <div className="flex items-center gap-1.5 drop-shadow-md">
                        <MapPin className="w-4 h-4 text-brand-400" />
                        {p.loc}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-brand-600 transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                    <p className="text-slate-600 mb-6 flex-grow">
                      {p.desc}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">System Size</span>
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Sun className="w-4 h-4 text-brand-500" /> {p.systemSize}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Battery Storage</span>
                        <div className="flex items-center gap-1.5 font-bold text-slate-800">
                          <Battery className="w-4 h-4 text-brand-500" /> {p.battery}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* The Oneroof Guarantee */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-brand-600 to-green-500 rounded-[3rem] p-1 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="bg-slate-900 rounded-[2.8rem] px-6 py-16 md:px-12 md:py-20 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[100px]"></div>
              
              <div className="lg:w-1/3 z-10">
                <FadeIn>
                  <Award className="w-16 h-16 text-brand-500 mb-6" />
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4">The Oneroof Guarantee</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    Peace of mind comes standard. We stand behind our work with industry-leading warranties and local support you can count on.
                  </p>
                </FadeIn>
              </div>
              
              <div className="lg:w-2/3 z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {(sd?.guarantee?.items || [
                  { title: "25-Year Performance Warranty", description: "Your solar panels are guaranteed to produce high yields for a quarter of a century." },
                  { title: "CEC Accredited Experts", description: "Every installation is carried out by Clean Energy Council approved electricians." },
                  { title: "10-Year Workmanship Warranty", description: "Flawless execution backed by our rigorous quality control and extended guarantee." },
                  { title: "Local NT Support", description: "We're right here in the Territory. Fast response times and dedicated local service." }
                ]).map((item: any, i: number) => {
                  const isLast = i === 3;
                  const classes = isLast ? "w-10 h-10 mb-5 text-slate-900" : "w-10 h-10 text-brand-400 mb-5";
                  const renderIcon = (idx: number) => {
                    switch(idx % 4) {
                      case 0: return <ShieldCheck className={classes} />;
                      case 1: return <CheckCircle2 className={classes} />;
                      case 2: return <Activity className={classes} />;
                      default: return <HeadphonesIcon className={classes} />;
                    }
                  };
                  return (
                    <FadeIn key={i} delay={(i + 1) * 0.1}>
                      <div className={isLast 
                        ? "bg-brand-500 rounded-3xl p-8 shadow-lg shadow-brand-500/20 hover:bg-brand-400 transition-colors h-full text-slate-900"
                        : "bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 transition-colors h-full text-slate-300"
                      }>
                        {renderIcon(i)}
                        <h3 className={isLast ? "text-xl font-bold text-slate-900 mb-2" : "text-xl font-bold text-white mb-2"}>{item.title}</h3>
                        <p className={isLast ? "text-slate-900/80 font-medium font-medium" : "text-slate-400"}>{item.description || item.desc}</p>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <GoogleReviews />

      {/* FAQ / Common Inquiries */}
      <FaqSection 
        faqs={sd?.faqs || [
          {
            q: "How does the $0 Deposit plan work?",
            a: "Our flexible payment plans allow you to install a complete solar system with zero upfront costs. You simply pay a low weekly fee (starting from $28/week) which is often offset by the savings on your electricity bill."
          },
          {
            q: "Am I eligible for the 30% Federal Rebate on batteries?",
            a: "Most households installing an approved solar battery are eligible. Our experts will assess your eligibility and handle all the paperwork to ensure you receive the maximum government grants available."
          },
          {
            q: "How long does installation take?",
            a: "A standard residential installation typically takes 1-2 days to complete. However, factoring in grid connection approvals, the entire process usually takes 2-4 weeks from consultation to being fully operational."
          },
          {
            q: "Are the solar panels durable in NT weather?",
            a: "Yes. We strictly use Tier 1 equipment, like Jinko and AIKO panels, which are rigorously tested and certified to withstand harsh Australian conditions, including intense heat, humidity, and extreme weather."
          },
          {
            q: "What size solar system do I need?",
            a: "It depends on your energy usage, roof space, and goals. Our engineers provide a free tailored analysis based on your recent power bills to recommend the perfect KW system to maximize your ROI."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl sm:rounded-[3rem] overflow-hidden bg-[#0A1118] border border-slate-800 px-6 py-12 sm:p-10 md:p-16 lg:p-20 shadow-2xl shadow-brand-500/10">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-r from-transparent to-brand-500/20 rounded-l-full blur-[80px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
            
            <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 text-center lg:text-left">
                <FadeIn>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm mb-6 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-white uppercase tracking-widest">Get Started Today</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
                    Ready to slash your <br className="hidden lg:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">electricity bills?</span>
                  </h2>
                  <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                    Schedule a free consultation today. Our experts will design the perfect system for your roof and energy needs in Darwin, Alice Springs, or Palmerston.
                  </p>
                </FadeIn>
              </div>
              
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col justify-center sm:justify-start lg:items-end gap-4">
                <FadeIn delay={0.2} className="w-full sm:w-auto lg:w-full max-w-sm flex flex-col gap-4">
                  <Button size="lg" className="rounded-full w-full h-16 text-lg font-bold bg-gradient-to-r from-brand-500 to-emerald-500 hover:from-brand-500 hover:to-emerald-500 text-slate-900 shadow-[0_0_40px_rgba(140,198,63,0.3)] hover:shadow-[0_0_60px_rgba(140,198,63,0.4)] transition-all hover:-translate-y-1" asChild>
                    <Link to="/contact">Book Free Consultation <ArrowRight className="ml-2 w-6 h-6" /></Link>
                  </Button>
                  <a href="tel:0483986444" className="inline-flex items-center justify-center rounded-full w-full h-16 text-lg font-bold border-2 border-white/20 text-white hover:bg-transparent hover:text-white hover:border-white/20 backdrop-blur-sm transition-all shadow-sm">
                    Call Us: 0483986444
                  </a>
                  <p className="text-slate-500 text-sm font-medium text-center mt-2">
                    No obligations. 100% free quote.
                  </p>
                </FadeIn>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
