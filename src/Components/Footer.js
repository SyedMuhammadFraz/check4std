import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Popular Pages */}
        <div className="footer-section">
          <h4>Popular Pages</h4>
          <ul>
            <li><a href="#">Colleges & Universities</a></li>
            <li><a href="#">Exposed Blog</a></li>
            <li><a href="#">Find a Lab</a></li>
            <li><a href="#">My Account</a></li>
            <li><a href="#">STDs & Symptoms</a></li>
            <li><a href="#">STD Notifications</a></li>
            <li><a href="#">STD Testing For Minors</a></li>
            <li><a href="#">HIV-Positive Scholarship Application</a></li>
          </ul>
        </div>

        {/* How It Works */}
        <div className="footer-section">
          <h4>How It Works</h4>
          <ul>
            <li><a href="#">STDCheck.com Process</a></li>
            <li><a href="#">Confidential STD Testing</a></li>
            <li><a href="#">Our Privacy Promise</a></li>
            <li><a href="#">Sample Test Results</a></li>
            <li><a href="#">Doctor Consultation</a></li>
            <li><a href="#">Gift Card Balance</a></li>
            <li><a href="#">Patient Testimonials</a></li>
            <li><a href="#">Payment Options</a></li>
          </ul>
        </div>

        {/* Tests & Pricing */}
        <div className="footer-section">
          <h4>Tests & Pricing</h4>
          <ul>
            <li><a href="#">10 Test Panel</a></li>
            <li><a href="#">Chlamydia Test</a></li>
            <li><a href="#">Gonorrhea Test</a></li>
            <li><a href="#">Hepatitis A Test</a></li>
            <li><a href="#">Hepatitis B Test</a></li>
            <li><a href="#">Hepatitis C Test</a></li>
            <li><a href="#">Oral Herpes Test</a></li>
            <li><a href="#">Genital Herpes Test</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            Need help? Have a question? Speak with a health specialist today.{' '}
            <a href="tel:1-800-456-2323">Call 1-800-456-2323</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024, STDCheck.com, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
