import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Zap, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 text-slate-300 overflow-hidden">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-500/10 blur-[120px] pointer-events-none rounded-full top-[-150px]"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Brand & Description */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-8">
              <img referrerPolicy="no-referrer" 
                src="https://i.postimg.cc/vZdTgLm9/oneroof.png" 
                alt="Oneroof Solar Logo" 
                className="h-[55px] w-auto opacity-90 transition-opacity hover:opacity-100" 
                loading="lazy"
              />
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed text-sm md:text-base">
              Leading the transition to a sustainable future in the Northern Territory. Premium solar installations, batteries, and smart energy solutions for homes and businesses.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.facebook.com/oneroofsolar" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 border border-slate-700 hover:bg-brand-500 hover:text-white hover:border-brand-400 shadow-sm hover:shadow-brand-500/20 transition-all duration-300">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/oneroofsolar" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 border border-slate-700 hover:bg-brand-500 hover:text-white hover:border-brand-400 shadow-sm hover:shadow-brand-500/20 transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/oneroof-solar/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 border border-slate-700 hover:bg-brand-500 hover:text-white hover:border-brand-400 shadow-sm hover:shadow-brand-500/20 transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/oneroof_solar/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 border border-slate-700 hover:bg-brand-500 hover:text-white hover:border-brand-400 shadow-sm hover:shadow-brand-500/20 transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com/@oneroofsolar" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-800/80 text-slate-400 border border-slate-700 hover:bg-brand-500 hover:text-white hover:border-brand-400 shadow-sm hover:shadow-brand-500/20 transition-all duration-300">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="lg:col-span-3 lg:pl-8">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-500 rounded-full"></span>
              Services
            </h3>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li><Link to="/services/residential-solar-system" className="hover:text-brand-400 transition-colors flex items-center gap-2 group"><Zap className="h-3 w-3 text-slate-600 group-hover:text-brand-500 transition-colors" /> Residential Solar Systems</Link></li>
              <li><Link to="/services/commercial-solar-system" className="hover:text-brand-400 transition-colors flex items-center gap-2 group"><Zap className="h-3 w-3 text-slate-600 group-hover:text-brand-500 transition-colors" /> Commercial Solar Systems</Link></li>
              <li><Link to="/services/battery-storage" className="hover:text-brand-400 transition-colors flex items-center gap-2 group"><Zap className="h-3 w-3 text-slate-600 group-hover:text-brand-500 transition-colors" /> Battery Storage Solutions</Link></li>
              <li><Link to="/services/ev-chargers" className="hover:text-brand-400 transition-colors flex items-center gap-2 group"><Zap className="h-3 w-3 text-slate-600 group-hover:text-brand-500 transition-colors" /> EV Chargers</Link></li>
              <li><Link to="/services/solar-inverters" className="hover:text-brand-400 transition-colors flex items-center gap-2 group"><Zap className="h-3 w-3 text-slate-600 group-hover:text-brand-500 transition-colors" /> Solar Inverters</Link></li>
              <li><Link to="/services/solar-panel" className="hover:text-brand-400 transition-colors flex items-center gap-2 group"><Zap className="h-3 w-3 text-slate-600 group-hover:text-brand-500 transition-colors" /> Solar Panels</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-500 rounded-full"></span>
              Company
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-brand-400 transition-colors inline-block transform hover:translate-x-1 duration-200">About Us</Link></li>
              <li><Link to="/about" className="hover:text-brand-400 transition-colors inline-block transform hover:translate-x-1 duration-200">Why Choose Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition-colors inline-block transform hover:translate-x-1 duration-200">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-brand-400 transition-colors inline-block transform hover:translate-x-1 duration-200">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-400 transition-colors inline-block transform hover:translate-x-1 duration-200">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 relative">
            <h3 className="text-sm font-semibold tracking-wider text-white uppercase mb-6 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-500 rounded-full"></span>
              Contact
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700 mt-0.5">
                  <MapPin className="h-4 w-4 text-brand-400" />
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Darwin</div>
                  <span className="text-slate-400 block leading-tight">3/97 Pruen Rd, Berrimah<br/>NT 0828</span>
                  <a href="tel:0483986444" className="text-slate-400 hover:text-brand-400 transition-colors font-medium flex items-center gap-1.5 mt-1.5">
                    <Phone className="h-3 w-3" /> 0483 986 444
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 pt-4 border-t border-slate-800">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700 mt-0.5">
                  <MapPin className="h-4 w-4 text-brand-400" />
                </div>
                <div>
                  <div className="text-white font-medium mb-1">Alice Springs</div>
                  <span className="text-slate-400 block leading-tight">44 Zeil St, Araluen<br/>NT 0870</span>
                  <a href="tel:0483937004" className="text-slate-400 hover:text-brand-400 transition-colors font-medium flex items-center gap-1.5 mt-1.5">
                    <Phone className="h-3 w-3" /> 0483 937 004
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border border-slate-700">
                  <Mail className="h-4 w-4 text-brand-400" />
                </div>
                <a href="mailto:info@oneroofsolar.com.au" className="text-slate-400 hover:text-brand-400 transition-colors">info@oneroofsolar.com.au</a>
              </li>
            </ul>
          </div>

        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Oneroof Solar. All rights reserved. <span className="hidden md:inline mx-1">|</span> <span className="block md:inline mt-1 md:mt-0">Designed and developed by <a href="https://adsthatconverts.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition-colors hover:underline">adsthatconverts.com</a></span>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-400">
            <span className="px-3 py-1 pb-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">Electrical Licence: NT12345</span>
            <span className="px-3 py-1 pb-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">CEC Accredited Installer</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
