import React from "react";
import { Button, Hero, Steps, TrustStrip } from "./MarketingUI";
import "./how-it-works.css";

export default function HowItWorks() {
  return (
    <main className="satellite-page sh-how-page">
      <Hero
        variant="how"
        eyebrow="Confidential. Convenient. Care You Can Trust."
        title="Your Health."
        accent="On Your Terms."
        description="Private, affordable STD testing — all online."
        tagline="Your Privacy Is Our Priority"
      >
        <Button to="/price-packages">Order a Test</Button>
      </Hero>
      <div className="sh-how-steps">
        <Steps />
      </div>
      <div className="sh-how-trust">
        <TrustStrip />
      </div>
    </main>
  );
}
