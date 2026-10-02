import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Nav from "./Nav";
import "./Marketing/satellite.css";

function LandingPage() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const titles = { "/": "Your Health. On Your Terms.", "/price-packages": "Tests & Services", "/how-it-works": "How It Works", "/about-us": "About Us", "/resources": "Resources", "/contact": "Contact Us" };
    document.title = `${titles[pathname] || "Patient Care"} | Satellite Health`;
  }, [pathname]);
  return (
    <div className="satellite-site">
      <Nav/>
      <main id="main-content"><Outlet /></main>
      <Footer/>
    </div>
  );
}

export default LandingPage;
