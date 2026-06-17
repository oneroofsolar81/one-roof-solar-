import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, Sun, Battery } from "lucide-react";
import { FadeIn } from "../components/ui/FadeIn";
import { Button } from "../components/ui/Button";
import { GoogleReviews } from "@/src/components/GoogleReviews";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { SEO } from "@/src/components/SEO";

// (Keep existing projects array)

const projects = [
  {
    id: 1,
    title: "Alice Springs - 0870",
    location: "Alice Springs, NT 0870",
    date: "2026",
    systemSize: "13.2kW",
    battery: "None",
    description: "Premium solar installation for maximizing renewable energy usage.",
    image: "https://i.postimg.cc/htSc0sQH/Alice-Springs-0870-(1).webp",
    tags: ["Residential", "Premium"]
  },
  {
    id: 2,
    title: "Bayview - 0820",
    location: "Bayview, NT 0820",
    date: "2026",
    systemSize: "6.6kW",
    battery: "None",
    description: "Efficient solar energy system reducing household electricity bills.",
    image: "https://i.postimg.cc/KYkV73fq/Bayview-0820.webp",
    tags: ["Residential"]
  },
  {
    id: 3,
    title: "Bellamack - 0832",
    location: "Bellamack, NT 0832",
    date: "2026",
    systemSize: "8kW",
    battery: "13.5kWh",
    description: "Solar with battery backup for energy independence.",
    image: "https://i.postimg.cc/xjRszPYm/Bellamack-0832-(2)-(1).webp",
    tags: ["Residential", "Battery"]
  },
  {
    id: 4,
    title: "Berrimah - 0828",
    location: "Berrimah, NT 0828",
    date: "2026",
    systemSize: "10kW",
    battery: "None",
    description: "Commercial setup. Large scale solar installation.",
    image: "https://i.postimg.cc/ydTT0VqV/Berrimah-0828.webp",
    tags: ["Commercial"]
  },
  {
    id: 5,
    title: "Desert Springs - 0870",
    location: "Desert Springs, NT 0870",
    date: "2026",
    systemSize: "13.2kW",
    battery: "12.8kWh FoxESS",
    description: "Complete home energy independence with blackout protection.",
    image: "https://i.postimg.cc/8Cmv0tZR/Desert-Springs-0870.webp",
    tags: ["Residential", "Battery", "Off-grid capable"]
  },
  {
    id: 6,
    title: "Herbert - 0836",
    location: "Herbert, NT 0836",
    date: "2025",
    systemSize: "9.9kW",
    battery: "None",
    description: "Robust solar panel installation designed for maximum energy yield.",
    image: "https://i.postimg.cc/HxPVqKXm/Herbert-0836-(2)-(1).jpg",
    tags: ["Residential"]
  },
  {
    id: 7,
    title: "Howard Springs - 0835",
    location: "Howard Springs, NT 0835",
    date: "2025",
    systemSize: "15kW",
    battery: "25.6kWh Bank",
    description: "Off-grid setup for remote property lacking reliable grid connection.",
    image: "https://i.postimg.cc/KzVPyQMM/Humpty-Doo-0836-(1).jpg",
    tags: ["Rural", "Off-grid"]
  },
  {
    id: 8,
    title: "Karama - 0812",
    location: "Karama, NT 0812",
    date: "2025",
    systemSize: "6.6kW",
    battery: "None",
    description: "Standard tier-1 solar system ensuring optimized daytime energy usage.",
    image: "https://i.postimg.cc/W3DZSrH2/Karama-0812-(1)-(1).jpg",
    tags: ["Residential"]
  },
  {
    id: 9,
    title: "Leanyer - 0812",
    location: "Leanyer, NT 0812",
    date: "2026",
    systemSize: "8.5kW",
    battery: "None",
    description: "Clean energy upgrade for suburban household to slash energy costs.",
    image: "https://i.postimg.cc/0jRzf4Sd/Leanyer-0812-(1).jpg",
    tags: ["Residential"]
  },
  {
    id: 10,
    title: "Ludmilla - 0820",
    location: "Ludmilla, NT 0820",
    date: "2026",
    systemSize: "10.5kW",
    battery: "16kWh Sungrow",
    description: "Integrated smart home solar setup with EV charging capabilities.",
    image: "https://i.postimg.cc/43jyf0BL/Ludmilla-0820.jpg",
    tags: ["Residential", "Battery", "EV Ready"]
  },
  {
    id: 11,
    title: "Lyons - 0810",
    location: "Lyons, NT 0810",
    date: "2025",
    systemSize: "13.2kW",
    battery: "None",
    description: "Modern solar installation tailored to seamlessly fit the house design.",
    image: "https://i.postimg.cc/SxvNd5FN/Lyons-0810-(1).jpg",
    tags: ["Residential", "Premium"]
  },
  {
    id: 12,
    title: "Marrara - 0812",
    location: "Marrara, NT 0812",
    date: "2026",
    systemSize: "6.6kW",
    battery: "None",
    description: "Cost-effective solar setup to minimize daytime power consumption.",
    image: "https://i.postimg.cc/QxzRyrtw/Marrara-0812-(1)-(2).jpg",
    tags: ["Residential"]
  },
  {
    id: 13,
    title: "Humpty Doo - 0836",
    location: "Humpty Doo, NT 0836",
    date: "2026",
    systemSize: "10kW",
    battery: "None",
    description: "Sleek and efficient grid-tied system for a modern residential property.",
    image: "https://i.postimg.cc/76BBJgTq/Humpty-Doo-0836-(2)-(1).jpg",
    tags: ["Residential"]
  },
  {
    id: 14,
    title: "Muirhead - 0810",
    location: "Muirhead, NT 0810",
    date: "2026",
    systemSize: "6.6kW",
    battery: "None",
    description: "High performance system providing significant energy savings.",
    image: "https://i.postimg.cc/8CNwyyhw/Muirhead-0810-(1).jpg",
    tags: ["Residential"]
  },
  {
    id: 15,
    title: "Nightcliff - 0810",
    location: "Nightcliff, NT 0810",
    date: "2026",
    systemSize: "10kW",
    battery: "10kWh",
    description: "Beautiful clean install facing out towards the coast.",
    image: "https://i.postimg.cc/sgc0RdDQ/Nightcliff-0810-(2)-(3).jpg",
    tags: ["Residential", "Battery"]
  },
  {
    id: 16,
    title: "Rosebery - 0832",
    location: "Rosebery, NT 0832",
    date: "2026",
    systemSize: "8.5kW",
    battery: "None",
    description: "Maximizing the roof footprint to slash utility bills completely.",
    image: "https://i.postimg.cc/8Pwhp1WL/Rosebery-0832-(1).jpg",
    tags: ["Residential"]
  },
  {
    id: 17,
    title: "Stuart Park - 0820",
    location: "Stuart Park, NT 0820",
    date: "2026",
    systemSize: "6.6kW",
    battery: "None",
    description: "City living powered by the sun. Exceptional roof layout.",
    image: "https://i.postimg.cc/9FX7NvSL/Stuart-Park-0820-(1).jpg",
    tags: ["Residential"]
  }
];

