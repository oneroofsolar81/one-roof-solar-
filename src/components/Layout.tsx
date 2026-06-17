import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LeadPopup } from "./LeadPopup";

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col font-sans overflow-x-hidden w-full relative">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <LeadPopup />
    </div>
  );
}
