import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SEO } from '../components/SEO';

export const Privacy = () => {
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const docRef = doc(db, 'pages', 'privacy');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setPageData(docSnap.data());
      } catch (e) {
        console.warn("Using offline fallback data for CMS");
      }
    }
    loadData();
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <SEO seo={pageData?.seo || { title: 'Privacy Policy | Oneroof Solar', metaDescription: 'How we collect, use, and protect your personal information at Oneroof Solar.' }} />
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-brand-100 text-brand-600 rounded-2xl mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            How we collect, use, and protect your personal information at Oneroof Solar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 text-slate-700 leading-relaxed [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-8 [&>h3]:mb-4 [&>h3:first-child]:mt-0 [&>p]:mb-4 [&>ul]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2"
        >
          <h3>1. Information We Collect</h3>
          <p>
            We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website, or otherwise when you contact us. The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make, and the products and features you use.
          </p>
          <p>
            The personal information we collect may include: names, phone numbers, email addresses, mailing addresses, billing addresses, and other similar information.
          </p>

          <h3>2. How We Use Your Information</h3>
          <p>
            We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          <p>
            Specifically, as outlined in our Terms and Conditions:
          </p>
          <ul>
            <li>We use your information to complete documents required for connection of the system to the electricity grid.</li>
            <li>We use your information to claim your Small-scale Technology Certificates (STCs).</li>
          </ul>

          <h3>3. Sharing Your Information</h3>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
          <p>
            As stated in our terms, you authorise us to share your information (to the extent that is necessary) with:
          </p>
          <ul>
            <li>Our contractors, employees, and installers.</li>
            <li>Relevant government agencies.</li>
            <li>Electricity retailers.</li>
          </ul>
          <p>
            <strong>We will not release your personal information to any other parties without your written consent.</strong>
          </p>

          <h3>4. Data Retention</h3>
          <p>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
          </p>

          <h3>5. Security of Your Information</h3>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.
          </p>

          <h3>6. Contact Us</h3>
          <p>
            If you have questions or comments about this notice, you may email us or contact us by post at our designated address provided on the Contact Us page.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