export default function Projects() {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'pages', 'projects');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setPageData(docSnap.data());
      } catch (e) {
        console.warn("Using offline fallback data for CMS");
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-24 bg-slate-50 min-h-screen">
      <SEO seo={pageData?.seo} />
      <div className="bg-slate-900 pt-28 pb-32 relative overflow-hidden border-b border-slate-800">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid-slate-100/[0.03] bg-[size:32px_32px]"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand-500/20 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none opacity-50 mix-blend-screen"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn isHero>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 shadow-2xl mb-8 backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
              </span>
              <span className="text-xs font-black text-brand-300 uppercase tracking-[0.2em]">Our Portfolio</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[1.1]">
              Powering the Territory, <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-400 to-emerald-400">
                Roof by Roof.
              </span>
            </h1>
            
            <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Explore our latest premium solar and battery installations. See how we're helping local homes and businesses transition to smart, clean energy.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-white">500+</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Installations</span>
              </div>
              <div className="w-px h-12 bg-slate-800 mx-4 hidden md:block"></div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-white">Top Tier</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Equipment</span>
              </div>
              <div className="w-px h-12 bg-slate-800 mx-4 hidden md:block"></div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-white">Local</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Support</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <FadeIn key={project.id} delay={i * 0.1}>
              <div className="bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-500 group flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <img referrerPolicy="no-referrer" loading="lazy" src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-4 left-4 z-20 flex gap-4 text-white text-sm font-medium">
                    <div className="flex items-center gap-1.5 drop-shadow-md">
                      <MapPin className="w-4 h-4 text-brand-400" />
                      {project.location}
                    </div>
                  </div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-brand-600 transition-colors line-clamp-2">
                    {project.title}
                  </h2>
                  <p className="text-slate-600 mb-6 flex-grow">
                    {project.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">System Size</span>
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Sun className="w-4 h-4 text-brand-500" /> {project.systemSize}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Battery Storage</span>
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Battery className="w-4 h-4 text-brand-500" /> {project.battery}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      
      <GoogleReviews />

      <div className="bg-brand-50 py-20 mt-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Ready to start your own solar journey?</h2>
            <p className="text-lg text-slate-600 mb-10">Join hundreds of Territorians who have already made the switch to clean, reliable, and affordable energy with Oneroof Solar.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold shadow-xl hover:-translate-y-1 transition-all" asChild>
                <Link to="/contact">Get Your Free Quote <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold border-brand-500 text-brand-600 hover:bg-transparent hover:text-brand-600 hover:border-brand-500 hover:-translate-y-1 transition-all" asChild>
                <a href="tel:0483986444">Call Us 0483986444</a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
