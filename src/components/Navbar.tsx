import { Link, useLocation } from "react-router-dom";
import { Sun, Menu, X, Phone, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { motion, AnimatePresence } from "motion/react";

function MobileNavItem({ item, setIsOpen, expanded, onToggle }: { item: any; setIsOpen: (val: boolean) => void; expanded: boolean; onToggle: () => void; }) {
  const location = useLocation();

  if (item.href) {
    return (
      <Link
        to={item.href}
        onClick={() => setIsOpen(false)}
        className={`block px-4 py-3.5 text-[16px] font-bold rounded-xl transition-all ${
          location.pathname === item.href
            ? "bg-brand-50 text-brand-600 shadow-sm"
            : "text-slate-700 hover:bg-slate-50 hover:text-brand-600"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <button 
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-3.5 text-[16px] font-bold text-slate-900 rounded-xl hover:bg-slate-50 transition-colors text-left"
      >
        <span>{item.label}</span>
        <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-1 mb-2 flex flex-col space-y-1 pl-4 border-l-2 border-brand-100 mx-4">
              {item.children?.map((child: any) => (
                <Link
                  key={child.label}
                  to={child.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold text-slate-600 hover:text-brand-600 rounded-lg hover:bg-brand-50/50 transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    {
      label: "Solar System",
      children: [
        { href: "/services/residential-solar-system", label: "Residential Solar Systems" },
        { href: "/services/commercial-solar-system", label: "Commercial Solar Systems" },
      ],
    },
    {
      label: "Products",
      children: [
        { href: "/services/ev-chargers", label: "EV Chargers" },
        { href: "/services/solar-inverters", label: "Solar Inverters" },
        { href: "/services/solar-panel", label: "Solar Panels" },
        { href: "/services/battery-storage", label: "Battery Storage Solutions" },
      ],
    },
    {
      label: "Services",
      children: [
        { href: "/services/solar-panel-installation", label: "Solar Panel Installation" },
        { href: "/services/solar-inverter-installation", label: "Solar Inverter Installation" },
        { href: "/services/solar-battery-installation", label: "Solar Battery Installation" },
        { href: "/services/repairs-and-maintenance", label: "Repairs & Maintenance" },
      ],
    },
    { href: "/about", label: "About Us" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${

        scrolled || isOpen || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services'))
          ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/50 shadow-sm"
          : "bg-transparent py-4 lg:py-6"
      }`}
    >
      <div className="mx-auto max-w-[1536px] px-4 sm:px-6 xl:px-8">
        <div 
          className={`relative flex items-center justify-between transition-all duration-500 ${
            scrolled || isOpen || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services'))
              ? "py-3" 
              : "px-2 py-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 relative z-50">
              <img referrerPolicy="no-referrer" 
                src={scrolled || isOpen || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services')) ? "https://i.postimg.cc/44Dzn7Hk/oneroof-solar-classic.png" : "https://i.postimg.cc/vZdTgLm9/oneroof.png"}
                alt="Oneroof Solar Logo" 
                className={`${scrolled ? "h-[42px] sm:h-[50px] md:h-[58px]" : "h-[50px] sm:h-[58px] md:h-[74px]"} w-auto transition-all duration-500`} 
                fetchPriority="high"
                loading="eager"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-1 bg-black/5 backdrop-blur-sm rounded-full p-1 border border-black/5">
              {navItems.map((item) => (
                <div key={item.label} className="relative group">
                  {item.href ? (
                    <Link
                      to={item.href}
                      className={`text-[14px] font-semibold px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1 whitespace-nowrap ${
                        location.pathname === item.href 
                          ? "bg-white text-brand-600 shadow-sm" 
                          : scrolled || isOpen || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services')) ? "text-slate-700 hover:bg-white/50" : "text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className={`text-[14px] font-semibold px-4 py-2 rounded-full flex items-center gap-1 cursor-pointer transition-all duration-300 whitespace-nowrap ${
                      scrolled || isOpen || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services')) ? "text-slate-700 hover:bg-white/50" : "text-white hover:bg-white/10"
                    }`}>
                      {item.label}
                      <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-180" />
                    </div>
                  )}
                  
                  {item.children && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-[120%] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top group-hover:top-full w-64 z-50">
                      <div className="rounded-2xl border border-slate-100/50 bg-white/95 backdrop-blur-xl p-2.5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] relative">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 border-[8px] border-transparent border-b-white/95"></div>
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center">
              <a href="tel:0483986444" className="hidden lg:flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <div className="w-7 h-7 rounded-full bg-brand-500 flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5 text-white fill-current" />
                  </div>
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className={`text-[13px] font-medium transition-colors ${scrolled || isOpen || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services')) ? "text-slate-600" : "text-white/90"}`}>Give Us a Call</span>
                  <span className={`text-[18px] font-extrabold tracking-tight transition-colors ${scrolled || isOpen || (!scrolled && location.pathname !== "/" && !location.pathname.startsWith('/services')) ? "text-slate-900" : "text-white"}`}>0483 986 444</span>
                </div>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none p-2 rounded-full transition-colors ${(!scrolled && !isOpen && (location.pathname === "/" || location.pathname.startsWith("/services"))) ? "text-white bg-white/10 hover:bg-white/20" : "text-slate-800 bg-slate-100 hover:bg-slate-200"}`}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>

      {/* Full-Screen Mobile Nav Details */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-[110] shadow-2xl flex flex-col lg:hidden overflow-hidden"
            >
              <div className="flex flex-shrink-0 items-center justify-between p-4 sm:px-6 border-b border-slate-100">
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <img referrerPolicy="no-referrer" 
                    src="https://i.postimg.cc/44Dzn7Hk/oneroof-solar-classic.png"
                    alt="Oneroof Solar Logo" 
                    className="h-[50px] sm:h-[58px] w-auto" 
                  />
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 transition-colors focus:outline-none"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 hide-scrollbar flex flex-col">
                <div className="flex flex-col space-y-1 mb-8">
                  {navItems.map((item, index) => (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      key={item.label}
                    >
                      <MobileNavItem 
                        item={item} 
                        setIsOpen={setIsOpen} 
                        expanded={openMenuIndex === index}
                        onToggle={() => setOpenMenuIndex(openMenuIndex === index ? null : index)}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto">
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
