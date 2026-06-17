import { useState, useEffect, useRef } from "react";
import { X, Zap, ShieldCheck, Banknote } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";
import { safeStorage } from "../lib/storage";

export function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const exitIntentFiredRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  
  isOpenRef.current = isOpen;

  useEffect(() => {
    // Reset exit intent for each new page visit
    exitIntentFiredRef.current = false;
    
    const isHomePage = pathname === "/";
    let timer: NodeJS.Timeout | null = null;

    // Home page 10s timer logic
    if (isHomePage && !safeStorage.getSession("hasSeenLeadPopup10s")) {
      timer = setTimeout(() => {
        if (!safeStorage.getSession("hasSeenLeadPopup10s")) {
          setIsOpen(true);
          safeStorage.setSession("hasSeenLeadPopup10s", "true");
        }
      }, 10000);
    }

    // Exit intent logic (for all pages)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentFiredRef.current && !isOpenRef.current) {
        setIsOpen(true);
        exitIntentFiredRef.current = true;
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (timer) clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // @ts-ignore
      if (window.lenis) {
        // @ts-ignore
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      // @ts-ignore
      if (window.lenis) {
        // @ts-ignore
        window.lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = "";
      // @ts-ignore
      if (window.lenis) {
        // @ts-ignore
        window.lenis.start();
      }
    };
  }, [isOpen]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md transition-opacity"
          />

          <div className="flex min-h-screen items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden my-8 isolate"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 lg:top-4 lg:right-4 z-50 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={18} className="lg:w-5 lg:h-5" />
              </button>

              {/* Left Side - Visual Focus */}
              <div className="relative hidden w-full lg:w-1/2 p-6 sm:p-8 lg:p-14 lg:flex flex-col justify-center overflow-hidden bg-neutral-950 text-white min-h-[320px] lg:min-h-[400px]">
                {/* Background Image / Texture */}
                <div 
                  className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1000&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/30 pointer-events-none" />
                
                {/* Glowing Orbs */}
                <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-yellow-500 rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-green-500 rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-screen" />

                <div className="relative z-10 flex flex-col h-full justify-center">
                  {/* Logo */}
                  <div className="mb-6 lg:mb-10 relative">
                    <div className="absolute inset-0 bg-white/10 blur-xl rounded-full" />
                    <img referrerPolicy="no-referrer" 
                      src="https://i.postimg.cc/vZdTgLm9/oneroof.png" 
                      alt="Oneroof Solar Logo" 
                      className="h-[50px] lg:h-[74px] w-auto opacity-100 drop-shadow-lg relative z-10"
                    />
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 text-xs lg:text-sm font-semibold mb-6 lg:mb-8 shadow-[0_0_20px_rgba(234,179,8,0.15)] ring-1 ring-yellow-500/30">
                      <Zap size={16} className="text-yellow-400 animate-pulse" />
                      <span className="text-yellow-50">Limited Time Offer</span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 lg:mb-6 leading-[1.1] drop-shadow-2xl">
                      <span className="text-white">Claim Your</span> <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 drop-shadow-sm whitespace-nowrap">
                        $13,000 Rebate
                      </span><br />
                      <span className="text-white text-2xl sm:text-3xl lg:text-4xl mt-2 block">on Solar and Battery</span>
                    </h2>
                    
                    <p className="text-sm lg:text-lg text-neutral-200 mb-6 lg:mb-10 leading-relaxed max-w-md font-medium">
                      Switch to premium solar and battery storage. Lock in lower energy bills and secure your government rebate today.
                    </p>

                    <div className="space-y-4 lg:space-y-6">
                      <div className="flex items-center gap-4 lg:gap-5 group">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 flex items-center justify-center border border-yellow-500/30 shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:scale-105 transition-transform duration-300">
                          <Banknote className="w-6 h-6 lg:w-7 lg:h-7 text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base lg:text-lg tracking-wide">Free Savings Estimate</h4>
                          <p className="text-xs lg:text-sm text-neutral-300 font-medium">See exactly how much you can save</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 lg:gap-5 group">
                        <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 flex items-center justify-center border border-yellow-500/30 shrink-0 shadow-[0_0_15px_rgba(234,179,8,0.1)] group-hover:scale-105 transition-transform duration-300">
                          <ShieldCheck className="w-6 h-6 lg:w-7 lg:h-7 text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-base lg:text-lg tracking-wide">Premium Tier-1 Tech</h4>
                          <p className="text-xs lg:text-sm text-neutral-300 font-medium">Industry-leading panels & batteries</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 lg:mt-12 text-[10px] leading-relaxed text-neutral-400/80 max-w-sm">
                      Terms and conditions apply. <br/>
                      Estimated rebates are calculated using a 48 kWh battery and a 20 kW solar PV system. Actual rebates are subject to eligibility, program terms, and government approval.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="w-full lg:w-1/2 bg-neutral-950 flex flex-col justify-center px-4 py-8 sm:px-6 lg:p-12 relative overflow-hidden text-white">
                <div 
                  className="absolute inset-0 opacity-60 pointer-events-none"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1000&auto=format&fit=crop')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="absolute inset-0 bg-neutral-950/70 pointer-events-none backdrop-blur-md" />
                <div className="absolute top-0 right-0 w-full h-[300px] bg-gradient-to-b from-yellow-500/10 to-transparent pointer-events-none" />
                
                <div className="text-center mb-6 lg:mb-8 relative z-10">
                  <h3 className="text-3xl font-extrabold text-white tracking-tight">Check Eligibility</h3>
                  <p className="text-neutral-300 mt-2 font-medium">Takes less than 60 seconds</p>
                </div>
                
                <div className="w-full relative bg-transparent rounded-xl overflow-hidden" style={{ minHeight: "432px" }}>
                  <iframe
                    src="https://api.oneroofsolar.com.au/widget/form/XVgkuW5m65fGTA1nDLGD"
                    style={{ width: "100%", height: "100%", border: "none", borderRadius: "12px", minHeight: "432px" }}
                    id="inline-XVgkuW5m65fGTA1nDLGD"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="PoP Up "
                    data-height="432"
                    data-layout-iframe-id="inline-XVgkuW5m65fGTA1nDLGD"
                    data-form-id="XVgkuW5m65fGTA1nDLGD"
                    title="PoP Up "
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
