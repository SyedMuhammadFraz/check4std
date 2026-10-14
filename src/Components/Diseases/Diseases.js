import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Journey/journey.css";
import { defaultTopicSlug, diseaseSections, findTopic } from "./diseaseTopics";

function Diseases() {
  const { topic: requestedSlug = defaultTopicSlug } = useParams();
  const navigate = useNavigate();
  const { group: activeGroup, topic: activeTopic } = findTopic(requestedSlug);
  const Article = activeTopic.component;

  // An unknown slug is served the overview; keep the address bar honest about it.
  useEffect(() => {
    if (activeTopic.slug !== requestedSlug) {
      navigate(`/diseases/${activeTopic.slug}`, { replace: true });
    }
  }, [activeTopic.slug, requestedSlug, navigate]);

  // "Chlamydia Overview" already names its group; "Testing & Treatment" does not.
  const panelTitle =
    activeTopic.title === "Overview" || activeTopic.title.startsWith(activeGroup.title)
      ? activeTopic.title === "Overview"
        ? activeGroup.title
        : activeTopic.title
      : `${activeGroup.title} · ${activeTopic.title}`;

  const openGroup = group => navigate(`/diseases/${group.topics[0].slug}`);

  const selectTopic = slug => {
    navigate(`/diseases/${slug}`);
    if (window.innerWidth < 900) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="sh-journey">
      <p className="j-notice">
        Health information only. This library explains common STIs and their testing — it is not a
        diagnosis. A clinician can help you choose a test and interpret your results.
      </p>
      <div className="j-layout">
        <aside className="j-aside">
          <div className="j-eyebrow">UNDERSTAND YOUR HEALTH</div>
          <h2>Care on your terms.</h2>
          <p>A clear path from understanding a condition to choosing the right test.</p>
          <ol className="j-nav">
            {diseaseSections.map(section => (
              <React.Fragment key={section.label}>
                <li className="j-nav-group">{section.label}</li>
                {section.groups.map((group, index) => (
                  <li key={group.title}>
                    <button
                      type="button"
                      className={`j-nav-link ${group === activeGroup ? "is-active" : ""}`}
                      aria-current={group === activeGroup ? "page" : undefined}
                      onClick={() => openGroup(group)}
                    >
                      <span className="j-num">{index + 1}</span>
                      {group.title}
                    </button>
                  </li>
                ))}
              </React.Fragment>
            ))}
          </ol>
          <div className="j-aside-foot">
            Accessible Testing.
            <br />
            Healthier Tomorrows.
          </div>
        </aside>

        <main className="j-main">
          <div className="j-eyebrow">SATELLITE HEALTH · INFORMATION</div>
          <h1 className="j-title">Disease information.</h1>
          <p className="j-intro">
            Explore common STIs, their symptoms, testing, and care. Select a topic from the sidebar.
          </p>
          <div className="j-disease-layout">
            <nav className="j-disease-nav" aria-label={`${activeGroup.title} topics`}>
              {activeGroup.topics.map(topic => (
                <button
                  key={topic.slug}
                  type="button"
                  className={topic.slug === activeTopic.slug ? "is-chosen" : ""}
                  aria-pressed={topic.slug === activeTopic.slug}
                  onClick={() => selectTopic(topic.slug)}
                >
                  {topic.title}
                </button>
              ))}
            </nav>
            <article className="j-panel">
              <span className="j-tag">UNDERSTAND YOUR HEALTH</span>
              <h2 className="j-panel-title">{panelTitle}</h2>
              <div className="j-body">
                <Article />
              </div>
              <p className="j-hint">
                General education, not a diagnosis. A clinician can help choose tests and interpret
                results.
              </p>
              <div className="j-actions">
                <Link className="j-button" to="/price-packages?view=all">
                  Browse tests
                </Link>
                <Link className="j-button j-button--secondary" to="/doctor-consultation">
                  Talk to a clinician
                </Link>
              </div>
            </article>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Diseases;
