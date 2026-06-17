import React from 'react';
import { ImageUploadField } from './ImageUploadField';

export function SeoEditor({ seo, onChange }: { seo: any, onChange: (seo: any) => void }) {
  const data = seo || {};

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="pt-8 border-t border-slate-200 mt-8 space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">SEO Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">SEO Title</label>
            <input type="text" value={data.title || ''} onChange={e => handleChange('title', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Focus Keyword</label>
            <input type="text" value={data.focusKeyword || ''} onChange={e => handleChange('focusKeyword', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Meta Description</label>
            <textarea value={data.metaDescription || ''} onChange={e => handleChange('metaDescription', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">URL Slug</label>
            <input type="text" value={data.urlSlug || ''} onChange={e => handleChange('urlSlug', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Canonical URL</label>
            <input type="url" value={data.canonicalUrl || ''} onChange={e => handleChange('canonicalUrl', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Robots (Index/NoIndex)</label>
            <select value={data.robots || 'index, follow'} onChange={e => handleChange('robots', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none">
              <option value="index, follow">Index, Follow</option>
              <option value="noindex, follow">NoIndex, Follow</option>
              <option value="index, nofollow">Index, NoFollow</option>
              <option value="noindex, nofollow">NoIndex, NoFollow</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Schema Type</label>
            <input type="text" value={data.schemaType || ''} onChange={e => handleChange('schemaType', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" placeholder="e.g. Article, LocalBusiness" />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200 space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">Open Graph (Facebook, LinkedIn)</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Open Graph Title</label>
            <input type="text" value={data.openGraphTitle || ''} onChange={e => handleChange('openGraphTitle', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Open Graph Description</label>
            <textarea value={data.openGraphDescription || ''} onChange={e => handleChange('openGraphDescription', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" rows={2} />
          </div>
          <ImageUploadField 
            value={data.openGraphImage || ''} 
            onChange={val => handleChange('openGraphImage', val)} 
            label="Open Graph Image"
            helperText="Appears when links are shared on Facebook, LinkedIn, etc." 
          />
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200 space-y-6">
        <h2 className="text-xl font-semibold text-slate-800">Twitter Cards</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Twitter Title</label>
            <input type="text" value={data.twitterTitle || ''} onChange={e => handleChange('twitterTitle', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Twitter Description</label>
            <textarea value={data.twitterDescription || ''} onChange={e => handleChange('twitterDescription', e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" rows={2} />
          </div>
          <ImageUploadField 
            value={data.twitterImage || ''} 
            onChange={val => handleChange('twitterImage', val)} 
            label="Twitter Card Image"
            helperText="Appears when links are shared on Twitter/X" 
          />
        </div>
      </div>
    </div>
  );
}
