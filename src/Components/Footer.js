import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Users } from "lucide-react";

export default function Footer() {
  return <footer className="sh-footer">
    <div className="sh-container">
      <div className="sh-footer-top">
        <p className="sh-footer-motto">Health Looks Good on You.</p>
        <div className="sh-footer-feature"><ShieldCheck aria-hidden="true" /><div><strong>Your Privacy Matters</strong><p>Private, secure, and confidential.</p></div></div>
        <div className="sh-footer-feature"><Users aria-hidden="true" /><div><strong>Support You Can Trust</strong><p>Real people. Real answers. Real peace of mind.</p></div></div>
      </div>
      <div className="sh-footer-bottom">
        <p>© {new Date().getFullYear()} Satellite Health. All rights reserved.</p>
        <nav className="sh-footer-links" aria-label="Footer navigation"><Link to="/resources">Resources</Link><Link to="/test-centers">Find a Lab</Link><Link to="/contact">Contact</Link></nav>
      </div>
    </div>
  </footer>;
}
