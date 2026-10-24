import React, { useState } from "react";
import { Heading, JourneyLink } from "./JourneyUI";
import { diseases } from "./referenceDiseases";

export default function JourneyDiseases() {
  const [topic, setTopic] = useState("chlamydia");
  const disease = diseases[topic];
  return <>
    <Heading intro="Explore common STIs, testing, and care. Select a topic from the sidebar.">Disease information.</Heading>
    <div className="j-disease-layout"><nav className="j-disease-nav" aria-label="Disease topics">{Object.entries(diseases).map(([key, value]) => <button key={key} className={topic === key ? "is-chosen" : ""} aria-pressed={topic === key} onClick={() => setTopic(key)}>{value.name}</button>)}</nav>
      <article className="j-panel"><span className="j-tag">UNDERSTAND YOUR HEALTH</span><h2 className="j-panel-title">{disease.name}</h2><p>{disease.overview}</p><h3>Signs & symptoms</h3><p>{disease.symptoms}</p><h3>Testing</h3><p>{disease.testing}</p><h3>Treatment & next steps</h3><p>{disease.care}</p><p className="j-hint">General education, not a diagnosis. A clinician can help choose tests and interpret results.</p><p className="j-hint">Source: <a href={disease.source} target="_blank" rel="noopener noreferrer">CDC — {disease.name}</a></p><div className="j-actions"><JourneyLink step="tests">Browse tests</JourneyLink><JourneyLink step="consultation" secondary>Talk to a clinician</JourneyLink></div></article>
    </div>
  </>;
}
