import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_SEO = {
  title: '',
  metaDescription: '',
  focusKeyword: '',
  urlSlug: '',
  canonicalUrl: '',
  robots: 'index, follow',
  openGraphTitle: '',
  openGraphDescription: '',
  openGraphImage: '',
  twitterTitle: '',
  twitterDescription: '',
  twitterImage: '',
  schemaType: ''
};

const DEFAULT_HOME_DATA = {
  title: 'Home',
  seo: { ...DEFAULT_SEO },
  heroTitle: '',
  heroSubtitle: '',
  sections: {
    hero: {
      badge: "Federal Rebate: Save 30% on Solar Batteries",
      title: "Solar Solutions Built for <br />\n<span class=\"text-brand-500 pb-2 inline-block\">Northern Territory Conditions</span>",
      subtitle: "Trusted by homeowners and businesses across Darwin, Palmerston, Katherine, Alice Springs and regional NT. Premium solar panels, batteries and installation backed by local support.",
      ctaText: "Get Free Quote",
      features: [
        "$0 Deposit Options",
        "25 Years Performance"
      ],
      topFeatures: [
        "NT Licensed Electricians",
        "Premium Tier-1 Solar Panels",
        "Local Support Team"
      ],
      trustText: "Loved by Darwin homeowners",
      cards: {
        card1: {
          title: "High Efficiency",
          description: "Featuring top-tier JinkoSolar & AIKO N-Type panels for maximum output in Darwin heat.",
          percent: 95,
          badge: "Premium"
        },
        card2: {
          title: "Smart Storage",
          description: "Hybrid Inverters"
        },
        card3: {
          title: "Residential",
          description: "Tailored Solutions"
        }
      }
    },
    expertise: {
      badge: "Our Expertise",
      title: "Complete Energy <br class=\"hidden sm:block\" /><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500\">Solutions</span>",
      items: [
        {
          title: "Residential & Commercial Solar",
          description: "Expert installation of premium Tier 1 solar panels tailored to maximize your energy production. We analyze your roof's orientation, local weather patterns, and your specific energy consumption profile."
        },
        {
          title: "Battery Storage Systems",
          description: "Store your excess solar energy for nighttime use and protect against grid blackouts with advanced lithium technology."
        },
        {
          title: "Smart Inverters",
          description: "High-efficiency inverters to reliably convert energy."
        },
        {
          title: "Repairs & Maintenance",
          description: "Keep your system running at peak performance."
        }
      ]
    },
    whyChooseUs: {
      badge: "Why Choose Us",
      title: "Premium Solar Solutions For The Northern Territory",
      image: "https://i.postimg.cc/pLbrDKPx/solar-panel-768x819-1-(2).jpg",
      ctaText: "Get Your Free Quote",
      phone: "0483986444",
      items: [
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
      ]
    },
    process: {
      badge: "How It Works",
      title: "Your Seamless Journey to <br class=\"hidden sm:block\" />\n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400\">Solar Energy</span>",
      subtitle: "We've completely streamlined our process to make switching to solar as easy, fast, and stress-free as possible.",
      steps: [
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
      ]
    },
    installer: {
      badge: "Top Quality Installers",
      title: "Your Expert <br/> \n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-emerald-500\">Darwin Solar Installer</span>",
      image: "https://i.postimg.cc/05nhGvxW/Stuart-Park-0820.webp",
      paragraphs: [
        "As Darwin's premier solar panel installers, we are dedicated to providing the highest quality renewable energy solutions tailored specifically for the harsh Northern Territory climate.",
        "From the initial consultation to final commissioning, our expert installers handle every aspect of your solar journey, guaranteeing a seamless transition to clean, affordable, and sustainable power."
      ],
      features: [
        {
          title: "CEC Accredited",
          description: "Certified professionals ensuring the strictest safety standards."
        },
        {
          title: "Climate Ready",
          description: "Systems designed to withstand Darwin's extreme weather."
        }
      ],
      ctaText: "Start Your Project"
    },
    battery: {
      badge: "Energy Independence",
      title: "Uninterrupted Power for <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-500\">Your Home</span>",
      image: "https://i.postimg.cc/pLr9VPVS/Nightcliff-0810-(1)-(1).webp",
      items: [
        {
          title: "Blackout Protection",
          description: "Keep your essential appliances running seamlessly during grid outages."
        },
        {
          title: "Peak Shifting",
          description: "Store cheap solar energy during the day to use during expensive evening peak times. Save up to $1,500 extra per year."
        },
        {
          title: "Maximum ROI",
          description: "Combine with the 30% Federal Battery Rebate for unprecedented return on investment."
        }
      ],
      ctaText: "Explore Battery Options"
    },
    guarantee: {
      title: "The Oneroof Guarantee",
      description: "Peace of mind comes standard. We stand behind our work with industry-leading warranties and local support you can count on.",
      items: [
        {
          title: "25-Year Performance Warranty",
          description: "Your solar panels are guaranteed to produce high yields for a quarter of a century."
        },
        {
          title: "CEC Accredited Experts",
          description: "Every installation is carried out by Clean Energy Council approved electricians."
        },
        {
          title: "10-Year Workmanship Warranty",
          description: "Flawless execution backed by our rigorous quality control and extended guarantee."
        },
        {
          title: "Local NT Support",
          description: "We're right here in the Territory. Fast response times and dedicated local service."
        }
      ]
    },
    faqs: [
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
    ]
  }
};

