// DARK COMPONENTS
function DarkHero({ service, slug }: { service: any; slug: string }) {
  const badgeText =
    slug === "ev-chargers"
      ? "// intelligent_charging_ready"
      : slug === "solar-panel"
        ? "// premium_solar_technology"
        : slug === "solar-inverters"
          ? "// smart_energy_conversion"
          : slug === "battery-storage"
            ? "// advanced_energy_storage"
            : "// future_ready_energy";

  const headingTop =
    slug === "ev-chargers"
      ? "Drive"
      : slug === "solar-panel"
        ? "Capture"
        : slug === "solar-inverters"
          ? "Smart"
          : slug === "battery-storage"
            ? "Store"
            : service.title.split(" ")[0];
  const headingBottom =
    slug === "ev-chargers"
      ? "Electric."
      : slug === "solar-panel"
        ? "The Sun."
        : slug === "solar-inverters"
          ? "Power."
          : slug === "battery-storage"
            ? "Energy."
            : service.title.split(" ").slice(1).join(" ") + ".";

  const btnLabel = "Get a Free Quote";

  const statValue =
    slug === "ev-chargers"
      ? "22"
      : slug === "solar-panel"
        ? "25"
        : slug === "solar-inverters"
          ? "99"
          : slug === "battery-storage"
            ? "13"
            : "10";
  const statUnit =
    slug === "ev-chargers"
      ? "kW"
      : slug === "solar-panel"
        ? "Yrs"
        : slug === "solar-inverters"
          ? "%"
          : slug === "battery-storage"
            ? "kWh"
            : "Yrs";
  const statLabel =
    slug === "ev-chargers"
      ? "Max Charging Speed"
      : slug === "solar-panel"
        ? "Performance Warranty"
        : slug === "solar-inverters"
          ? "Max Efficiency"
          : slug === "battery-storage"
            ? "Storage Capacity"
            : "Warranty";

  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A1118]">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen grayscale-[50%]"
        >
          <source
            src="https://cdn.pixabay.com/video/2021/11/14/96813-644781744_tiny.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118] via-[#0A1118]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1118] via-[#0A1118]/80 to-transparent flex"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn isHero>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
              {headingTop} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">
                {headingBottom}
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg mb-10 font-medium border-l-2 border-brand-400/50 pl-6">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 bg-brand-500 text-slate-900 border-none font-bold hover:bg-brand-400 transition-all h-14 hover:-translate-y-1 shadow-[0_0_20px_rgba(140,198,63,0.3)] uppercase tracking-widest"
                asChild
              >
                <Link to="/contact">
                  {btnLabel} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn isHero delay={0.2} className="relative hidden lg:block">
            <div className="w-full aspect-square bg-gradient-to-br from-brand-500/20 to-emerald-600/20 rounded-full blur-3xl absolute inset-0 animate-pulse"></div>
            <img referrerPolicy="no-referrer" fetchPriority="high"
              src={service.image}
              alt={service.title}
              className="relative z-10 w-full h-[600px] object-cover rounded-[3rem] border border-white/10 shadow-2xl opacity-90"
            />

            <div className="absolute top-10 right-10 bg-[#0A1118]/80 backdrop-blur-md border border-brand-500/30 p-6 rounded-2xl z-20">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-white">
                  {statValue}
                </span>
                <span className="text-brand-400 font-bold mb-1">
                  {statUnit}
                </span>
              </div>
              <div className="text-slate-400 text-xs uppercase tracking-widest font-mono">
                {statLabel}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function DarkIntro({ service, slug }: { service: any; slug: string }) {
  const introHeading =
    slug === "ev-chargers" ? (
      <>
        Fuel your journey with{" "}
        <span className="text-brand-500">solar energy.</span>
      </>
    ) : slug === "solar-panel" ? (
      <>
        Power your home with{" "}
        <span className="text-brand-500">solar energy.</span>
      </>
    ) : slug === "solar-inverters" ? (
      <>
        Maximize your <span className="text-brand-500">solar efficiency.</span>
      </>
    ) : slug === "battery-storage" ? (
      <>
        Store your <span className="text-brand-500">solar power.</span>
      </>
    ) : (
      <>
        Experience the best in{" "}
        <span className="text-brand-500">{service.title}.</span>
      </>
    );

  const stat1Value = slug === "solar-inverters" ? "99%" : "100%";
  const stat1Label =
    slug === "solar-panel"
      ? "Clean Energy"
      : slug === "solar-inverters"
        ? "Efficiency"
        : slug === "battery-storage"
          ? "Power Backup"
          : "Green Energy";

  const stat2Value =
    slug === "solar-panel"
      ? "Tier 1"
      : slug === "solar-inverters"
        ? "Smart"
        : slug === "battery-storage"
          ? "24/7"
          : "Fast";
  const stat2Label =
    slug === "solar-panel"
      ? "Panels"
      : slug === "solar-inverters"
        ? "Control"
        : slug === "battery-storage"
          ? "Power"
          : "Charging Speeds";

  const featTitle =
    slug === "ev-chargers"
      ? "Solar Integration"
      : slug === "solar-panel"
        ? "High Yield"
        : slug === "solar-inverters"
          ? "Smart Tech"
          : slug === "battery-storage"
            ? "Always On"
            : "Premium Tech";
  const featDesc =
    slug === "ev-chargers"
      ? "Charge directly from your panels."
      : slug === "solar-panel"
        ? "Maximum energy from the sun."
        : slug === "solar-inverters"
          ? "Optimized energy conversion."
          : slug === "battery-storage"
            ? "Power during grid outages."
            : "The best in the market.";

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-600 font-bold text-sm mb-6 border border-brand-100 uppercase tracking-wider">
              <Zap className="w-4 h-4" /> {service.title}
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
              {introHeading}
            </h2>
            <div className="space-y-6 text-slate-600 text-lg font-medium leading-relaxed">
              <p>{service.introExtra1}</p>
              <p>{service.introExtra2}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-l-4 border-brand-500 pl-4">
                <div className="text-3xl font-black text-slate-900 mb-1">
                  {stat1Value}
                </div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                  {stat1Label}
                </div>
              </div>
              <div className="border-l-4 border-slate-200 pl-4">
                <div className="text-3xl font-black text-slate-900 mb-1">
                  {stat2Value}
                </div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                  {stat2Label}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative shadow-2xl">
              <img referrerPolicy="no-referrer" fetchPriority="high"
                src={slug === "battery-storage" ? "https://orangesolarsystems.co.uk/wp-content/uploads/2024/11/Tesla-Powerwall-2-installation-Haslemere-1-1024x768.jpg" : (service.products[0]?.image || service.image)}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center gap-5">
                <div className="w-14 h-14 bg-brand-500 rounded-xl flex items-center justify-center shrink-0">
                  <Battery className="w-7 h-7 text-slate-900" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg mb-1">
                    {featTitle}
                  </h4>
                  <p className="text-slate-500 text-sm font-medium">
                    {featDesc}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function DarkProducts({ service, slug }: { service: any; slug: string }) {
  const highlightWord =
    slug === "solar-panel"
      ? "Solar"
      : slug === "solar-inverters"
        ? "Inverter"
        : slug === "battery-storage"
          ? "Storage"
          : slug === "ev-chargers"
            ? "Charging"
            : "Core";
  const productTag =
    slug === "ev-chargers"
      ? "EV Charger"
      : slug === "solar-panel"
        ? "Solar Panel"
        : slug === "solar-inverters"
          ? "Inverter"
          : slug === "battery-storage"
            ? "Battery"
            : "Product";
  const featureTag =
    slug === "ev-chargers"
      ? "Smart Ready"
      : slug === "solar-panel"
        ? "High Yield"
        : slug === "solar-inverters"
          ? "Smart Sync"
          : slug === "battery-storage"
            ? "Backup Ready"
            : "Premium";

  const isServiceOrSystem = slug.includes("installation") || slug.includes("repairs") || slug.includes("system");
  
  const portfolioLabel = slug === 'repairs-and-maintenance' ? 'Service Offerings' 
    : slug.includes('installation') ? 'Installation Features' 
    : slug.includes('system') ? 'System Components'
    : 'Hardware Portfolio';

  const descriptionText = slug === 'repairs-and-maintenance'
    ? "Professional maintenance and repair services to keep your system performing at its absolute peak."
    : slug.includes('installation')
    ? "Expert-led installation workmanship ensuring safety, system longevity, and maximum energy harvest."
    : slug.includes('system')
    ? "Comprehensive system packages featuring premium, perfectly-matched components tailored for maximum efficiency."
    : "State-of-the-art hardware safely designed for extreme durability, peak performance, and seamless home integration.";

  return (
    <section className="py-24 lg:py-32 bg-[#0A1118] relative">
      <div className="absolute inset-0 bg-dot-white/[0.05] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-slate-300 font-semibold text-sm mb-6 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_10px_rgba(140,198,63,0.8)]"></span>
              {portfolioLabel}
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter">
              Premium <br />
              <span className="text-brand-400">{highlightWord}</span> {isServiceOrSystem && !slug.includes("system") ? "Services" : "Solutions"}.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="md:max-w-xs">
            <p className="text-slate-400 font-medium">
              {descriptionText}
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {service.products.map((product: any, idx: number) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="bg-slate-900/40 rounded-[2rem] p-6 lg:p-8 border border-white/10 shadow-2xl hover:border-brand-500/40 transition-all duration-500 h-full flex flex-col group relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150 group-hover:bg-brand-500/20 z-0"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-64 sm:h-[320px] mb-8 rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative group-hover:border-white/20 transition-colors duration-500 flex items-center justify-center p-2">
                    <img referrerPolicy="no-referrer" loading="lazy"
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 opacity-100 z-0 drop-shadow-2xl"
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300 text-xs font-mono tracking-widest uppercase shadow-sm">
                      {productTag}
                    </span>
                    <span className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-md text-brand-400 text-xs font-mono tracking-widest uppercase shadow-sm flex items-center gap-1">
                      <Zap className="w-3 h-3" /> {featureTag}
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tighter group-hover:text-brand-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10">
                    {product.description}
                  </p>

                  <Link to="/contact" className="mt-auto flex items-center justify-between pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors group/link">
                    <span className="text-sm font-bold text-white tracking-widest uppercase group-hover/link:text-brand-400 transition-colors">
                      Get a Free Quote
                    </span>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover/link:bg-brand-500 group-hover/link:text-slate-900 transition-all duration-300 text-white shadow-sm border border-white/10 group-hover/link:border-brand-400">
                      <ArrowRight className="w-5 h-5 transform group-hover/link:translate-x-1 group-hover/link:-rotate-45 transition-transform duration-300" />
                    </div>
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function DarkBenefits({ service, slug }: { service: any; slug: string }) {
  const serviceNameName =
    slug === "ev-chargers"
      ? "EV Chargers"
      : slug === "solar-panel"
        ? "Solar Panels"
        : slug === "solar-inverters"
          ? "Solar Inverters"
          : slug === "battery-storage"
            ? "Solar Batteries"
            : service.title;
  const serviceNameNoun =
    slug === "ev-chargers"
      ? "charging"
      : slug === "solar-panel"
        ? "solar"
        : slug === "solar-inverters"
          ? "conversion"
          : slug === "battery-storage"
            ? "storage"
            : "energy";

  const b1Title =
    slug === "ev-chargers"
      ? "Solar Maximisation"
      : slug === "solar-panel"
        ? "Maximum Yield"
        : slug === "solar-inverters"
          ? "High Efficiency"
          : slug === "battery-storage"
            ? "Energy Independence"
            : "Top Performance";
  const b1Desc =
    slug === "ev-chargers"
      ? "Automatically route excess solar generation directly into your car instead of the grid, driving for essentially zero cost."
      : slug === "solar-panel"
        ? "Capture more sunlight throughout the day with next-generation panel architecture and anti-reflective glass."
        : slug === "solar-inverters"
          ? "Convert DC power to AC power with less than 1% energy loss, maximizing what your panels produce."
          : slug === "battery-storage"
            ? "Store your daytime solar surplus and power your home through the night, minimizing grid reliance completely."
            : "Enjoy premium features designed to give your household superior returns and robust reliability.";

  const b2Title =
    slug === "ev-chargers"
      ? "Smart App Control"
      : slug === "solar-panel"
        ? "Extreme Durability"
        : slug === "solar-inverters"
          ? "Smart App Control"
          : slug === "battery-storage"
            ? "Blackout Protection"
            : "Smart Technology";
  const b2Desc =
    slug === "ev-chargers"
      ? "Monitor charging speeds, set schedules during off-peak tariff hours, and track energy usage all from your smartphone."
      : slug === "solar-panel"
        ? "Engineered to withstand the harshest NT conditions including extreme heat, cyclonic winds, and heavy rain."
        : slug === "solar-inverters"
          ? "Track your solar production, home consumption, and system health in real-time right from your mobile device."
          : slug === "battery-storage"
            ? "Automatically switch to battery backup power within milliseconds during a grid outage to keep essentials running."
            : "Intuitive smart features empower you to monitor and adjust performance for ideal efficiency.";

  const b3Title = "Safe & Certified";
  const b3Desc =
    "Installed exclusively by our Clean Energy Council accredited electricians to meet strict Australian safety standards.";

  return (
    <section className="py-24 bg-brand-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <FadeIn>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              Why Choose Our {serviceNameName}?
            </h2>
            <p className="text-brand-900 text-lg font-bold max-w-2xl mx-auto">
              Future-proof your home with intelligent {serviceNameNoun}{" "}
              solutions that grow with your needs.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn
            delay={0.1}
            className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-500 mb-6 shadow-lg">
              <Sun className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight">
              {b1Title}
            </h3>
            <p className="text-white/90 font-medium leading-relaxed text-[15px]">
              {b1Desc}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.2}
            className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-500 mb-6 shadow-lg">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight">
              {b2Title}
            </h3>
            <p className="text-white/90 font-medium leading-relaxed text-[15px]">
              {b2Desc}
            </p>
          </FadeIn>

          <FadeIn
            delay={0.3}
            className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-500 mb-6 shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight">
              {b3Title}
            </h3>
            <p className="text-white/90 font-medium leading-relaxed text-[15px]">
              {b3Desc}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FadeIn } from "@/src/components/ui/FadeIn";
import { PackagesSection } from "@/src/components/PackagesSection";
import { FaqSection } from "@/src/components/FaqSection";
import { GoogleReviews } from "@/src/components/GoogleReviews";
import {
  CheckCircle2,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Shield,
  Zap,
  Target,
  PiggyBank,
  Grid,
  Battery,
  Wrench,
  Droplets,
  Waves,
  Smartphone,
  Sun,
  Power,
  Wifi,
} from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { PartnersMarquee } from "@/src/components/PartnersMarquee";

type ServiceProduct = {
  title: string;
  description: string;
  image: string;
};

const servicesData: Record<
  string,
  {
    title: string;
    description: string;
    introExtra1: string;
    introExtra2: string;
    products: ServiceProduct[];
    image: string;
    faqs: { q: string; a: string }[];
  }
> = {
  "residential-solar-system": {
    title: "Residential Solar System",
    description:
      "Oneroof Solar is a premier residential solar installation company that aims to make your home more sustainable and energy-independent. Our team of experts has been providing high-quality solar energy solutions for households across the Northern Territory.",
    introExtra1:
      "We understand that switching to solar energy can be overwhelming, which is why we are here to guide you every step of the way. From initial consultation to installation and maintenance, our dedicated team will ensure a smooth and hassle-free experience for you.",
    introExtra2:
      "As the top-rated solar installer in Darwin, Alice Springs, and Palmerston NT, we install only high-quality panels and inverters for clients. Join us in our mission towards a sustainable future by choosing Oneroof Solar for quality solar panels. Trust us to bring the power of the sun into your home.",
    products: [
      {
        title: "Tier 1 Solar Panels",
        description:
          "Premium solar panels represent the pinnacle of energy management technology, offering high efficiency and low degradation rates over a 25-year lifespan.",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2025/10/554370004/FM/TJ/DL/23068426/grid-tied-solar-system.jpeg",
      },
      {
        title: "String Inverters",
        description:
          "Reliable and efficient energy source designed for durability and longevity, offering cost-effectiveness and built-in safety features for secure, worry-free energy consumption.",
        image:
          "https://a-us.storyblok.com/f/1006159/810x471/2ddba951c6/string-inverters.jpg/m/1000x0/filters:quality(60):format(webp)",
      },
    ],
    image:
      "https://i.postimg.cc/htSc0sQH/Alice-Springs-0870-(1).webp",
    faqs: [
      {
        q: "Do I need a solar system for my power system?",
        a: "Yes, if you are planning to use solar power to run your home. Every electrical appliance relies on it. A complete solar power system guarantees maximum efficiency, lowering your daily grid consumption and ensuring you are shielded from rising energy costs overheads.",
      },
      {
        q: "Can I install the solar panel myself?",
        a: "We strongly advise professional installation to ensure safety and warranty validity.",
      },
      {
        q: "Should I focus on good solar panel installation?",
        a: "Quality installation is crucial as it affects the efficiency and lifespan of the entire system.",
      },
      {
        q: "How can I boost the service life of solar panels?",
        a: "Regular maintenance and professional cleaning once a year will keep them at peak performance.",
      },
      {
        q: "What size residential system is right for me?",
        a: "It depends heavily on your daily energy consumption and roof space. Our team will analyze your electricity bills and provide a tailored system recommendation ranging typically from 6.6kW to 13.2kW.",
      },
    ],
  },
  "commercial-solar-system": {
    title: "Commercial Solar System",
    description:
      "Protect your business's bottom line from rising energy costs. We design high-yield commercial PV systems tailored to your energy consumption profile.",
    introExtra1:
      "Our commercial solar systems are engineered to maximize your roof space and deliver the highest possible return on investment. We handle everything from grid connection approvals to final commissioning.",
    introExtra2:
      "By reducing operational costs and taking advantage of tax benefits, your business can achieve a fast payback period while projecting a strong commitment to sustainability.",
    products: [
      {
        title: "Central Inverters",
        description:
          "Central inverters are large metal cabinets that efficiently generate and distribute solar electricity, capable of circulating high demand for factories and solar farms.",
        image:
          "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=60&w=1000&auto=format&fit=crop",
      },
      {
        title: "Commercial Panel Arrays",
        description:
          "High-capacity panel layouts designed to withstand harsh industrial environments while delivering massive MW-scale power generation.",
        image:
          "https://a-us.storyblok.com/f/1006159/810x471/62865d0b80/des-1116-csm.jpg/m/1000x0/filters:quality(60):format(webp)",
      },
    ],
    image:
      "https://i.postimg.cc/1zZz07Xx/Alice-Springs-0870-JPG-(2)-(1).webp",
    faqs: [
      {
        q: "What are the financial benefits for my business?",
        a: "Commercial solar provides a high ROI, significantly reduces operational costs, and offers tax benefits, such as instant asset write-offs and STCs/LGCs (Small-scale Technology Certificates / Large-scale Generation Certificates).",
      },
      {
        q: "Will installing solar disrupt my business?",
        a: "We manage installations to ensure minimal to no disruption to your daily operations. Our project managers coordinate with your team for a smooth transition.",
      },
      {
        q: "Can we expand the system later?",
        a: "Yes, our commercial systems are designed to be scalable. If your energy needs grow, we can easily add more panels or battery storage to your existing setup.",
      },
      {
        q: "How long is the payback period for commercial solar?",
        a: "Depending on your usage patterns and the system size, commercial solar installations typically pay for themselves within 3 to 5 years through substantial energy savings.",
      },
      {
        q: "Do you offer financing options for commercial projects?",
        a: "Yes, we work with leading green finance partners to provide flexible financing options, allowing businesses to install solar systems with zero upfront capital.",
      },
    ],
  },
  "battery-storage": {
    title: "Solar Batteries & Storage",
    description:
      "Store your excess solar energy for nighttime use. Add a battery to a new or existing system and take advantage of the 30% federal rebate.",
    introExtra1:
      "A solar battery allows you to maximize your self-consumption by storing the free energy you generated during the day. This provides blackout protection and serious bill savings.",
    introExtra2:
      "Whether you're looking for a hybrid setup for a new solar install or retrofitting an AC-coupled battery to your existing system, our team provides safe, compliant battery installations.",
    products: [
      {
        title: "Tesla Powerwall 3",
        description:
          "The ultimate home battery that stores solar energy for blackout protection and night-time use with a sleek, minimalist design.",
        image:
          "https://solarjuice.com.au/wp-content/uploads/2026/05/Powerwall-and-Backup-Gateway-2-copy-1280x720-Edited-Edited-600x618.png",
      },
      {
        title: "Sungrow",
        description:
          "High-performance modular battery storage solutions offering scalable capacity, deep cycling capabilities, and robust longevity.",
        image:
          "https://i.postimg.cc/6qnsnGMk/6383980259759580924379243-1-removebg-preview.png",
      },
      {
        title: "Sigenergy",
        description:
          "Advanced energy storage systems that integrate seamlessly with your solar panel arrays to provide efficient and reliable backup power.",
        image:
          "https://i.postimg.cc/qMznYkKw/Sigen-Battery-8-k-Wh-with-LED-removebg-preview.png",
      },
      {
        title: "GoodWe",
        description:
          "Intelligent and flexible battery solutions designed to maximize self-consumption and deliver superior backup performance.",
        image:
          "https://www.goodwe.com.au/Public/Uploads/uploadfile4/images/20251014/ESA3-10KAll-in-oneSystem-1-495.png",
      },
      {
        title: "Fox ESS",
        description:
          "High-voltage and scalable battery options known for excellent efficiency, rapid charging, and long lifespan.",
        image:
          "https://solarjuice.com.au/wp-content/uploads/2026/05/ECS.1-406.png",
      },
    ],
    image:
      "https://i.postimg.cc/Nf2ytHrg/Sigenergy-(1).webp",
    faqs: [
      {
        q: "Can a battery run my whole house during a blackout?",
        a: "It largely depends on the specific battery capacity you choose and your home's overall energy consumption during the outage. We can custom design systems specifically equipped to back up just your essential circuits or your entire home for extended periods.",
      },
      {
        q: "Can I add a battery to my existing solar system?",
        a: "Yes, we can retrofit a battery to almost any existing solar PV system, either by replacing your current inverter with a hybrid one or adding an AC-coupled battery solution.",
      },
      {
        q: "How long do solar batteries last?",
        a: "Most premium lithium-ion solar batteries come with a 10-year warranty and are expected to last well beyond that with proper maintenance.",
      },
      {
        q: "Are solar batteries worth the investment?",
        a: "Absolutely if you want blackout protection or if you use most of your electricity during the evening when solar panels aren't producing power. They significantly increase your self-consumption rate.",
      },
      {
        q: "Do I need council approval to install a battery?",
        a: "Usually, standard battery installations only require grid connection approval from your local utility provider, which our administrative team fully manages on your behalf.",
      },
    ],
  },
  "ev-chargers": {
    title: "EV Chargers",
    description:
      "Get ready for the future with smart EV chargers. We provide installation and integration with your existing solar system.",
    introExtra1:
      "Charging your electric vehicle with excess solar power is the ultimate way to drive for free. Our smart chargers can be configured to only use solar energy when available.",
    introExtra2:
      "We offer residential wall-box chargers as well as commercial fleet charging solutions, installed by fully licensed electricians to strict Australian standards.",
    products: [
      {
        title: "Sigenergy",
        description:
          "Innovative EV chargers that seamlessly integrate with your home's energy ecosystem for smart, efficient charging.",
        image:
          "https://aussiesolartech.com.au/wp-content/uploads/2025/11/sigenergy-ev-charger.png",
      },
      {
        title: "Myenergi",
        description:
          "Highly adaptable chargers allowing you to charge your vehicle using 100% free energy generated from your solar panels.",
        image:
          "https://images.squarespace-cdn.com/content/v1/66f20e04857fd124e6454b08/6c7f45e9-1a80-45fe-844a-76f755cabe39/Myenergi+Zappi+smart+EV+charger+7kW+Single+phase+-+white+with+type+2%2C+6.5m+cable.png?format=1500w",
      },
      {
        title: "Fronius",
        description:
          "Intelligent charging solutions offering dynamic load balancing and optimal utilization of your surplus solar energy.",
        image: "https://i.postimg.cc/2yrnqv99/Wattpilot-Go-22-J-2-0-AUS-bundle-removebg-preview.png",
      },
    ],
    image:
      "https://www.digi.com/getattachment/ece175a2-6f34-43e4-8f54-1f9b07df9b06/gettyimages-1387159408-1280x720.jpg?lang=en-us&width=1280&height=720&ext=.jpg",
    faqs: [
      {
        q: "Can I charge my EV using only solar power?",
        a: "Yes absolutely! With a smartly integrated EV charger connected directly to your solar system, you can configure it to charge your vehicle solely by utilizing your excess generated solar energy. This means you will practically be driving for free while maximizing self-consumption.",
      },
      {
        q: "Do you install EV chargers for commercial properties?",
        a: "Absolutely. We provide and expertly install scalable fleet charging stations as well as robust commercial EV chargers designed for both staff and public utility. Each commercial installation comes fully equipped with intelligent load management software components.",
      },
      {
        q: "How fast will my EV charge?",
        a: "Charging speeds depend on the charger's kW rating and your EV's onboard charger limit. A standard 7kW home charger adds about ~40km of range per hour.",
      },
      {
        q: "Can I install an EV charger if I don't have solar panels yet?",
        a: "Yes! You can install an EV charger now to charge from the grid, and it will be perfectly ready to integrate with a solar panel system whenever you decide to upgrade.",
      },
      {
        q: "Are the EV chargers weather-proof?",
        a: "Yes, the chargers we install have high IP ratings (usually IP65), meaning they are fully protected against dust and heavy rain, making them safe for outdoor installation.",
      },
    ],
  },
  "solar-inverters": {
    title: "Solar Inverter Installation",
    description:
      "Oneroof Solar is a premier solar inverter installation company that aims to make the world a greener and more sustainable place. Our team of experts has been providing high-quality solar energy solutions for homes and businesses for years.",
    introExtra1:
      "We understand that switching to solar energy can be overwhelming, which is why we are here to guide you every step of the way. From initial consultation to installation and maintenance, our dedicated team will ensure a smooth and hassle-free experience for you.",
    introExtra2:
      "As the top-rated solar inverter installation Darwin, Alice Springs, Palmerston NT, we install only high-quality solar inverters for clients. Our certified solar inverter installation experts complete the work with full reliability and durability.",
    products: [
      {
        title: "Sungrow",
        description:
          "Industry-leading solar inverters known for high efficiency, reliability, and excellent warranty support for residential and commercial systems.",
        image:
          "https://official-oversears-file.sungrowpower.com/news-images/b8828e46-8516-42e9-be65-a0216ecb2d82.png",
      },
      {
        title: "Fronius",
        description:
          "Premium Austrian-engineered inverters offering advanced monitoring, smart grid readiness, and exceptional long-term performance.",
        image:
          "https://i.postimg.cc/xCDvpbfw/Primo-Gen24-bd96687e-0179-46bd-9f1c-6fef4ea2ca75-800x800-removebg-preview.png",
      },
      {
        title: "Sigenergy",
        description:
          "Intelligent energy solutions that seamlessly integrate solar generation, storage, and EV charging within a single unified platform.",
        image:
          "https://i.postimg.cc/JhXTZNKm/Sigenergy-M1PVInverter50-125k-WThree-Phase-Commercial-String-Solar-Inverter-removebg-preview-(3).png",
      },
      {
        title: "GoodWe",
        description:
          "Versatile and highly efficient solar inverters designed to maximize yield and provide reliable power generation for any roof.",
        image:
          "https://solarshop.pk/wp-content/uploads/2021/01/goodwe-25KW-on-grid-smt.png",
      },
      {
        title: "Foxess",
        description:
          "Advanced solar inverters featuring cutting-edge design, delivering powerful performance and smart energy management capabilities.",
        image:
          "https://i.postimg.cc/8zmdSZyT/Fox-K-Series-IP65-Protection-7kw-8kw-9kw-10kw-10-5kw-Single-Phase-Hybrid-Inverter-removebg-preview-(.png",
      },
    ],
    image:
      "https://i.postimg.cc/WzCPSt2q/DSC00505-Enhanced-NR-jpg-(3)-(1).webp",
    faqs: [
      {
        q: "Do I need a solar inverter for my solar power system?",
        a: "Yes, absolutely. An inverter is the critical bridge if you are planning to use the solar panel to power your home or business. Since every standard electrical appliance in typical homes and office spaces runs exclusively on AC power, the inverter dynamically converts the DC power generated.",
      },
      {
        q: "Can I install the solar panel myself?",
        a: "It is highly recommended to use certified installers for safety and warranty protection.",
      },
      {
        q: "Should I focus on good solar panel installation or a reliable solar inverter installation?",
        a: "Both are crucial. A good panel needs a reliable inverter to efficiently convert and utilize the generated power.",
      },
      {
        q: "How can I boost the service life of solar inverters?",
        a: "Ensure they are installed in a shaded area and have them inspected during your annual maintenance checks.",
      },
      {
        q: "What is the difference between string inverters and micro-inverters?",
        a: "String inverters connect to a series of panels and are cost-effective, while micro-inverters are installed on each individual panel, optimizing performance if your roof suffers from partial shading.",
      },
    ],
  },
  "repairs-and-maintenance": {
    title: "Repairs & Maintenance",
    description:
      "Keep your system running at peak performance with professional panel cleaning, system health checks, and repairs.",
    introExtra1:
      "In the Northern Territory, dust and debris build-up can significantly reduce panel efficiency. Our professional cleaning and maintenance services restore your system's performance.",
    introExtra2:
      "Our certified technicians can diagnose, repair, and maintain solar PV systems installed by other companies or 'out-of-business' installers, ensuring you are never left without support.",
    products: [
      {
        title: "Professional Panel Cleaning",
        description:
          "Using specialized equipment to safely remove dust, bird droppings, and completely clean solar panels for restored output.",
        image:
          "https://plus.unsplash.com/premium_photo-1682145358254-56e9ab8049ca?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "System Health Checks",
        description:
          "Comprehensive testing of inverters, cabling, and isolators to prevent faults and ensure your system meets current safety standards.",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgRHafd0ihpxUFttIlyiGDhBI3sNiTixrMLg&s",
      },
    ],
    image:
      "https://solarsme.com/wp-content/uploads/2022/04/4-1.webp",
    faqs: [
      {
        q: "How often should I have my solar panels cleaned?",
        a: "We strongly recommend scheduling a professional annual clean and comprehensive inspection. This is particularly crucial in the NT region, where frequent dust build-up and debris accumulation during the heavy dry season can substantially bottleneck your panel efficiency metrics.",
      },
      {
        q: "Do you repair systems you didn't install?",
        a: 'Yes, our certified technicians can diagnose, repair, and maintain solar PV systems installed by other companies or "out-of-business" installers.',
      },
      {
        q: "What does a health check involve?",
        a: "A health check includes thermal imaging of panels, testing inverter performance, checking all DC/AC isolators for safety, and ensuring there's no weather damage.",
      },
      {
        q: "How quickly can you respond to a system breakdown?",
        a: "We prioritize emergency repairs and aim to dispatch a qualified solar technician to your property within 24 to 48 hours to minimize any downtime.",
      },
      {
        q: "Can you fix my inverter if it displays an error code?",
        a: "Yes, our technicians are highly experienced in diagnosing and repairing all major inverter brands. We can often resolve software faults or manage warranty hardware replacements directly with the manufacturer.",
      },
    ],
  },
  "solar-panel": {
    title: "Solar Panels",
    description:
      "Explore our range of industry-leading solar panels known for high efficiency and impressive warranties. We supply top-tier PV technology to suit every roof type.",
    introExtra1:
      "From monocrystalline to bifacial panels, we ensure you get the absolute best sunlight capture technology. Our team rigorously evaluates each panel model before adding it to our inventory.",
    introExtra2:
      "By sourcing from tier-1 manufacturers, we guarantee performance longevity even under the intense Australian sun. Invest in top-quality solar panels for unparalleled reliability.",
    products: [
      {
        title: "AIKO",
        description:
          "High-efficiency, premium N-type ABC solar panels delivering maximum power output and stunning all-black aesthetics.",
        image:
          "https://solarjuice.com.au/wp-content/uploads/2026/05/20873-600x529.png",
      },
      {
        title: "REC",
        description:
          "Pioneering highly efficient, low-degradation solar panels backed by an industry-leading comprehensive 25-year ProTrust warranty.",
        image:
          "https://i.postimg.cc/Th46LV0n/REC-Alpha-Series-removebg-preview.png",
      },
      {
        title: "JINKO SOLAR",
        description:
          "Globally recognized Tier 1 solar panels offering superior reliability, excellent low-light performance, and tremendous value.",
        image:
          "https://i.postimg.cc/T58B094S/Jinko-Solar-Tiger-Neo-JKM585N-72HL4-BDV-585W-ver2-1-removebg-preview-(1).png",
      },
    ],
    image:
      "https://i.postimg.cc/ZqJnC3Sv/high-level-description-shot-on-iphone-a-Q9Cc-Iy-X7X-u10npe4Pfzlg-ngfs-MO-1Tw-CCPDb0e-Ibtc-A-cover-sd.jpg",
    faqs: [
      {
        q: "Which solar panel technology is best?",
        a: "Monocrystalline panels are currently considered the clear gold industry standard due to their exceptional high efficiency ratings, sleek dark aesthetic, and impressive longevity. They are specifically optimal for maximizing power output when dealing with tightly limited roof spaces.",
      },
      {
        q: "Do the panels come with a warranty?",
        a: "Yes, providing you ultimate peace of mind, all our premium panels feature a strict minimum 25-year performance dropoff warranty, running perfectly alongside our extensive and comprehensive structural product warranties covering all types of manufacturing defects.",
      },
      {
        q: "Will they withstand hail?",
        a: "To a degree. The models we install undergo rigorous stress testing and boast certified resistance to typical hail storms.",
      },
      {
        q: "Do solar panels work on cloudy days?",
        a: "Yes, solar panels still generate electricity on cloudy or rainy days, although their output will be lower compared to direct sunlight. Modern high-efficiency panels are highly effective in low-light conditions.",
      },
      {
        q: "How difficult is it to maintain solar panels?",
        a: "Solar panels require very little maintenance. Since there are no moving parts, a simple professional clean once a year is usually enough to keep them operating at maximum efficiency.",
      },
    ],
  },
  "solar-panel-installation": {
    title: "Solar Panel Installation",
    description:
      "Seamless start-to-finish solar panel installations tailored to maximize the output of your rooftop.",
    introExtra1:
      "Our CEC accredited installers manage every angle, ensuring correct tilt, secure rail mounting, and fault-free integration with your electrical board.",
    introExtra2:
      "Precision is key. A sub-optimal installation can cost you heavily in lost energy. Trust Oneroof Solar for diligent and robust installation workmanship that stands the test of time.",
    products: [
      {
        title: "Flush Mount Integration",
        description:
          "Aesthetic and secure flush mounting systems that keep panels snug to your roof line, mitigating wind strain.",
        image:
          "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=60&w=1000&auto=format&fit=crop",
      },
      {
        title: "Tilt Frame Structures",
        description:
          "Custom-angled framing to perfectly position solar arrays towards the sun on flat roofs.",
        image:
          "https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?q=60&w=1000&auto=format&fit=crop",
      },
    ],
    image:
      "https://www.hachettebookgroup.com/wp-content/uploads/2023/02/WEB-121_cHesh_InstallYourOwnSolarPanels.jpg",
    faqs: [
      {
        q: "How long does installation take?",
        a: "Most standard residential solar panel setups can be fully installed, safety-tested, and officially commissioned by our expert teams within a single day, ensuring minimal disruption to your daily home routine and schedule.",
      },
      {
        q: "What about council approvals?",
        a: "Our administrative team will completely handle all necessary bureaucratic paperwork on your behalf. This covers everything from submitting initial grid connect applications to utility companies, right through to securing the final local council regulatory compliance certificates.",
      },
      {
        q: "Can my roof support the weight?",
        a: "All standard roofs easily support modern solar panels. We conduct a fast structural assessment during your consultation to be certain.",
      },
      {
        q: "Do I need to be home during the installation?",
        a: "You only need to be home briefly at the beginning to confirm panel placement and at the end for the system handover. Our crew handles the rest independently.",
      },
      {
        q: "Will the installation damage my roof?",
        a: "No, our certified installers use specialized, weather-sealed mounting brackets specific to your roof type (tin or tile) to ensure the structural integrity of your roof is completely maintained.",
      },
    ],
  },
  "solar-inverter-installation": {
    title: "Solar Inverter Installation",
    description:
      "We supply and install top-tier string, micro, and hybrid inverters to transform DC solar energy into robust AC power for your property.",
    introExtra1:
      "Your inverter is the brains of your solar setup. It requires expert calibration and safe wall-mounting. We guarantee a neat, code-compliant install that maximizes conversion efficiency.",
    introExtra2:
      "Whether upgrading an old unit or building a fresh system, our installers connect your inverter seamlessly, walking you through the monitoring apps before we depart.",
    products: [
      {
        title: "Hybrid Configuration",
        description:
          "Specialized installation pairing the inverter smoothly with battery storage, routing excess power flawlessly.",
        image:
          "https://oneroofsolar.com.au/wp-content/uploads/2026/03/dji_fly_20230817_185322_707_1692349964125_photo-scaled.jpg",
      },
      {
        title: "Micro-Inverter Topology",
        description:
          "Roof-level installations fixing micro-inverters beneath each individual panel to overcome complex shading issues.",
        image:
          "https://igrowattinverter.com/wp-content/uploads/2024/05/What-is-a-micro-inverter-and-how-does-it-work.webp",
      },
    ],
    image:
      "https://www.sunrayspower.com.au/wp-content/uploads/2021/12/New-Blog-2.jpg",
    faqs: [
      {
        q: "Where does the inverter go?",
        a: "Typically, inverters are securely mounted on an easily accessible external wall located near your primary switchboard. Alternatively, they can be placed in a well-ventilated garage environment safely out of direct harsh sunlight to maximize their ongoing thermal efficiency.",
      },
      {
        q: "Can I connect my phone to it?",
        a: "Yes, almost all modern inverter models feature seamless Wi-Fi integration. This allows you comprehensive real-time monitoring insights regarding your energy generation and usage directly through intuitive smartphone mobile applications anywhere you go.",
      },
      {
        q: "What if it fails?",
        a: "Inverters usually carry a 5-10 year warranty. Our team operates swift replacement call-outs to minimize downtime.",
      },
      {
        q: "Should I upgrade my inverter when adding a battery?",
        a: "If your current inverter is not a 'hybrid' model, we will typically swap it for a hybrid inverter or install an AC-coupled battery system that works alongside your existing setup.",
      },
      {
        q: "Does the inverter make a lot of noise?",
        a: "Modern string inverters operate very quietly, typically producing a low hum that is barely noticeable, thanks to advanced, fanless convection cooling designs.",
      },
    ],
  },
  "solar-battery-installation": {
    title: "Solar Battery Installation",
    description:
      "Expert integration of high-capacity storage batteries to bulletproof your home against grid outages.",
    introExtra1:
      "Installing a massive lithium-ion battery requires rigorous electrical safety standards. We manage the heavy-lifting, secure mounting, and complex software syncing to your home network.",
    introExtra2:
      "Keep Your Home Powered During Outages: We all know the wet season can bring severe disruptions and impact grid reliability. With a dedicated battery backup system, you can securely power your essential loads through any blackout, achieving true energy independence.",
    products: [
      {
        title: "Wall-Mounted Units",
        description:
          "Sleek, low-profile storage modules bolted securely to solid brickwork, ensuring space-saving and aesthetic appeal.",
        image:
          "https://jmhpower.com/wp-content/uploads/2024/07/WALL-MOUNTED-SOLAR-PANELS.jpg",
      },
      {
        title: "Stackable Systems",
        description:
          "Modular floor-standing battery arrays that can easily scale as your family’s energy demands grow.",
        image:
          "https://skyenergy.com.au/wp-content/uploads/2021/10/battery-install-1-1024x768.jpg",
      },
    ],
    image:
      "https://www.solarquotes.com.au/wp-content/uploads/2023/10/byd-fronius-backboard.jpg",
    faqs: [
      {
        q: "Is it safe to have a big battery inside?",
        a: "Modern battery units are tested to be highly safe and are meticulously engineered with advanced automated thermal regulation systems. However, as a best-practice precaution, we typically recommend installing them in insulated garages or against fully shaded external walls.",
      },
      {
        q: "Will I lose power during installation?",
        a: "Brief scheduled outages are necessary while tying the battery into your switchboard, usually lasting out a short duration.",
      },
      {
        q: "Can it charge from the grid?",
        a: "Yes, they can be configured to draw from the grid during super off-peak tariffs, saving you even more money.",
      },
      {
        q: "Where is the best place to install the battery?",
        a: "Batteries are best installed in a cool, shaded area like a garage or on a south-facing exterior wall. This protects the unit from direct sunlight and temperature extremes, prolonging its lifespan.",
      },
      {
        q: "How long does a battery installation typically take?",
        a: "A standard battery retrofit usually takes half a day to a full day, depending on the complexity of your switchboard and the specific battery chemistry being installed.",
      },
    ],
  },
};

const defaultService = servicesData["solar-inverters"];

function EvChargerHero({ service }: { service: any }) {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A1118]">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen grayscale-[50%]"
        >
          <source
            src="https://cdn.pixabay.com/video/2021/11/14/96813-644781744_tiny.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118] via-[#0A1118]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1118] via-[#0A1118]/80 to-transparent flex"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn isHero>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase">
              Drive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">
                Electric.
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-lg mb-10 font-medium border-l-2 border-brand-400/50 pl-6">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 bg-brand-500 text-slate-900 border-none font-bold hover:bg-brand-400 transition-all h-14 hover:-translate-y-1 shadow-[0_0_20px_rgba(140,198,63,0.3)] uppercase tracking-widest"
                asChild
              >
                <Link to="/contact">
                  Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <FadeIn isHero delay={0.2} className="relative hidden lg:block">
            <div className="w-full aspect-square bg-gradient-to-br from-brand-500/20 to-emerald-600/20 rounded-full blur-3xl absolute inset-0 animate-pulse"></div>
            <img referrerPolicy="no-referrer" fetchPriority="high"
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=60&w=1000&auto=format&fit=crop"
              alt="EV Charger"
              className="relative z-10 w-full h-[600px] object-cover rounded-[3rem] border border-white/10 shadow-2xl opacity-90"
            />

            <div className="absolute top-10 right-10 bg-[#0A1118]/80 backdrop-blur-md border border-brand-500/30 p-6 rounded-2xl z-20">
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-black text-white">22</span>
                <span className="text-brand-400 font-bold mb-1">kW</span>
              </div>
              <div className="text-slate-400 text-xs uppercase tracking-widest font-mono">
                Max Charging Speed
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function EvChargerIntro({ service }: { service: any }) {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-600 font-bold text-sm mb-6 border border-brand-100 uppercase tracking-wider">
              <Zap className="w-4 h-4" /> Smart Charging
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
              Fuel your journey with{" "}
              <span className="text-brand-500">solar energy.</span>
            </h2>
            <div className="space-y-6 text-slate-600 text-lg font-medium leading-relaxed">
              <p>{service.introExtra1}</p>
              <p>{service.introExtra2}</p>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-l-4 border-brand-500 pl-4">
                <div className="text-3xl font-black text-slate-900 mb-1">
                  100%
                </div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                  Green Energy
                </div>
              </div>
              <div className="border-l-4 border-slate-200 pl-4">
                <div className="text-3xl font-black text-slate-900 mb-1">
                  Fast
                </div>
                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">
                  Charging Speeds
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="relative">
            <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden relative shadow-2xl">
              <img referrerPolicy="no-referrer" loading="lazy"
                src="https://images.unsplash.com/photo-1660601931649-14eb02330f8d?q=60&w=1000&auto=format&fit=crop"
                alt="EV charging"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 lg:bottom-10 lg:left-10 lg:right-10 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center gap-5">
                <div className="w-14 h-14 bg-brand-500 rounded-xl flex items-center justify-center shrink-0">
                  <Battery className="w-7 h-7 text-slate-900" />
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold text-lg mb-1">
                    Solar Integration
                  </h4>
                  <p className="text-slate-500 text-sm font-medium">
                    Charge directly from your panels.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function EvChargerProducts({ service }: { service: any }) {
  return (
    <section className="py-24 lg:py-32 bg-[#0A1118] relative">
      <div className="absolute inset-0 bg-dot-white/[0.05] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 text-slate-300 font-semibold text-sm mb-6 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_10px_rgba(140,198,63,0.8)]"></span>
              Hardware Portfolio
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter">
              Premium <br />
              <span className="text-brand-400">Charging</span> Solutions.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="md:max-w-xs">
            <p className="text-slate-400 font-medium">
              State-of-the-art charging terminals designed for durability,
              speed, and seamless solar integration.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {service.products.map((product: any, idx: number) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="bg-slate-900/40 rounded-[2rem] p-6 lg:p-8 border border-white/10 shadow-2xl hover:border-brand-500/40 transition-all duration-500 h-full flex flex-col group relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150 group-hover:bg-brand-500/20 z-0"></div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="h-64 sm:h-[320px] mb-8 rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative group-hover:border-white/20 transition-colors duration-500 flex items-center justify-center p-2">
                    <img referrerPolicy="no-referrer" loading="lazy"
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 opacity-100 z-0 drop-shadow-2xl"
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-slate-300 text-xs font-mono tracking-widest uppercase shadow-sm">
                      EV Charger
                    </span>
                    <span className="px-3 py-1 bg-brand-500/10 border border-brand-500/20 rounded-md text-brand-400 text-xs font-mono tracking-widest uppercase shadow-sm flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Smart Ready
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 tracking-tighter group-hover:text-brand-400 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10">
                    {product.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10 group-hover:border-white/20 transition-colors">
                    <span className="text-sm font-bold text-white tracking-widest uppercase">
                      Explore Terminal
                    </span>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-500 group-hover:text-slate-900 transition-all duration-300 text-white shadow-sm border border-white/10 group-hover:border-brand-400">
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function EvChargerBenefits({ service }: { service: any }) {
  return (
    <section className="py-24 bg-brand-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <FadeIn>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight">
              Why Choose Our EV Chargers?
            </h2>
            <p className="text-brand-900 text-lg font-bold max-w-2xl mx-auto">
              Future-proof your home with intelligent charging solutions that
              grow with your needs.
            </p>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FadeIn
            delay={0.1}
            className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-500 mb-6 shadow-lg">
              <Sun className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight">
              Solar Maximisation
            </h3>
            <p className="text-white/90 font-medium leading-relaxed text-[15px]">
              Automatically route excess solar generation directly into your car
              instead of the grid, driving for essentially zero cost.
            </p>
          </FadeIn>

          <FadeIn
            delay={0.2}
            className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-500 mb-6 shadow-lg">
              <Smartphone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight">
              Smart App Control
            </h3>
            <p className="text-white/90 font-medium leading-relaxed text-[15px]">
              Monitor charging speeds, set schedules during off-peak tariff
              hours, and track energy usage all from your smartphone.
            </p>
          </FadeIn>

          <FadeIn
            delay={0.3}
            className="bg-white/10 backdrop-blur-md rounded-[2rem] p-8 border border-white/20 hover:bg-white/20 hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-brand-500 mb-6 shadow-lg">
              <Shield className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight">
              Safe & Certified
            </h3>
            <p className="text-white/90 font-medium leading-relaxed text-[15px]">
              Installed exclusively by our Clean Energy Council accredited
              electricians to meet strict Australian safety standards.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { SEO } from "../components/SEO";

export function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();

  const [dbSeo, setDbSeo] = useState<any>(null);

  useEffect(() => {
    async function fetchDbService() {
      if (!slug) return;
      try {
        const docRef = doc(db, 'services', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.seo) setDbSeo(data.seo);
        }
      } catch (e) {
        console.warn("Using offline fallback data for Service CMS");
      }
    }
    fetchDbService();
  }, [slug]);

  const service =
    slug && servicesData[slug] ? servicesData[slug] : defaultService;
  const currentSlug = slug || "solar-inverters";
  const isDarkTheme = [
    "ev-chargers",
    "solar-inverters",
    "solar-panel",
    "battery-storage",
  ].includes(currentSlug);

  return (
    <div key={currentSlug} className="bg-white text-slate-900 font-sans">
      <SEO seo={dbSeo || { title: service.title, metaDescription: service.description }} />
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#0A1118]">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay"></div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
              <FadeIn>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
                  {service.title.split(" ").map((word, i, arr) =>
                    i === arr.length - 1 ? (
                      <span
                        key={i}
                        className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400 whitespace-nowrap"
                      >
                        {word}
                      </span>
                    ) : (
                      word + " "
                    ),
                  )}
                </h1>
                <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg mb-10 font-medium">
                  {service.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    size="lg"
                    className="rounded-full px-8 bg-brand-500 text-slate-900 border-none font-bold hover:bg-brand-400 transition-all h-14 hover:-translate-y-1 shadow-[0_0_20px_rgba(140,198,63,0.3)]"
                    asChild
                  >
                    <Link to="/contact">
                      Get a Free Quote <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 text-white border-white/20 font-bold hover:bg-transparent hover:text-white hover:border-white/20 transition-all h-14 hover:-translate-y-1"
                    asChild
                  >
                    <a href="tel:0483986444">Call Us 0483986444</a>
                  </Button>
                  <div className="flex items-center gap-4 text-white text-sm font-semibold px-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full border-2 border-[#0A1118] bg-slate-800 flex items-center justify-center overflow-hidden"
                        >
                          <img referrerPolicy="no-referrer" loading="lazy"
                            src={`https://i.pravatar.cc/100?img=${i + 10}`}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col">
                      <span className="flex items-center text-brand-400 gap-1">
                        <Zap className="w-3 h-3 fill-brand-400" /> 5.0 Rating
                      </span>
                      <span className="text-slate-500">Trusted by 5k+</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn
                delay={0.2}
                className="relative group cursor-pointer lg:h-[600px]"
              >
                <div className="absolute inset-0 bg-brand-500/20 rounded-[3rem] transform rotate-3 scale-105 transition-transform duration-700 group-hover:rotate-6 blur-sm"></div>
                <div className="relative h-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center bg-slate-900">
                  <img referrerPolicy="no-referrer" loading="lazy"
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1118] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-500/20 rounded-full blur-[40px] group-hover:bg-brand-500/40 transition-colors duration-700"></div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

      <PartnersMarquee />

      {/* Intro Modern Sections */}
      {isDarkTheme ? (
        <DarkIntro service={service} slug={currentSlug} />
      ) : (
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden border-t border-slate-100">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform origin-top-right pointer-events-none"></div>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-600 font-bold mb-8 uppercase tracking-wider text-xs shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                About This Service
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-10 tracking-tight">
                {service.title} Excellence
              </h2>
              
              <div className="prose prose-lg prose-slate max-w-none text-slate-600 space-y-6 mx-auto text-left sm:text-center">
                <p className="text-xl sm:text-2xl font-medium text-slate-800 leading-relaxed">
                  {service.description}
                </p>
                {service.introExtra1 && (
                  <p className="text-lg">
                    {service.introExtra1}
                  </p>
                )}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Product / Features Grid Carousel/Bento */}
      {isDarkTheme ? (
        <DarkProducts service={service} slug={currentSlug} />
      ) : (
        <PackagesSection />
      )}

      {/* Benefits/Features Grid */}
      {isDarkTheme ? (
        <DarkBenefits service={service} slug={currentSlug} />
      ) : (
        <section className="py-24 bg-[#0a1118] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
              <div className="max-w-2xl">
                <FadeIn>
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-sm mb-6 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse"></span>
                    <span className="text-sm font-bold text-white uppercase tracking-widest">
                      Why Choose Us
                    </span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1]">
                    Why Choose Our <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400">
                      {service.title}?
                    </span>
                  </h2>
                </FadeIn>
              </div>
              <FadeIn>
                <p className="text-lg text-slate-300 max-w-md lg:mb-4">
                  We don't just supply equipment; we deliver comprehensive
                  energy solutions designed for longevity, performance, and
                  maximum return on investment.
                </p>
              </FadeIn>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FadeIn
                delay={0.1}
                className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 hover:border-brand-500/30 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-brand-500/20 text-brand-400 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Best Warranties
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  Relax with total peace of mind knowing your system is backed
                  by comprehensive performance guarantees.
                </p>
              </FadeIn>
              <FadeIn
                delay={0.2}
                className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 hover:border-brand-500/30 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Max Efficiency
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  Our tier-1 hardware paired with optimal design methodologies
                  ensures you squeeze every drop of power.
                </p>
              </FadeIn>
              <FadeIn
                delay={0.3}
                className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 hover:border-brand-500/30 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Custom Built
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  We reject cookie-cutter setups. Every system is rigorously
                  tailored to match your specific roof profile.
                </p>
              </FadeIn>
              <FadeIn
                delay={0.4}
                className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 hover:border-brand-500/30 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-2xl flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <PiggyBank className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Fast Payback
                </h3>
                <p className="text-slate-400 leading-relaxed font-medium">
                  By reducing your reliance on expensive grid power, our systems
                  typically pay for themselves rapidly.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-50/50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50/50 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/3"></div>
        <div className="absolute inset-0 bg-grid-slate-100/[0.04] bg-[size:40px_40px]"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 font-semibold text-sm mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                Our Proven Process
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                How We Deliver{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-emerald-500">
                  Excellence
                </span>
              </h2>
              <p className="text-lg font-medium text-slate-600">
                A seamless, fully-managed 4-step process from your first quote
                to switching on your new {service.title.toLowerCase()}.
              </p>
            </FadeIn>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <FadeIn delay={0.1}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                <div className="text-7xl lg:text-8xl font-black text-slate-100 group-hover:text-brand-50 transition-colors pointer-events-none select-none w-32 text-center shrink-0">
                  01
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                    Consultation & Quote
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    We analyze your energy bills and survey your site to
                    understand your exact requirements. We will give you a
                    transparent, custom quote.
                  </p>
                </div>
                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-brand-50 items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 shrink-0">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                <div className="text-7xl lg:text-8xl font-black text-slate-100 group-hover:text-brand-50 transition-colors pointer-events-none select-none w-32 text-center shrink-0">
                  02
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                    System Design
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Our engineers craft a custom layout to maximize sunlight
                    capture and efficiency. We ensure all equipment fits
                    perfectly within your space.
                  </p>
                </div>
                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-brand-50 items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 shrink-0">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                <div className="text-7xl lg:text-8xl font-black text-slate-100 group-hover:text-brand-50 transition-colors pointer-events-none select-none w-32 text-center shrink-0">
                  03
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                    Expert Installation
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Our CEC accredited installers fit your system safely,
                    neatly, and to strict regulations. The installation process
                    is swift and minimally disruptive.
                  </p>
                </div>
                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-brand-50 items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 shrink-0">
                  <ArrowRight className="w-8 h-8" />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center bg-white rounded-[2rem] p-8 lg:p-10 border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-brand-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                <div className="text-7xl lg:text-8xl font-black text-slate-100 group-hover:text-brand-50 transition-colors pointer-events-none select-none w-32 text-center shrink-0">
                  04
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">
                    Commissioning
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    We test everything, connect you to the grid, and show you
                    how to monitor your savings. You are ready to start
                    generating clean energy!
                  </p>
                </div>
                <div className="hidden md:flex w-16 h-16 rounded-2xl bg-brand-50 items-center justify-center text-brand-600 group-hover:bg-brand-500 group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 shrink-0">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection faqs={service.faqs} />

      <GoogleReviews />

      {/* CTA / Contact Section */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-slate-200 opacity-50 pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative border border-slate-800">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Contact Info Side */}
              <div className="p-6 sm:p-10 lg:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-brand-400 font-semibold text-sm w-fit shadow-sm mb-8 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                  Ready to upgrade?
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                  Unleash The Power Of Solar With{" "}
                  <span className="text-brand-400">Oneroof</span>
                </h2>
                <p className="text-slate-400 text-lg leading-relaxed mb-12 font-medium">
                  Hire Oneroof Solar for your {service.title.toLowerCase()}{" "}
                  setup. Connect with our team for reliable and affordable
                  installation! We are happy to help anytime.
                </p>

                <div className="space-y-8">

                  <div className="flex items-center gap-6 group cursor-pointer lg:hidden xl:flex">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-300">
                      <Phone className="w-6 h-6 text-brand-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
                        Call Us
                      </p>
                      <p className="text-white font-bold text-lg group-hover:text-brand-400 transition-colors">
                        0483 986 444 (Darwin)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group cursor-pointer lg:hidden xl:flex">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-300">
                      <Phone className="w-6 h-6 text-brand-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
                        Call Us
                      </p>
                      <p className="text-white font-bold text-lg group-hover:text-brand-400 transition-colors">
                        0483 937 004 (Alice Springs)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-300">
                      <Mail className="w-6 h-6 text-brand-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
                        Email Us
                      </p>
                      <p className="text-white font-bold text-lg group-hover:text-brand-400 transition-colors">
                        info@oneroofsolar.com.au
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group cursor-pointer">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:border-brand-500 transition-all duration-300">
                      <MapPin className="w-6 h-6 text-brand-400 group-hover:text-slate-900 transition-colors" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">
                        Visit Us
                      </p>
                      <p className="text-white font-bold text-sm group-hover:text-brand-400 transition-colors">
                        Darwin: 3/97 Pruen Rd, Berrimah NT 0828
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Side */}
              <div className="p-6 sm:p-10 lg:p-16 bg-slate-800/30 backdrop-blur-md relative z-10 flex flex-col justify-center">
                <h3 className="text-3xl font-bold text-white mb-2">
                  Book Your Consultation
                </h3>
                <p className="text-slate-400 font-medium mb-8">
                  We will get back to you within one business day.
                </p>

                <div className="w-full relative bg-transparent rounded-xl overflow-hidden" style={{ minHeight: "552px" }}>
                  <iframe
                    src="https://api.oneroofsolar.com.au/widget/form/3uXInokjWftJSJgePj2x"
                    style={{ width: "100%", height: "100%", border: "none", borderRadius: "8px", minHeight: "552px" }}
                    id="inline-3uXInokjWftJSJgePj2x" 
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Contact Us "
                    data-height="552"
                    data-layout-iframe-id="inline-3uXInokjWftJSJgePj2x"
                    data-form-id="3uXInokjWftJSJgePj2x"
                    title="Contact Us "
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
