import { FadeIn } from "@/src/components/ui/FadeIn";
import { Mail, MapPin, Phone, Zap, ArrowRight, MessageSquare } from "lucide-react";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { GoogleReviews } from "@/src/components/GoogleReviews";
import { SEO } from "@/src/components/SEO";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'pages', 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setPageData(docSnap.data());
      } catch (e) {
        console.warn("Using offline fallback data for CMS");
      }
    }
    loadData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      window.location.href = `mailto:info@oneroofsolar.com.au?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent("Name: " + formData.name + "\nEmail: " + formData.email + "\n\nMessage:\n" + formData.message)}`;
      setErrors({});
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    }
  };

  return (
    <div className="pt-32 pb-32 overflow-hidden bg-slate-50 min-h-screen">
      <SEO seo={pageData?.seo} />
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/50 via-slate-50 to-slate-50 -z-0 pointer-events-none"></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeIn isHero>
            <div className="inline-flex items-center gap-2 px-4 py-2 text-brand-600 font-bold text-sm mb-8 border border-brand-200 bg-brand-50 rounded-full uppercase tracking-widest shadow-sm">
              <Zap className="w-4 h-4" />
              {pageData?.title || 'Support Online'}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight mb-8">
              {pageData?.heroTitle ? (
                <span dangerouslySetInnerHTML={{ __html: pageData.heroTitle }} />
              ) : (
                <>Let's Get In <span className="text-brand-500">Touch.</span></>
              )}
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 font-medium leading-relaxed mb-6 whitespace-pre-line">
              {pageData?.content || 'Ready to start saving on your energy bills? Our Darwin-based solar experts are here to answer your questions and provide a free, no-obligation quote.\n\nReady to harness the power of the sun? Our team of experts is here to help you design the perfect solar ecosystem for your home.'}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           {/* Left side info */}
           <FadeIn>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter uppercase">Send a <span className="text-brand-500">Message</span>.</h2>
              <p className="text-slate-600 text-lg mb-12 font-medium">
                Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 shrink-0 mt-1 border border-brand-100">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-black text-xl mb-2">Expert Advice</h4>
                    <p className="text-slate-600 font-medium leading-relaxed">Speak directly with solar engineers, not salespeople. We design systems that make sense for your roof.</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 shrink-0 mt-1 border border-brand-100">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-900 font-black text-xl mb-2">Fast Response</h4>
                    <p className="text-slate-600 font-medium leading-relaxed">We aim to respond to all inquiries within 24 hours. Emergency support available for existing customers.</p>
                  </div>
                </div>
              </div>
           </FadeIn>

           {/* Form Side */}
           <FadeIn delay={0.2}>
              <div className="bg-white p-4 sm:p-8 md:p-12 rounded-3xl sm:rounded-[2.5rem] border border-slate-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                
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
           </FadeIn>
        </div>
      </section>

      {/* Info Cards Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn delay={0.1}>
             <div className="bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-brand-300 hover:shadow-xl shadow-md transition-all duration-300 h-full group relative overflow-hidden text-center">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
               <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500 mb-6 mx-auto group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Mail className="w-7 h-7" />
               </div>
               <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Email Us</h3>
               <div className="text-lg font-normal text-slate-900 tracking-tight">info@oneroofsolar.com.au</div>
             </div>
          </FadeIn>
          
           <FadeIn delay={0.2}>
             <div className="bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-brand-300 hover:shadow-xl shadow-md transition-all duration-300 h-full group relative overflow-hidden text-center">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
               <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500 mb-6 mx-auto group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <Phone className="w-7 h-7" />
               </div>
               <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Call Us</h3>
               <div className="text-lg font-normal text-slate-900 tracking-tight">Darwin: <a href="tel:0483986444" className="hover:text-brand-500 transition-colors">0483 986 444</a></div>
               <div className="text-lg font-normal text-slate-900 tracking-tight mt-1">Alice Springs: <a href="tel:0483937004" className="hover:text-brand-500 transition-colors">0483 937 004</a></div>
             </div>
          </FadeIn>

          <FadeIn delay={0.3}>
             <div className="bg-white rounded-[2rem] p-8 border border-slate-200 hover:border-brand-300 hover:shadow-xl shadow-md transition-all duration-300 h-full group relative overflow-hidden text-center">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-full blur-[40px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150"></div>
               <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-500 mb-6 mx-auto group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  <MapPin className="w-7 h-7" />
               </div>
               <h3 className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Visit Us</h3>
               <div className="text-sm font-normal text-slate-900 tracking-tight leading-tight">Darwin: 3/97 Pruen Rd, Berrimah NT 0828</div>
               <div className="text-sm font-normal text-slate-900 tracking-tight leading-tight mt-3 pt-3 border-t border-slate-100">Alice Springs: 44 Zeil St, Araluen NT 0870</div>
             </div>
          </FadeIn>
        </div>
      </section>

      {/* Map Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 mb-12">
        <FadeIn delay={0.3}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Our <span className="text-brand-500">Locations</span>.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Darwin Map */}
            <div className="h-[450px] w-full rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl relative group flex flex-col bg-white">
              <div className="p-5 flex justify-center items-center gap-2 border-b border-slate-100 font-black text-lg text-slate-800 shrink-0 text-center">
                <MapPin className="text-brand-500 w-5 h-5" />
                Darwin: 3/97 Pruen Rd, Berrimah NT 0828
              </div>
              <div className="flex-grow w-full h-full relative">
                <iframe 
                  src="https://maps.google.com/maps?q=3/97%20Pruen%20Rd,%20Berrimah%20NT%200828&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Darwin Office Map"
                  className="absolute inset-0 w-full h-full grayscale-[50%] contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 bg-slate-100"
                ></iframe>
              </div>
            </div>

            {/* Alice Springs Map */}
            <div className="h-[450px] w-full rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-xl relative group flex flex-col bg-white">
              <div className="p-5 flex justify-center items-center gap-2 border-b border-slate-100 font-black text-lg text-slate-800 shrink-0 text-center">
                <MapPin className="text-brand-500 w-5 h-5" />
                Alice Springs: 44 Zeil St, Araluen NT 0870
              </div>
              <div className="flex-grow w-full h-full relative">
                <iframe 
                  src="https://maps.google.com/maps?q=44%20Zeil%20St,%20Araluen%20NT%200870&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Alice Springs Office Map"
                  className="absolute inset-0 w-full h-full grayscale-[50%] contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 bg-slate-100"
                ></iframe>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <GoogleReviews />

    </div>
  );
}
