/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Outlet, Link } from "react-router-dom";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ServiceDetail } from "./pages/ServiceDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import Projects from "./pages/Projects";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { AuthProvider } from "./context/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminPageEditor } from "./pages/admin/AdminPageEditor";
import { AdminListEditor } from "./pages/admin/AdminListEditor";
import { AdminItemEditor } from "./pages/admin/AdminItemEditor";

function MainLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    // @ts-ignore
    window.lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      // @ts-ignore
      delete window.lenis;
    };
  }, []);

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="pages/:pageId" element={<AdminPageEditor />} />
            <Route path="collections/:collectionId" element={<AdminListEditor />} />
            <Route path="collections/:collectionId/edit/:itemId" element={<AdminItemEditor />} />
          </Route>

          {/* Public Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<div className="min-h-screen flex items-center justify-center pt-24"><div className="text-center"><h1 className="text-6xl font-black text-slate-900 mb-4">404</h1><p className="text-xl text-slate-600 mb-8">The page you are looking for does not exist.</p><Link to="/" className="text-brand-600 font-bold hover:underline">Go back home</Link></div></div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

