import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../lib/firebase';
import { SeoEditor } from '../../components/admin/SeoEditor';
import { ImageUploadField } from '../../components/admin/ImageUploadField';
import { useAuth } from '../../context/AuthContext';

const SPECIAL_SEO_PAGES = [
  'residential-solar-system',
  'commercial-solar-system',
  'ev-chargers',
  'solar-inverters',
  'solar-panel',
  'battery-storage',
  'solar-panel-installation',
  'solar-inverter-installation',
  'solar-battery-installation',
  'repairs-and-maintenance'
];

const PAGE_NAMES: Record<string, string> = {
  'residential-solar-system': 'Residential Solar Systems',
  'commercial-solar-system': 'Commercial Solar Systems',
  'ev-chargers': 'EV Chargers',
  'solar-inverters': 'Solar Inverters',
  'solar-panel': 'Solar Panels',
  'battery-storage': 'Battery Storage Solutions',
  'solar-panel-installation': 'Solar Panel Installation',
  'solar-inverter-installation': 'Solar Inverter Installation',
  'solar-battery-installation': 'Solar Battery Installation',
  'repairs-and-maintenance': 'Repairs & Maintenance'
};

export function AdminItemEditor() {
  const { collectionId, itemId } = useParams<{ collectionId: string, itemId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<any>({
    title: '',
    description: '',
    content: '',
    icon: '',
    image: '',
    features: [],
    seo: {}
  });

  const isNew = itemId === 'new';
  const isSpecialSeoPage = itemId && SPECIAL_SEO_PAGES.includes(itemId);

  useEffect(() => {
    if (!collectionId || !itemId || isNew) {
      setLoading(false);
      return;
    }
    
    async function fetchItem() {
      setLoading(true);
      try {
        const docRef = doc(db, collectionId!, itemId!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const docData = docSnap.data() as any;
          if (isSpecialSeoPage) {
            setData({
              ...docData,
              title: docData.title || PAGE_NAMES[itemId],
              seo: {
                title: docData.seo?.title || PAGE_NAMES[itemId],
                metaDescription: docData.seo?.metaDescription || '',
                focusKeyword: docData.seo?.focusKeyword || '',
                urlSlug: docData.seo?.urlSlug || itemId,
                canonicalUrl: docData.seo?.canonicalUrl || `https://oneroofsolar.com.au/services/${itemId}`,
                robots: docData.seo?.robots || 'index, follow',
                openGraphTitle: docData.seo?.openGraphTitle || docData.seo?.title || PAGE_NAMES[itemId],
                openGraphDescription: docData.seo?.openGraphDescription || docData.seo?.metaDescription || '',
                openGraphImage: docData.seo?.openGraphImage || '',
                twitterTitle: docData.seo?.twitterTitle || docData.seo?.title || PAGE_NAMES[itemId],
                twitterDescription: docData.seo?.twitterDescription || docData.seo?.metaDescription || '',
                twitterImage: docData.seo?.twitterImage || '',
                schemaType: docData.seo?.schemaType || 'LocalBusiness',
              }
            });
          } else {
            setData(docData);
          }
        } else {
          if (isSpecialSeoPage) {
            // Document doesn't exist yet, but it's a special SEO page. Pre-populate template gracefully!
            setData({
              title: PAGE_NAMES[itemId],
              description: '',
              content: '',
              icon: '',
              image: '',
              features: [],
              seo: {
                title: PAGE_NAMES[itemId],
                metaDescription: '',
                focusKeyword: '',
                urlSlug: itemId,
                canonicalUrl: `https://oneroofsolar.com.au/services/${itemId}`,
                robots: 'index, follow',
                openGraphTitle: PAGE_NAMES[itemId],
                openGraphDescription: '',
                openGraphImage: '',
                twitterTitle: PAGE_NAMES[itemId],
                twitterDescription: '',
                twitterImage: '',
                schemaType: 'LocalBusiness',
              }
            });
          } else {
            alert('Item not found');
            navigate(`/admin/collections/${collectionId}`);
          }
        }
      } catch (error) {
         handleFirestoreError(error, OperationType.GET, `${collectionId}/${itemId}`);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [collectionId, itemId, navigate, isNew, isSpecialSeoPage]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionId || !itemId) return;
    setSaving(true);
    try {
       // if new, we generate an ID or use title slug
       const targetId = isNew ? data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : itemId;
       if (!targetId) {
         alert('Please enter a title');
         setSaving(false);
         return;
       }
       await setDoc(doc(db, collectionId, targetId), data);
       
       if (isNew) {
          navigate(`/admin/collections/${collectionId}`);
       } else {
          alert('Saved successfully!');
       }
    } catch (error: any) {
       console.error("Firestore Write Failed:", error);
       alert(`Error saving changes: ${error?.message || error || 'Permission denied'}.\n\nThis is likely because your session lacks write permission on the Firebase server. Please sign out of the Admin panel and log back in using "Sign in with Google" with an authorized account (e.g. shakeebahmed054@gmail.com or shakeebahmedk24@gmail.com) to save changes successfully.`);
       handleFirestoreError(error, OperationType.WRITE, `${collectionId}/${itemId}`);
    } finally {
      setSaving(false);
    }
  };

  const handleSeoChange = (field: string, val: string) => {
    setData({
      ...data,
      seo: {
        ...(data.seo || {}),
        [field]: val
      }
    });
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading editor...</div>;

  if (isSpecialSeoPage) {
    const seo = data.seo || {};
    return (
      <div className="max-w-4xl mx-auto pb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(`/admin`)}
              className="text-slate-500 hover:text-slate-800 transition"
            >
              ← Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                SEO Settings: {PAGE_NAMES[itemId]}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Customize general meta tags, schema graphs, and social cards for this high-traffic page.
              </p>
            </div>
          </div>
        </div>

        {user?.isCustom && (
          <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex flex-col gap-2">
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

        <form onSubmit={handleSave} className="space-y-8">
          {/* Card 1: Core Search Information */}
          <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-2 h-4 bg-brand-500 rounded-full"></span>
              Core Search Metadata
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">SEO Title</label>
                <input 
                  type="text" 
                  value={seo.title || ''} 
                  onChange={e => handleSeoChange('title', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="e.g. Premium Battery Storage Solutions - Darwin | Oneroof Solar"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Meta Description</label>
                <textarea 
                  value={seo.metaDescription || ''} 
                  onChange={e => handleSeoChange('metaDescription', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  rows={3}
                  placeholder="A targeted, compelling summary to drive high click-through rates from the Google results page."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Focus Keyword</label>
                <input 
                  type="text" 
                  value={seo.focusKeyword || ''} 
                  onChange={e => handleSeoChange('focusKeyword', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="e.g. Darwin solar battery install"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">URL Slug</label>
                <input 
                  type="text" 
                  value={seo.urlSlug || itemId} 
                  onChange={e => handleSeoChange('urlSlug', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 bg-slate-50 text-slate-500 rounded-lg outline-none cursor-not-allowed"
                  disabled
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Canonical URL</label>
                <input 
                  type="url" 
                  value={seo.canonicalUrl || ''} 
                  onChange={e => handleSeoChange('canonicalUrl', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="e.g. https://oneroofsolar.com.au/services/battery-storage"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Robots Directive</label>
                <select 
                  value={seo.robots || 'index, follow'} 
                  onChange={e => handleSeoChange('robots', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, follow">NoIndex, Follow</option>
                  <option value="index, nofollow">Index, NoFollow</option>
                  <option value="noindex, nofollow">NoIndex, NoFollow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Schema Type</label>
                <input 
                  type="text" 
                  value={seo.schemaType || ''} 
                  onChange={e => handleSeoChange('schemaType', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="e.g. LocalBusiness, Product, Service"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Open Graph Metadata */}
          <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-2 h-4 bg-emerald-500 rounded-full"></span>
              Open Graph (Facebook, LinkedIn sharing)
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Open Graph Title</label>
                <input 
                  type="text" 
                  value={seo.openGraphTitle || ''} 
                  onChange={e => handleSeoChange('openGraphTitle', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="Title for social feeds"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Open Graph Description</label>
                <textarea 
                  value={seo.openGraphDescription || ''} 
                  onChange={e => handleSeoChange('openGraphDescription', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  rows={2}
                  placeholder="Brief pitch for social feeds"
                />
              </div>

              <ImageUploadField 
                value={seo.openGraphImage || ''} 
                onChange={val => handleSeoChange('openGraphImage', val)} 
                label="Open Graph Image"
                helperText="Optimal aspect ratio is 1.91:1 (e.g., 1200x630px)" 
              />
            </div>
          </div>

          {/* Card 3: Twitter Metadata */}
          <div className="bg-white p-8 border border-slate-200 rounded-xl shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-2 h-4 bg-blue-400 rounded-full"></span>
              Twitter Cards (X sharing)
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Twitter Title</label>
                <input 
                  type="text" 
                  value={seo.twitterTitle || ''} 
                  onChange={e => handleSeoChange('twitterTitle', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  placeholder="X card display title"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Twitter Description</label>
                <textarea 
                  value={seo.twitterDescription || ''} 
                  onChange={e => handleSeoChange('twitterDescription', e.target.value)} 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                  rows={2}
                  placeholder="X card summary snippet"
                />
              </div>

              <ImageUploadField 
                value={seo.twitterImage || ''} 
                onChange={val => handleSeoChange('twitterImage', val)} 
                label="Twitter Card Image"
                helperText="Appears on tweets when this link is posted" 
              />
            </div>
          </div>

          {/* Save/Submit bar */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200">
            <button 
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={saving}
              className="px-8 py-2.5 bg-brand-500 text-white rounded-lg font-semibold hover:bg-brand-600 shadow-md shadow-brand-500/10 transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(`/admin/collections/${collectionId}`)}
          className="text-slate-500 hover:text-slate-800"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-display font-semibold capitalize">
          {isNew ? 'New' : 'Edit'} {collectionId?.slice(0,-1)}
        </h1>
      </div>

      {user?.isCustom && (
        <div className="mb-6 p-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm flex flex-col gap-2">
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
      
      <form onSubmit={handleSave} className="space-y-6 bg-white p-8 border border-slate-200 rounded-xl shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input 
            type="text" 
            value={data.title}
            onChange={e => setData({...data, title: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            required
            placeholder="e.g. Solar Panel Installation"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Short Description</label>
          <textarea 
            value={data.description}
            onChange={e => setData({...data, description: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            rows={2}
            required
            placeholder="A brief summary for cards and lists"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Full Content</label>
          <textarea 
            value={data.content}
            onChange={e => setData({...data, content: e.target.value})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-mono text-sm"
            rows={10}
            placeholder="Detailed page content..."
          />
        </div>

        <ImageUploadField 
          value={data.image || ''}
          onChange={val => setData({...data, image: val})}
          label="Item Banner/Feature Image"
          helperText="Upload a client-side optimized photo or paste direct link"
        />
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Features (comma separated)</label>
          <textarea 
            value={Array.isArray(data.features) ? data.features.join(', ') : (data.features || '')}
            onChange={e => setData({...data, features: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
            rows={2}
            placeholder="Feature 1, Feature 2"
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 mb-1">Lucide Icon Name</label>
           <input 
             type="text" 
             value={data.icon}
             onChange={e => setData({...data, icon: e.target.value})}
             className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none max-w-sm"
             placeholder="e.g. Sun, Battery, Zap"
           />
           <p className="text-xs text-slate-500 mt-1">Check lucide.dev for icon names</p>
        </div>

        <SeoEditor 
          seo={data.seo || {}} 
          onChange={(seo) => setData({ ...data, seo })} 
        />
        
        <div className="pt-4 border-t border-slate-100 flex justify-end">
           <button 
             type="submit" 
             disabled={saving}
             className="px-6 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition disabled:opacity-50"
           >
             {saving ? 'Saving...' : 'Save Item'}
           </button>
        </div>
      </form>
    </div>
  );
}

