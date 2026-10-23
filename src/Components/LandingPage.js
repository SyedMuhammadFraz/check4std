import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { journeyNames, journeyPath } from "./Journey/journeyModel";
import Footer from "./Footer";
import Nav from "./Nav";
import { ContactFooter } from "./Marketing/Contact";
import "./Marketing/satellite.css";

function LandingPage() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles = { "/": "Your Health. On Your Terms.", "/price-packages": "Tests & Services", "/how-it-works": "How It Works", "/about-us": "About Us", "/resources": "Resources", "/contact": "Contact Us", "/order": "Order & Checkout" };
    const sections = [["/diseases", "Disease Information"], ["/pages", "All Pages"]];
    const section = sections.find(([prefix]) => pathname.startsWith(prefix));
    document.title = `${titles[pathname] || section?.[1] || "Patient Care"} | Satellite Health`;
  }, [pathname]);
  if (pathname === "/" && journeyNames[hash.slice(1)]) return <Navigate to={journeyPath(hash.slice(1))} replace />;
  return (
    <div className="satellite-site">
      <Nav/>
      <main id="main-content"><Outlet /></main>
      {pathname === "/contact" ? <ContactFooter /> : <Footer />}
    </div>
  );
}

export default LandingPage;
