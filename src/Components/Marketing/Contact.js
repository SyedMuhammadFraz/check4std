import React, { useState } from "react";
import { Clock3, Heart, Leaf, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Users } from "lucide-react";
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button, IconBadge } from "./MarketingUI";
import "./contact.css";

const supportEmail = "support@satellitehealth.com";
const supportPhone = "1-833-728-4553";

function ContactSocialIcons() {
  return <div className="sh-contact-socials" aria-label="Social media">
    {[['Facebook', FaFacebookSquare], ['Instagram', FaInstagram], ['X', FaXTwitter], ['LinkedIn', FaLinkedin], ['YouTube', FaYoutube]].map(([name, Icon]) => <span key={name} title={name}><Icon aria-label={name} role="img" /></span>)}
  </div>;
}

function ContactHero() {
  return <section className="sh-contact-hero" aria-labelledby="contact-heading">
    <div className="sh-contact-hero-art" aria-hidden="true">
      <svg className="sh-contact-art-wide" viewBox="730 92 942 288" preserveAspectRatio="xMidYMid slice"><image href="/assets/satellite/contact.png" width="1672" height="941" /></svg>
      <svg className="sh-contact-art-portrait" viewBox="460 76 564 322" preserveAspectRatio="xMidYMid slice"><image href="/assets/satellite/contact-portrait.png" width="1024" height="1536" /></svg>
    </div>
    <div className="sh-contact-hero-copy">
      <p className="sh-contact-eyebrow">Contact Us</p>
      <h1 id="contact-heading">We’re Here <span>for You.</span></h1>
      <p className="sh-contact-hero-description">Have questions? Our team is ready to support you with testing, results, billing, or anything else you need.</p>
      <Button to="/price-packages">Order a Test Now</Button>
    </div>
    <p className="sh-contact-sr-only">Your Questions Matter. Your Health. A Brighter Tomorrow.</p>
  </section>;
}

function ContactTrust() {
  return <section className="sh-contact-trust" aria-label="Our commitment to you"><div className="sh-contact-trust-inner">
    <div className="sh-contact-trust-item"><ShieldCheck /><div><strong>100% Confidential</strong><p>Your privacy matters.</p></div></div>
    <div className="sh-contact-trust-item"><Clock3 /><div><strong>Fast &amp; Friendly Support</strong><p>Real people. Real answers.</p></div></div>
    <div className="sh-contact-trust-item sh-contact-trust-labs"><MapPin /><div><strong>Nationwide Labs</strong><p>Convenient locations near you.</p></div></div>
    <div className="sh-contact-trust-item"><Users /><div><strong>Trusted by Thousands</strong><p>Real people. Real results.<br />Real peace of mind.</p></div></div>
    <div className="sh-contact-trust-item sh-contact-trust-tomorrow"><Leaf /><div><strong>Your Health. A Brighter Tomorrow.</strong><p>We’re here for you every step of the way.</p></div></div>
    <ContactSocialIcons />
  </div></section>;
}

export function ContactFooter() {
  return <footer className="sh-contact-footer">
    <div className="sh-contact-footer-top">
      <p className="sh-contact-footer-motto">Health Looks Good on You.</p>
      <div className="sh-contact-footer-right">
        <nav aria-label="Footer navigation">
          <a href={`mailto:${supportEmail}?subject=Privacy%20Policy%20request`} title="Request the privacy policy by email">Privacy Policy</a>
          <a href={`mailto:${supportEmail}?subject=Terms%20of%20Service%20request`} title="Request the terms of service by email">Terms of Service</a>
          <a href="#get-in-touch-heading">Contact</a>
        </nav>
        <ContactSocialIcons />
      </div>
    </div>
    <p className="sh-contact-copyright">© {new Date().getFullYear()} Satellite Health. All rights reserved.</p>
  </footer>;
}

