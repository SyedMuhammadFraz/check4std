import React from "react";
import { Button, Hero, Steps, TrustStrip } from "../Marketing/MarketingUI";

export default function Home() {
  return <div className="satellite-page sh-home-page">
    <Hero variant="home" eyebrow="Test. Treat. Thrive." title="Your Health." accent="On Your Terms."
      description="Private, affordable, and convenient STD testing — all online."
      tagline="Your Privacy Is Our Priority">
      <Button to="/price-packages" variant="orange">Order a Test</Button>
      <TrustStrip compact />
    </Hero>
    <Steps />
  </div>;
}
