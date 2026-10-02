import React, { useState } from "react";
import { ArrowRight, Clock3, Heart, Mail, MessageCircle, Phone, ShieldCheck, Users } from "lucide-react";
import { Button, Hero, IconBadge, TrustStrip } from "./MarketingUI";
import "./contact.css";

const supportEmail = "support@satellitehealth.com";
const supportPhone = "1-833-728-4553";

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
    <main className="satellite-page sh-contact-page">
      <Hero
        variant="contact"
        eyebrow="Contact Us"
        title="We’re Here"
        accent="for You."
        description="Have questions? Our team is ready to support you with testing, results, billing, or anything else you need."
        tagline="Your Questions Matter."
      >
        <Button to="/price-packages">Order a Test Now <ArrowRight size={23} aria-hidden="true" /></Button>
      </Hero>

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
              <p>Live chat is currently<br />unavailable.</p>
              <button className="sh-contact-chat-button" type="button" aria-expanded={showChatInfo} aria-controls="contact-chat-options" onClick={() => setShowChatInfo(!showChatInfo)}>Contact Support</button>
            </article>
          </div>
          {showChatInfo && (
            <div className="sh-contact-chat-info" id="contact-chat-options" role="status">
              <strong>We’re here to help.</strong> Call <a href="tel:+18337284553">{supportPhone}</a> Monday–Friday, 8 AM–5 PM ET, or <a href={`mailto:${supportEmail}`}>email our support team</a>.
            </div>
          )}
          <div className="sh-contact-hours">
            <Clock3 size={38} strokeWidth={1.8} aria-hidden="true" />
            <div>
              <h3>Support Hours</h3>
              <p><strong>Monday – Friday</strong><br />8:00 AM – 5:00 PM ET</p>
            </div>
          </div>
        </section>

        <section className="sh-contact-message" aria-labelledby="contact-message-heading">
          <h2 className="sh-section-heading" id="contact-message-heading">Send Us a Message</h2>
          <p className="sh-contact-subtitle">Fill out the form below to prepare an email to our support team.</p>
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
                <Button type="submit">Open Email Draft <ArrowRight size={23} aria-hidden="true" /></Button>
                <p>Opens your email app. Review and send your message there.</p>
              </div>
              {emailDraft && (
                <p className="sh-contact-draft-status" role="status">Continue in your email app to send your message. If it didn’t open, <a href={emailDraft}>open the draft again</a> or email <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.</p>
              )}
            </form>
            <aside className="sh-contact-benefits" aria-label="Our support team">
              {[
                { icon: ShieldCheck, title: "Private & Secure", description: "Your privacy matters to us." },
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
      <TrustStrip compact />
    </main>
  );
}
