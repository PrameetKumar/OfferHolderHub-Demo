type AiInsightsProps = {
  centreGroup: string;
};

export function AiInsights({
  centreGroup,
}: AiInsightsProps) {
  return (
    <div className="page-content">
      <div className="page-heading-row">
        <div>
          <div className="page-eyebrow">
            {centreGroup} Centre Group
          </div>

          <h1 className="page-heading">AI Insights</h1>

          <p className="page-description">
            Executive-ready observations, risks and recommended
            actions generated from engagement and conversion signals.
          </p>
        </div>

        <button type="button" className="primary-action">
          Generate latest briefing
        </button>
      </div>

      <section className="ai-hero-panel">
        <div className="ai-orb">AI</div>

        <div>
          <div className="panel-eyebrow">
            Executive briefing
          </div>

          <h2>Performance remains positive, with three areas requiring focus</h2>

          <p>
            Contact coverage and conversion momentum are improving.
            Expert-call progression and follow-up speed remain the
            largest opportunities in this illustrative prototype.
          </p>
        </div>

        <div className="confidence-card">
          <span>Confidence</span>
          <strong>High</strong>
          <small>Based on available prototype indicators</small>
        </div>
      </section>

      <section className="ai-insight-grid">
        <AiInsightCard
          category="Positive movement"
          title="Contact activity is accelerating"
          detail="Weekly activity is trending above the earlier period, supported by stronger centre-level engagement."
          evidence="Calls +7.2%"
          tone="positive"
        />

        <AiInsightCard
          category="Conversion opportunity"
          title="Answered calls need faster progression"
          detail="A meaningful cohort has answered a call but has not progressed to an expert conversation."
          evidence="6.8K opportunities"
          tone="warning"
        />

        <AiInsightCard
          category="Centre watchlist"
          title="Performance variation is increasing"
          detail="The gap between leading and lower-performing centres has widened in the prototype view."
          evidence="20 point gap"
          tone="risk"
        />
      </section>

      <section className="ai-bottom-layout">
        <article className="dashboard-panel">
          <div className="panel-heading-row">
            <div>
              <div className="panel-eyebrow">
                Recommended actions
              </div>

              <h2>Next-best interventions</h2>
            </div>

            <span className="prototype-badge">
              Management preview
            </span>
          </div>

          <div className="action-list">
            <RecommendedAction
              number="01"
              title="Prioritise answered calls awaiting expert contact"
              owner="Recruitment operations"
              impact="High"
            />

            <RecommendedAction
              number="02"
              title="Review centre-level contact coverage gaps"
              owner="Centre leadership"
              impact="Medium"
            />

            <RecommendedAction
              number="03"
              title="Create a targeted confirmation follow-up cohort"
              owner="Conversion team"
              impact="High"
            />
          </div>
        </article>

        <article className="dashboard-panel copilot-panel">
          <div className="panel-eyebrow">
            Ask the intelligence hub
          </div>

          <h2>Explore performance in natural language</h2>

          <div className="suggested-questions">
            <button>
              What changed this week?
            </button>

            <button>
              Which centres require attention?
            </button>

            <button>
              Where is the largest conversion opportunity?
            </button>
          </div>

          <div className="copilot-input">
            <input
              type="text"
              placeholder="Ask a question about offer-holder performance"
            />

            <button type="button">Ask</button>
          </div>
        </article>
      </section>
    </div>
  );
}

type AiInsightCardProps = {
  category: string;
  title: string;
  detail: string;
  evidence: string;
  tone: "positive" | "warning" | "risk";
};

function AiInsightCard({
  category,
  title,
  detail,
  evidence,
  tone,
}: AiInsightCardProps) {
  return (
    <article className={`ai-insight-card ai-insight-${tone}`}>
      <div className="ai-insight-category">{category}</div>
      <h2>{title}</h2>
      <p>{detail}</p>
      <strong>{evidence}</strong>
    </article>
  );
}

type RecommendedActionProps = {
  number: string;
  title: string;
  owner: string;
  impact: string;
};

function RecommendedAction({
  number,
  title,
  owner,
  impact,
}: RecommendedActionProps) {
  return (
    <div className="recommended-action">
      <span className="action-number">{number}</span>

      <div>
        <strong>{title}</strong>
        <span>{owner}</span>
      </div>

      <span className="impact-badge">{impact} impact</span>
    </div>
  );
}