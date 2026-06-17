import { useAuth } from '../../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';
import { useState } from 'react';

const DEFAULT_SERVICES = [
  {
    title: "Residential Solar",
    slug: "residential-solar-system",
    description: "Harness the power of the sun for your home. We install premium 6.6kW to 13.2kW systems that drastically cut or eliminate your power bills. Ideal for Darwin's sunny climate.",
    features: [
      "High-performance Jinko or AIKO panels",
      "Sungrow or FoxESS inverters",
      "Full installation & grid connection",
      "25-year performance warranty"
    ],
    image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=60&w=1000&auto=format&fit=crop"
  },
  {
    title: "Commercial Solar",
    slug: "commercial-solar-system",
    description: "Protect your business's bottom line from rising energy costs. We design high-yield commercial PV systems tailored to your energy consumption profile.",
    features: [
      "Massive ROI & fast payback periods",
      "Tax benefits & government incentives",
      "Custom engineered for your roof space",
      "Ongoing maintenance & support"
    ],
    image: "https://a-us.storyblok.com/f/1006159/810x471/62865d0b80/des-1116-csm.jpg/m/1000x0/filters:quality(60):format(webp)"
  },
  {
    title: "Solar Batteries & Storage",
    slug: "battery-storage",
    description: "Store your excess solar energy for nighttime use. Add a battery to a new or existing system and take advantage of the 30% federal rebate.",
    features: [
      "Blackout protection",
      "Maximize self-consumption",
      "Reduce peak demand charges",
      "Seamless hybrid inverter integration"
    ],
    image: "https://i.postimg.cc/VN7B2NkJ/DSC00505-Enhanced-NR-(1)-jpg-(2)-(1).webp"
  },
  {
    title: "EV Chargers",
    slug: "ev-chargers",
    description: "Get ready for the future with smart EV chargers. We provide installation and integration with your existing solar system.",
    features: [
      "Smart EV charger installation",
      "Integration with solar systems",
      "Fast charging capabilities",
      "Residential & commercial options"
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYjFUKNKyOMySm6lkKfTkODY4oKkYzGvdgw&s"
  },
  {
    title: "Repairs & Maintenance",
    slug: "repairs-and-maintenance",
    description: "Keep your system running at peak performance with professional panel cleaning, system health checks, and repairs.",
    features: [
      "Professional panel cleaning",
      "System health checks",
      "Performance optimization",
      "Fault diagnosis & repairs"
    ],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExfMGgoZJ0SC5uObr6P1AIzCA5Qme1j8pLA&s"
  },
  {
    title: "Solar Inverters",
    slug: "solar-inverters",
    description: "Upgrade or replace your solar inverter for maximum efficiency. We offer top-tier brands like Sungrow, Fronius, and FoxESS.",
    features: [
      "Premium inverter brands",
      "High efficiency conversion",
      "Smart monitoring capabilities",
      "Extended warranties"
    ],
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=60&w=1000&auto=format&fit=crop"
  }
];

const DEFAULT_PAGES = [
  {
    id: 'home',
    data: {
      title: "Home",
      heroTitle: "Solar Solutions Built for \n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-green-500 pb-2 inline-block\">Northern Territory Conditions</span>",
      heroSubtitle: "Complete Solar Solutions for Darwin & the NT. Get premium 6.6 kW Solar Systems from just <strong class=\"text-white font-medium bg-white/10 px-2 py-0.5 rounded-md\">$28 per week</strong> with $0 Deposit.",
      content: "",
      sections: {
        hero: {
          badge: "Federal Rebate: Save 30% on Solar Batteries",
          title: "Solar Solutions Built for <br />\n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-green-500 pb-2 inline-block\">Northern Territory Conditions</span>",
          subtitle: "Complete Solar Solutions for Darwin & the NT. \nGet premium 6.6 kW Solar Systems from just <strong class=\"text-white font-medium bg-white/10 px-2 py-0.5 rounded-md\">$28 per week</strong> with $0 Deposit.",
          ctaText: "Get Free Quote",
          features: ["$0 Deposit Options", "25 Years Performance"]
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
          items: [
            {
              title: "Huge Savings & Government Grants",
              description: "Maximize your energy savings. Customized solar solutions. Trust us to slash your bills. Top-tier solar panels & batteries with government grants."
            },
            {
              title: "Easy Processing Fully Taken Care By Our Experts",
              description: "Your stress-free solar journey. We handle everything, from rebates to custom solutions."
            },
            {
              title: "Power Your Life, Naturally",
              description: "Enjoy the benefits of your fully functional solar energy system. Get started today with our hassle-free solar panel installation process."
            }
          ]
        },
        process: {
          badge: "How It Works",
          title: "Your Seamless Journey to <br class=\"hidden sm:block\" />\n<span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400\">Solar Energy</span>",
          subtitle: "We've completely streamlined our process to make switching to solar as easy, fast, and stress-free as possible.",
          steps: [
            {
              title: "Free Consultation",
              description: "We assess your energy needs and evaluate your roof space remotely.",
              step: "01"
            },
            {
              title: "Custom Design",
              description: "Our engineers design a tailored solar solution to maximize your ROI.",
              step: "02"
            },
            {
              title: "Installation",
              description: "Certified professionals install your system quickly and safely.",
              step: "03"
            },
            {
              title: "Power On",
              description: "Start saving immediately while reducing your carbon footprint.",
              step: "04"
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
        ecosystem: {
          badge: "Complete Integration",
          title: "The Smart Energy <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-green-500\">Ecosystem</span>",
          subtitle: "All your energy needs seamlessly connected and controlled from the palm of your hand.",
          items: [
            {
              title: "Intelligent App Monitoring",
              description: "Track your generation, monitor usage, and control your home's energy flow in real-time from anywhere in the world."
            },
            {
              title: "Premium Panels",
              description: "Max efficiency Tier-1 panels designed to handle the intense NT sun while maintaining maximum output."
            },
            {
              title: "EV Ready Systems",
              description: "Future-proof your home with EV charger integration. Drive completely free powered by the sun."
            },
            {
              title: "Hybrid Inverter Hub",
              description: "The brain of your energy system. Intelligently routes solar power to your home, battery, or the grid for maximum financial return."
            }
          ]
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
        }
      }
    }
  },
  {
    id: 'about',
    data: {
      title: "About Us",
      heroTitle: "Your Trusted Solar Partner in the <span class=\"text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-emerald-400\">Northern Territory</span>",
      content: "At Oneroof Solar, we are dedicated to helping homes and businesses across Darwin, Alice Springs, and Palmerston transition to clean, renewable energy. We believe in providing top-tier equipment, flawless installation, and exceptional customer service.",
      heroSubtitle: ""
    }
  },
  {
    id: 'contact',
    data: {
      title: "Support Online",
      heroTitle: "Let's Get In <span class=\"text-brand-500\">Touch.</span>",
      content: "Ready to start saving on your energy bills? Our Darwin-based solar experts are here to answer your questions and provide a free, no-obligation quote.\n\nReady to harness the power of the sun? Our team of experts is here to help you design the perfect solar ecosystem for your home.",
      heroSubtitle: ""
    }
  }
];

export function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [seeding, setSeeding] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleSeedData = async () => {
    if (!confirm("This will populate Firebase with the default website content. Proceed?")) return;
    setSeeding(true);
    try {
      const batch = writeBatch(db);
      
      // Seed Services
      for (const service of DEFAULT_SERVICES) {
        const ref = doc(db, 'services', service.slug);
        batch.set(ref, {
          title: service.title,
          description: service.description,
          features: service.features,
          image: service.image
        }, { merge: true });
      }

      // Seed Pages
      for (const page of DEFAULT_PAGES) {
        const ref = doc(db, 'pages', page.id);
        batch.set(ref, page.data, { merge: true });
      }

      await batch.commit();
      alert("Successfully loaded all existing content into the Database! You can now edit it in the admin panel.");
    } catch (error) {
       handleFirestoreError(error, OperationType.WRITE, 'batch/seed');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-semibold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-600">Logged in as {user?.email}</span>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition"
          >
            Logout
          </button>
        </div>
      </div>
      
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
         <div>
            <h3 className="font-semibold text-lg text-brand-900 mb-1">Load Existing Website Content</h3>
            <p className="text-brand-700 text-sm">Transfer the current hardcoded website text and images into the database, making them editable here.</p>
         </div>
         <button 
           onClick={handleSeedData}
           disabled={seeding}
           className="px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition disabled:opacity-50 whitespace-nowrap"
         >
           {seeding ? "Loading..." : "Load Current Content"}
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Pages</h3>
          <p className="text-slate-600 text-sm mb-4">Edit the static content of main pages like Home, About, and Contact.</p>
        </div>
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-2">Services & Products</h3>
          <p className="text-slate-600 text-sm mb-4">Manage the specific services, solar systems, and products available.</p>
        </div>
      </div>
    </div>
  );
}