function deepMerge(target: any, source: any): any {
  if (target === null || target === undefined) return JSON.parse(JSON.stringify(source));
  if (typeof source !== 'object' || source === null) return target;
  if (Array.isArray(source)) {
    if (!Array.isArray(target) || target.length === 0) return JSON.parse(JSON.stringify(source));
    return target;
  }
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (result[key] === undefined) {
      result[key] = JSON.parse(JSON.stringify(source[key]));
    } else if (typeof source[key] === 'object' && source[key] !== null) {
      result[key] = deepMerge(result[key], source[key]);
    }
  }
  return result;
}

function RecursiveEditor({ data, onChange, level = 0 }: { data: any, onChange: (newData: any) => void, level?: number }) {
  if (data === null || data === undefined) return null;

  if (typeof data === 'string') {
    const isTextArea = data.length > 60 || data.includes('\n');
    return isTextArea ? (
      <textarea
        value={data}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm font-sans"
        rows={4}
      />
    ) : (
      <input
        type="text"
        value={data}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
      />
    );
  }

  if (typeof data === 'number') {
    return (
      <input
        type="number"
        value={data}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
      />
    );
  }

  if (typeof data === 'boolean') {
    return (
      <input
        type="checkbox"
        checked={data}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded"
      />
    );
  }

  if (Array.isArray(data)) {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="pl-4 border-l-2 border-slate-200 py-2 relative group">
            <div className="absolute -left-[11px] top-4 w-5 h-5 bg-slate-100 rounded-full border border-slate-300 text-xs flex items-center justify-center font-bold text-slate-500">{index + 1}</div>
            <RecursiveEditor
              data={item}
              level={level + 1}
              onChange={(newItem) => {
                const newData = [...data];
                newData[index] = newItem;
                onChange(newData);
              }}
            />
            <button
              onClick={() => {
                const newData = [...data];
                newData.splice(index, 1);
                onChange(newData);
              }}
              className="mt-2 text-xs text-red-500 hover:text-red-700 font-medium"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={() => {
            const newItem = typeof data[0] === 'object' ? JSON.parse(JSON.stringify(data[0])) : "";
            onChange([...data, newItem]);
          }}
          className="text-sm text-brand-600 hover:text-brand-800 font-medium"
        >
          + Add Item
        </button>
      </div>
    );
  }

  if (typeof data === 'object') {
    return (
      <div className="space-y-4">
        {Object.keys(data).map((key) => (
          <div key={key} className={level > 0 ? "bg-slate-50 p-4 rounded-lg border border-slate-100 shadow-sm" : ""}>
            <label className="block text-sm font-semibold text-slate-700 mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
            <RecursiveEditor
              data={data[key]}
              level={level + 1}
              onChange={(newValue) => {
                const newData = { ...data, [key]: newValue };
                onChange(newData);
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

// Subcomponents for our beautiful Home Editor layout
function PlainStringList({ values = [], onChange, label }: { values: string[], onChange: (newVal: string[]) => void, label: string }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-slate-700">{label}</label>
      {values.map((v, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="text"
            value={v}
            onChange={(e) => {
              const copy = [...values];
              copy[i] = e.target.value;
              onChange(copy);
            }}
            className="flex-grow px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={() => {
              const copy = [...values];
              copy.splice(i, 1);
              onChange(copy);
            }}
            className="text-xs font-semibold px-2 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="text-xs text-brand-600 hover:text-brand-800 font-bold"
      >
        + Add {label} Bullet
      </button>
    </div>
  );
}

function ObjectListEditor({
  items = [],
  onChange,
  fields
}: {
  items: any[],
  onChange: (newItems: any[]) => void,
  fields: { key: string, label: string, type: 'text' | 'textarea' | 'number' }[]
}) {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div key={index} className="p-5 border border-slate-200 bg-slate-50/50 rounded-2xl relative shadow-sm hover:shadow-md transition">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const copy = [...items];
                copy.splice(index, 1);
                onChange(copy);
              }}
              className="text-xs font-bold px-3 py-1.5 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition"
            >
              Delete Card
            </button>
          </div>
          <div className="font-extrabold text-xs text-brand-500 uppercase tracking-widest mb-4">Card #{index + 1}</div>
          <div className="grid grid-cols-1 gap-4">
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    value={item[f.key] || ''}
                    onChange={(e) => {
                      const copy = [...items];
                      copy[index] = { ...copy[index], [f.key]: e.target.value };
                      onChange(copy);
                    }}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm shadow-sm"
                  />
                ) : f.type === 'number' ? (
                  <input
                    type="number"
                    value={item[f.key] === undefined ? '' : item[f.key]}
                    onChange={(e) => {
                      const copy = [...items];
                      copy[index] = { ...copy[index], [f.key]: Number(e.target.value) };
                      onChange(copy);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm shadow-sm"
                  />
                ) : (
                  <input
                    type="text"
                    value={item[f.key] || ''}
                    onChange={(e) => {
                      const copy = [...items];
                      copy[index] = { ...copy[index], [f.key]: e.target.value };
                      onChange(copy);
                    }}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm shadow-sm"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() => {
          const newItem: any = {};
          fields.forEach(f => newItem[f.key] = f.type === 'number' ? 0 : '');
          onChange([...items, newItem]);
        }}
        className="px-4 py-2 border-2 border-dashed border-brand-300 text-brand-600 rounded-xl text-sm font-extrabold hover:bg-brand-50/50 transition-colors"
      >
        + Add New Row Card
      </button>
    </div>
  );
}

export function AdminPageEditor() {
  const { pageId } = useParams<{ pageId: string }>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({
    title: '',
    heroTitle: '',
    heroSubtitle: '',
    content: ''
  });
  const [activeTab, setActiveTab] = useState('hero');

  useEffect(() => {
    if (!pageId) return;
    
    async function fetchPage() {
      setLoading(true);
      try {
        const docRef = doc(db, 'pages', pageId!);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let existing = docSnap.data() as any;
          if (pageId === 'home') {
            existing = deepMerge(existing, DEFAULT_HOME_DATA);
          } else {
            if (!existing.seo) {
              existing.seo = { ...DEFAULT_SEO };
            } else {
              existing.seo = { ...DEFAULT_SEO, ...existing.seo };
            }
          }
          setData(existing);
        } else {
          if (pageId === 'home') {
            setData({ ...DEFAULT_HOME_DATA });
          } else {
            setData({
              title: pageId!.charAt(0).toUpperCase() + pageId!.slice(1),
              heroTitle: '',
              heroSubtitle: '',
              content: '',
              seo: { ...DEFAULT_SEO }
            });
          }
        }
      } catch (error) {
         handleFirestoreError(error, OperationType.GET, `pages/${pageId}`);
      } finally {
        setLoading(false);
      }
    }
    fetchPage();
  }, [pageId]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!pageId) return;
    setSaving(true);
    try {
       await setDoc(doc(db, 'pages', pageId), data);
       alert('Saved successfully!');
    } catch (error: any) {
       console.error("Firestore Save Failed:", error);
       alert(`Error saving changes: ${error?.message || error || 'Permission denied'}.\n\nThis is likely because your session lacks write permission on the Firebase server. Please sign out of the Admin panel and log back in using "Sign in with Google" with an authorized account (e.g. shakeebahmed054@gmail.com or shakeebahmedk24@gmail.com) to save changes successfully.`);
       handleFirestoreError(error, OperationType.WRITE, `pages/${pageId}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 font-semibold text-slate-500 animate-pulse">Loading editor...</div>;

  const isHome = pageId === 'home';

  // Quick state update helper
  const updateHomeSection = (section: string, field: string, val: any) => {
    setData((prev: any) => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: {
          ...prev.sections[section],
          [field]: val
        }
      }
    }));
  };

  const updateSEO = (field: string, val: any) => {
    setData((prev: any) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: val
      }
    }));
  };

  return (
    <div className="max-w-7xl mx-auto pb-32">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight capitalize">
            Edit {pageId === 'home' ? 'Homepage Sections' : `${pageId} Page`}
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Configure full fields, custom arrays, and search metadata.</p>
        </div>
        <button 
          onClick={() => handleSave()}
          disabled={saving}
          className="px-6 py-3 bg-brand-500 text-slate-900 rounded-xl font-bold hover:bg-brand-600 transition disabled:opacity-50 shadow-md shadow-brand-500/20 active:scale-95 flex items-center gap-2"
        >
          {saving ? 'Saving changes...' : 'Save All Changes'}
        </button>
      </div>

      {user?.isCustom && (
        <div className="mb-8 p-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse shrink-0"></span>
            ⚠️ Database Save Warning (Local Fallback Session)
          </div>
          <p className="leading-relaxed">
            You are signed in with a local-only preset account <strong>({user.email})</strong>. Because this does not register an active session on the remote Firebase Authentication server, Firestore security rules will block any writes.
          </p>
          <p className="mt-1">
            Please <strong>sign out</strong> and sign back in using <strong>"Sign in with Google"</strong> with an authorized administrator account (e.g., <strong>shakeebahmed054@gmail.com</strong> or <strong>shakeebahmedk24@gmail.com</strong>) to successfully save your updates.
          </p>
        </div>
      )}

      {isHome ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Inner Navigation Tabs */}
          <div className="lg:col-span-1 space-y-1">
            {[
              { id: 'hero', label: 'Hero & Left Column' },
              { id: 'expertise', label: 'Expertise (Services)' },
              { id: 'whyChooseUs', label: 'Why Choose Us' },
              { id: 'process', label: 'Journey Process' },
              { id: 'installer', label: 'Darwin Installers' },
              { id: 'battery', label: 'Battery Storage' },
              { id: 'guarantee', label: 'The Guarantee' },
              { id: 'faqs', label: 'Homepage FAQs' },
              { id: 'seo', label: 'SEO & Meta Config' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-xl transition duration-150 font-bold text-sm border ${
                  activeTab === tab.id
                    ? 'border-brand-500/30 bg-brand-500/10 text-brand-700 shadow-sm'
                    : 'border-transparent text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Editors Container */}
          <div className="lg:col-span-3 bg-white p-6 md:p-8 border border-slate-200 rounded-2xl shadow-sm">
            {/* HERO TAB */}
            {activeTab === 'hero' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Hero Section Fields</h2>
                  <p className="text-slate-500 text-xs">Direct text fields, lists, and floating value proposition cards.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Headline Title (HTML supported)</label>
                    <textarea
                      value={data.sections?.hero?.title || ''}
                      onChange={(e) => updateHomeSection('hero', 'title', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-800 text-sm shadow-sm focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Subtitle / Sub-description (HTML supported)</label>
                    <textarea
                      value={data.sections?.hero?.subtitle || ''}
                      onChange={(e) => updateHomeSection('hero', 'subtitle', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-800 text-sm shadow-sm focus:ring-brand-500 focus:border-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Top Green Badge</label>
                      <input
                        type="text"
                        value={data.sections?.hero?.badge || ''}
                        onChange={(e) => updateHomeSection('hero', 'badge', e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">CTA Button Text</label>
                      <input
                        type="text"
                        value={data.sections?.hero?.ctaText || ''}
                        onChange={(e) => updateHomeSection('hero', 'ctaText', e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Trust Pilot Label</label>
                      <input
                        type="text"
                        value={data.sections?.hero?.trustText || ''}
                        onChange={(e) => updateHomeSection('hero', 'trustText', e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-sm shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <PlainStringList
                      values={data.sections?.hero?.topFeatures || []}
                      onChange={(newValues) => updateHomeSection('hero', 'topFeatures', newValues)}
                      label="Top Horizontal Core Features"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <PlainStringList
                      values={data.sections?.hero?.features || []}
                      onChange={(newValues) => updateHomeSection('hero', 'features', newValues)}
                      label="Bottom Small CTA Bullet Points"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-base font-bold text-slate-900 mb-4">Floating Graphic Cards (Right Side)</h3>
                    
                    <div className="space-y-6">
                      <div className="p-5 border border-slate-100 bg-slate-50 rounded-2xl">
                        <div className="font-extrabold text-xs text-brand-600 mb-3">Card 1 - High Efficiency (Primary)</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Title</label>
                            <input
                              type="text"
                              value={data.sections?.hero?.cards?.card1?.title || ''}
                              onChange={(e) => {
                                const c = { ...data.sections.hero.cards };
                                c.card1.title = e.target.value;
                                updateHomeSection('hero', 'cards', c);
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Badge</label>
                            <input
                              type="text"
                              value={data.sections?.hero?.cards?.card1?.badge || ''}
                              onChange={(e) => {
                                const c = { ...data.sections.hero.cards };
                                c.card1.badge = e.target.value;
                                updateHomeSection('hero', 'cards', c);
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-xs font-bold text-slate-500 mb-1">Description</label>
                            <textarea
                              value={data.sections?.hero?.cards?.card1?.description || ''}
                              onChange={(e) => {
                                const c = { ...data.sections.hero.cards };
                                c.card1.description = e.target.value;
                                updateHomeSection('hero', 'cards', c);
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                              rows={2}
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1">Efficiency percentage value</label>
                            <input
                              type="number"
                              value={data.sections?.hero?.cards?.card1?.percent || 95}
                              onChange={(e) => {
                                const c = { ...data.sections.hero.cards };
                                c.card1.percent = Number(e.target.value);
                                updateHomeSection('hero', 'cards', c);
                              }}
                              className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 border border-slate-100 bg-slate-50 rounded-2xl">
                          <div className="font-extrabold text-xs text-brand-600 mb-3">Card 2 - Smart Storage</div>
                          <div className="space-y-2">
                            <div>
                              <label className="block text-xs font-bold text-slate-500">Title</label>
                              <input
                                type="text"
                                value={data.sections?.hero?.cards?.card2?.title || ''}
                                onChange={(e) => {
                                  const c = { ...data.sections.hero.cards };
                                  c.card2.title = e.target.value;
                                  updateHomeSection('hero', 'cards', c);
                                }}
                                className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-500">Footer Text</label>
                              <input
                                type="text"
                                value={data.sections?.hero?.cards?.card2?.description || ''}
                                onChange={(e) => {
                                  const c = { ...data.sections.hero.cards };
                                  c.card2.description = e.target.value;
                                  updateHomeSection('hero', 'cards', c);
                                }}
                                className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-5 border border-slate-100 bg-slate-50 rounded-2xl">
                          <div className="font-extrabold text-xs text-brand-600 mb-3">Card 3 - Residential Service</div>
                          <div className="space-y-2">
                            <div>
                              <label className="block text-xs font-bold text-slate-500">Title</label>
                              <input
                                type="text"
                                value={data.sections?.hero?.cards?.card3?.title || ''}
                                onChange={(e) => {
                                  const c = { ...data.sections.hero.cards };
                                  c.card3.title = e.target.value;
                                  updateHomeSection('hero', 'cards', c);
                                }}
                                className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-500">Footer Text</label>
                              <input
                                type="text"
                                value={data.sections?.hero?.cards?.card3?.description || ''}
                                onChange={(e) => {
                                  const c = { ...data.sections.hero.cards };
                                  c.card3.description = e.target.value;
                                  updateHomeSection('hero', 'cards', c);
                                }}
                                className="w-full px-3 py-2 border rounded-lg text-sm bg-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EXPERTISE TAB */}
            {activeTab === 'expertise' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-slate-900 font-display">Expertise (Services Grid)</h2>
                  <p className="text-slate-500 text-xs">Four main columns shown on the home page highlighting specific products.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Badge Text</label>
                      <input
                        type="text"
                        value={data.sections?.expertise?.badge || ''}
                        onChange={(e) => updateHomeSection('expertise', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Main Grid Title (HTML custom gradient)</label>
                    <textarea
                      value={data.sections?.expertise?.title || ''}
                      onChange={(e) => updateHomeSection('expertise', 'title', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <label className="block text-base font-bold text-slate-800 mb-3">Service Items Grid Cards (Exactly 4 cards)</label>
                    <ObjectListEditor
                      items={data.sections?.expertise?.items || []}
                      onChange={(newItems) => updateHomeSection('expertise', 'items', newItems)}
                      fields={[
                        { key: 'title', label: 'Title text', type: 'text' },
                        { key: 'description', label: 'Long description / detail paragraph', type: 'textarea' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* WHY CHOOSE US TAB */}
            {activeTab === 'whyChooseUs' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Why Choose Us</h2>
                  <p className="text-slate-500 text-xs">Features grid, direct phone link, and side illustration image.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Badge Label</label>
                      <input
                        type="text"
                        value={data.sections?.whyChooseUs?.badge || ''}
                        onChange={(e) => updateHomeSection('whyChooseUs', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Support Phone (No spaces, e.g. 0483986444)</label>
                      <input
                        type="text"
                        value={data.sections?.whyChooseUs?.phone || ''}
                        onChange={(e) => updateHomeSection('whyChooseUs', 'phone', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Main Title</label>
                    <input
                      type="text"
                      value={data.sections?.whyChooseUs?.title || ''}
                      onChange={(e) => updateHomeSection('whyChooseUs', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ImageUploadField
                      value={data.sections?.whyChooseUs?.image || ''}
                      onChange={(val) => updateHomeSection('whyChooseUs', 'image', val)}
                      label="Visual Side Image"
                      helperText="Drag & drop key visual photo"
                    />
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">CTA Button text</label>
                      <input
                        type="text"
                        value={data.sections?.whyChooseUs?.ctaText || ''}
                        onChange={(e) => updateHomeSection('whyChooseUs', 'ctaText', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <label className="block text-base font-bold text-slate-800 mb-3">Key Value Propositions (3 cards)</label>
                    <ObjectListEditor
                      items={data.sections?.whyChooseUs?.items || []}
                      onChange={(newItems) => updateHomeSection('whyChooseUs', 'items', newItems)}
                      fields={[
                        { key: 'title', label: 'Item Name / Title', type: 'text' },
                        { key: 'description', label: 'Body detail text', type: 'textarea' },
                        { key: 'icon', label: 'Lucide Icon Name match (e.g. CircleDollarSign, Lightbulb, Zap)', type: 'text' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* JOURNEY PROCESS TAB */}
            {activeTab === 'process' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Journey Steps ("How It Works")</h2>
                  <p className="text-slate-500 text-xs">Four sequential horizontal steps guiding first consults to installation power-on.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Badge</label>
                      <input
                        type="text"
                        value={data.sections?.process?.badge || ''}
                        onChange={(e) => updateHomeSection('process', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Headline Text (HTML supported)</label>
                    <textarea
                      value={data.sections?.process?.title || ''}
                      onChange={(e) => updateHomeSection('process', 'title', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Side Subtitle description</label>
                    <textarea
                      value={data.sections?.process?.subtitle || ''}
                      onChange={(e) => updateHomeSection('process', 'subtitle', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <label className="block text-base font-bold text-slate-800 mb-3">Steps List (4 steps)</label>
                    <ObjectListEditor
                      items={data.sections?.process?.steps || []}
                      onChange={(newSteps) => updateHomeSection('process', 'steps', newSteps)}
                      fields={[
                        { key: 'step', label: 'Number label (e.g. 01, 02)', type: 'text' },
                        { key: 'title', label: 'Step Name', type: 'text' },
                        { key: 'description', label: 'Action description details', type: 'textarea' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* DARWIN INSTALLERS TAB */}
            {activeTab === 'installer' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Darwin Local Installers</h2>
                  <p className="text-slate-500 text-xs">Section explaining team expertise, with Clean Energy Council (CEC) accreditation details.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Badge</label>
                      <input
                        type="text"
                        value={data.sections?.installer?.badge || ''}
                        onChange={(e) => updateHomeSection('installer', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                    <ImageUploadField
                      value={data.sections?.installer?.image || ''}
                      onChange={(val) => updateHomeSection('installer', 'image', val)}
                      label="Installer Graphic Image"
                      helperText="Drag & drop installer picture"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Title Headline (HTML supported)</label>
                    <textarea
                      value={data.sections?.installer?.title || ''}
                      onChange={(e) => updateHomeSection('installer', 'title', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Paragraph 1</label>
                      <textarea
                        value={data.sections?.installer?.paragraphs?.[0] || ''}
                        onChange={(e) => {
                          const list = [...(data.sections?.installer?.paragraphs || ["", ""])];
                          list[0] = e.target.value;
                          updateHomeSection('installer', 'paragraphs', list);
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Paragraph 2</label>
                      <textarea
                        value={data.sections?.installer?.paragraphs?.[1] || ''}
                        onChange={(e) => {
                          const list = [...(data.sections?.installer?.paragraphs || ["", ""])];
                          list[1] = e.target.value;
                          updateHomeSection('installer', 'paragraphs', list);
                        }}
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <label className="block text-base font-bold text-slate-800 mb-3">CEC Accreditation Highlights (2 cards)</label>
                    <ObjectListEditor
                      items={data.sections?.installer?.features || []}
                      onChange={(newFeats) => updateHomeSection('installer', 'features', newFeats)}
                      fields={[
                        { key: 'title', label: 'Feature title (e.g. CEC Accredited)', type: 'text' },
                        { key: 'description', label: 'Detail sentence', type: 'text' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* BATTERY STORAGE TAB */}
            {activeTab === 'battery' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Smart Battery Storage Section</h2>
                  <p className="text-slate-500 text-xs">A dark background section detailing uninterruptible solar battery power and load shifting.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Badge</label>
                      <input
                        type="text"
                        value={data.sections?.battery?.badge || ''}
                        onChange={(e) => updateHomeSection('battery', 'badge', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      />
                    </div>
                    <ImageUploadField
                      value={data.sections?.battery?.image || ''}
                      onChange={(val) => updateHomeSection('battery', 'image', val)}
                      label="Battery Side Image"
                      helperText="Drag & drop battery image"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Title Headline (HTML custom gradient)</label>
                    <textarea
                      value={data.sections?.battery?.title || ''}
                      onChange={(e) => updateHomeSection('battery', 'title', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">CTA button link text</label>
                    <input
                      type="text"
                      value={data.sections?.battery?.ctaText || ''}
                      onChange={(e) => updateHomeSection('battery', 'ctaText', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <label className="block text-base font-bold text-slate-800 mb-3">Battery Value Points (3 items)</label>
                    <ObjectListEditor
                      items={data.sections?.battery?.items || []}
                      onChange={(newItems) => updateHomeSection('battery', 'items', newItems)}
                      fields={[
                        { key: 'title', label: 'Feature Title', type: 'text' },
                        { key: 'description', label: 'Short description sentence (e.g. Peak Shifting rules)', type: 'textarea' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* THE GUARANTEE TAB */}
            {activeTab === 'guarantee' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-slate-900">The Oneroof Guarantee</h2>
                  <p className="text-slate-500 text-xs">Warranties and certificates backing every Darwin solar system.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={data.sections?.guarantee?.title || ''}
                      onChange={(e) => updateHomeSection('guarantee', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Short Description subtitle</label>
                    <textarea
                      value={data.sections?.guarantee?.description || ''}
                      onChange={(e) => updateHomeSection('guarantee', 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>

                  <div className="border-t border-slate-100 pt-6">
                    <label className="block text-base font-bold text-slate-800 mb-3">Guarantee Items (Exactly 4 items)</label>
                    <ObjectListEditor
                      items={data.sections?.guarantee?.items || []}
                      onChange={(newItems) => updateHomeSection('guarantee', 'items', newItems)}
                      fields={[
                        { key: 'title', label: 'Warranty Name / Title', type: 'text' },
                        { key: 'description', label: 'Terms / explanation', type: 'textarea' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* HOMEPAGE FAQS TAB */}
            {activeTab === 'faqs' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-slate-900">Homepage FAQs</h2>
                  <p className="text-slate-500 text-xs">Create, edit, and reorganize the main frequently asked questions accordion items directly.</p>
                </div>

                <div className="space-y-4">
                  <ObjectListEditor
                    items={data.sections?.faqs || []}
                    onChange={(newFaqs) => updateHomeSection('faqs', '', newFaqs)}
                    fields={[
                      { key: 'q', label: 'Frequently Asked Question (Topic)', type: 'text' },
                      { key: 'a', label: 'Detailed Answer explanation text', type: 'textarea' }
                    ]}
                  />
                </div>
              </div>
            )}

            {/* SEO & META TAB */}
            {activeTab === 'seo' && (
              <div className="space-y-6">
                <div className="border-b border-slate-100 pb-4 mb-4">
                  <h2 className="text-xl font-bold text-slate-900">SEO & Meta Tags</h2>
                  <p className="text-slate-500 text-xs text-brand-600 font-semibold">Direct values used by search index crawlers and social post links.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Focus Keyword</label>
                    <input
                      type="text"
                      value={data.seo?.focusKeyword || ''}
                      onChange={(e) => updateSEO('focusKeyword', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="e.g. solar panels Darwin"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={data.seo?.title || ''}
                      onChange={(e) => updateSEO('title', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Searches display heading"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Meta Description</label>
                    <textarea
                      value={data.seo?.metaDescription || ''}
                      onChange={(e) => updateSEO('metaDescription', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg text-sm"
                      placeholder="Snippet seen on Google listings"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Twitter / Meta Card Title</label>
                    <input
                      type="text"
                      value={data.seo?.twitterTitle || ''}
                      onChange={(e) => updateSEO('twitterTitle', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Robots Policy</label>
                    <input
                      type="text"
                      value={data.seo?.robots || ''}
                      onChange={(e) => updateSEO('robots', e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm text-slate-800"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      ) : (
        <div className="bg-white p-6 md:p-8 border border-slate-200 rounded-2xl shadow-sm">
          <RecursiveEditor data={data} onChange={setData} />
        </div>
      )}
    </div>
  );
}
