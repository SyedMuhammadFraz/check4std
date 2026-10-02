import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FlaskConical, LogOut, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import { AuthContext } from "../utils/AuthContext";
import ConfirmationModal from "../Modals/confirmation-modal";
import { BrandLogo, Button } from "./Marketing/MarketingUI";

const navigation = [["/", "Home"], ["/price-packages", "Tests & Services"], ["/how-it-works", "How It Works"], ["/about-us", "About Us"], ["/resources", "Resources"], ["/contact", "Contact"]];

export default function Nav() {
  const { authToken, userRole, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const selectedTests = state?.selectedTests || [];
  const labRoute = authToken ? userRole === "admin" ? "/admin-panel" : userRole === "doctor" ? "/doctor-dashboard" : "/user-profile" : "/login";

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  const search = event => {
    event.preventDefault();
    navigate(`/resources?q=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  return <>
    <a className="sh-skip-link" href="#main-content">Skip to content</a>
    <header className="sh-header">
      <div className="sh-header-inner">
        <Link to="/" className="sh-brand" aria-label="Satellite Health home"><BrandLogo /></Link>
        <nav id="sh-main-navigation" className={`sh-navigation ${menuOpen ? "sh-navigation--open" : ""}`} aria-label="Main navigation">
          {navigation.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"}>{label}</NavLink>)}
          {menuOpen && !authToken && <Link to="/signup">Create Account</Link>}
        </nav>
        <div className="sh-header-actions">
          <button className="sh-icon-button" aria-label={searchOpen ? "Close search" : "Search resources"} aria-expanded={searchOpen} aria-controls="sh-site-search" onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X /> : <Search />}</button>
          <Link className="sh-icon-button sh-cart-link" to={selectedTests.length ? "/order" : "/price-packages?view=all"} state={selectedTests.length ? { selectedTests } : undefined} aria-label={`My cart, ${selectedTests.length} selected tests`}><ShoppingCart /><span>{selectedTests.length}</span></Link>
          <Link className="sh-sign-in" to={labRoute}><UserRound size={22} /><span>{authToken ? "My Account" : "Sign In"}</span></Link>
          <Button className="sh-my-lab" to={labRoute} arrow={false}><FlaskConical size={22} />My Lab</Button>
          {authToken && <button className="sh-icon-button" onClick={() => setConfirmOpen(true)} aria-label="Sign out"><LogOut size={20} /></button>}
          <button className="sh-icon-button sh-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="sh-main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      {searchOpen && <form id="sh-site-search" className="sh-search-panel" onSubmit={search}>
        <label htmlFor="sh-search-query">What can we help you find?</label>
        <input id="sh-search-query" autoFocus type="search" placeholder="Tests, testing, prevention, FAQs…" value={query} onChange={event => setQuery(event.target.value)} />
        <Button type="submit" arrow={false}>Search</Button>
      </form>}
    </header>
    <ConfirmationModal showModal={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={() => { logout(); setConfirmOpen(false); navigate("/"); }} />
  </>;
}