export default function Contact() {
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [emailDraft, setEmailDraft] = useState("");

  const prepareEmail = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get("firstName").trim()} ${data.get("lastName").trim()}`,
      `Email: ${data.get("email").trim()}`,
      ...(data.get("phone").trim() ? [`Phone: ${data.get("phone").trim()}`] : []),
      "",
      data.get("message").trim(),
    ].join("\n");
    const draft = `mailto:${supportEmail}?subject=${encodeURIComponent(data.get("subject"))}&body=${encodeURIComponent(body)}`;
    setEmailDraft(draft);
    window.location.href = draft;
  };

  return (
    <div className="satellite-page sh-contact-page">
      <ContactHero />

      <div className="sh-container sh-section sh-contact-layout">
        <section className="sh-contact-get-in-touch" aria-labelledby="get-in-touch-heading">
          <h2 className="sh-section-heading" id="get-in-touch-heading">Get in Touch</h2>
          <p className="sh-contact-subtitle">Choose the best way to reach us. We’re happy to help!</p>
          <div className="sh-contact-methods">
            <article className="sh-contact-method">
              <IconBadge icon={Phone} />
              <h3>Call Us</h3>
              <a className="sh-contact-phone" href="tel:+18337284553">{supportPhone}</a>
              <p>Monday – Friday<br />8 AM – 5 PM ET</p>
            </article>
            <article className="sh-contact-method">
              <IconBadge icon={Mail} tone="blue" />
              <h3>Email Us</h3>
              <a className="sh-contact-email" href={`mailto:${supportEmail}`}>{supportEmail}</a>
              <p>We typically respond<br />within 24 hours.</p>
            </article>
            <article className="sh-contact-method">
              <IconBadge icon={MessageCircle} />
              <h3>Live Chat</h3>
              <p>Chat with a member<br />of our support team.</p>
              <button className="sh-contact-chat-button" type="button" aria-expanded={showChatInfo} aria-controls="contact-chat-options" onClick={() => setShowChatInfo(!showChatInfo)}>Start Chat</button>
            </article>
          </div>
          {showChatInfo && (
            <div className="sh-contact-chat-info" id="contact-chat-options" role="status">
              <strong>Live chat is currently unavailable.</strong> Call <a href="tel:+18337284553">{supportPhone}</a> Monday–Friday, 8 AM–5 PM ET, or <a href={`mailto:${supportEmail}`}>email our support team</a>.
            </div>
          )}
          <div className="sh-contact-hours">
            <Clock3 size={38} strokeWidth={1.8} aria-hidden="true" />
            <div className="sh-contact-hours-content">
              <h3>Support Hours</h3>
              <div className="sh-contact-hours-grid">
                <p><strong>Monday – Friday</strong><br />8:00 AM – 5:00 PM ET</p>
                <p><strong>Saturday – Sunday</strong><br />Outside support hours</p>
                <p><strong>Holidays</strong><br />Limited Support (Email Only)</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sh-contact-message" aria-labelledby="contact-message-heading">
          <h2 className="sh-section-heading" id="contact-message-heading">Send Us a Message</h2>
          <p className="sh-contact-subtitle">Fill out the form below and we’ll get back to you as soon as possible.</p>
          <div className="sh-contact-message-content">
            <form className="sh-contact-form" onSubmit={prepareEmail} onChange={() => { if (emailDraft) setEmailDraft(""); }}>
              <div className="sh-contact-field">
                <label htmlFor="contact-first-name">First Name <span aria-hidden="true">*</span></label>
                <input id="contact-first-name" name="firstName" autoComplete="given-name" placeholder="First Name" maxLength={80} required />
              </div>
              <div className="sh-contact-field">
                <label htmlFor="contact-last-name">Last Name <span aria-hidden="true">*</span></label>
                <input id="contact-last-name" name="lastName" autoComplete="family-name" placeholder="Last Name" maxLength={80} required />
              </div>
              <div className="sh-contact-field">
                <label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span></label>
                <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required />
              </div>
              <div className="sh-contact-field">
                <label htmlFor="contact-phone">Phone Number (Optional)</label>
                <input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="(123) 456-7890" maxLength={40} />
              </div>
              <div className="sh-contact-field sh-contact-field-full">
                <label htmlFor="contact-subject">Subject <span aria-hidden="true">*</span></label>
                <select id="contact-subject" name="subject" defaultValue="" required>
                  <option value="" disabled>Select a Topic</option>
                  <option>Testing &amp; Orders</option>
                  <option>Test Results</option>
                  <option>Billing &amp; Payments</option>
                  <option>Lab Locations</option>
                  <option>Account Support</option>
                  <option>Other Question</option>
                </select>
              </div>
              <div className="sh-contact-field sh-contact-field-full">
                <label htmlFor="contact-message">Message <span aria-hidden="true">*</span></label>
                <textarea id="contact-message" name="message" placeholder="How can we help you?" rows={4} maxLength={3000} required />
              </div>
              <div className="sh-contact-form-action">
                <Button type="submit" aria-describedby="contact-email-handoff">Send Message</Button>
                <p id="contact-email-handoff">Opens your email app to review and send.</p>
              </div>
              {emailDraft && (
                <p className="sh-contact-draft-status" role="status">Continue in your email app to send your message. If it didn’t open, <a href={emailDraft}>open the draft again</a> or email <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.</p>
              )}
            </form>
            <aside className="sh-contact-benefits" aria-label="Our support team">
              {[
                { icon: ShieldCheck, title: "Private & Secure", description: "Your information is always protected." },
                { icon: Users, title: "Friendly Support Team", description: "Real people, ready to help." },
                { icon: Clock3, title: "Quick Response Times", description: "We aim to respond within 24 hours." },
                { icon: Heart, title: "Care You Can Count On", description: "Your health and peace of mind matter to us." },
              ].map(({ icon, title, description }) => (
                <div className="sh-contact-benefit" key={title}>
                  <IconBadge icon={icon} />
                  <div><h3>{title}</h3><p>{description}</p></div>
                </div>
              ))}
            </aside>
          </div>
        </section>
      </div>
      <ContactTrust />
    </div>
  );
}
