type ConversionFunnelProps = {
  centreGroup: string;
};

const funnelStages = [
  {
    label: "Offer Holders",
    value: "42,340",
    percentage: "100%",
    width: 100,
  },
  {
    label: "Contacted",
    value: "30,232",
    percentage: "71.4%",
    width: 86,
  },
  {
    label: "Answered",
    value: "19,640",
    percentage: "46.4%",
    width: 72,
  },
  {
    label: "Expert Call",
    value: "12,810",
    percentage: "30.3%",
    width: 59,
  },
  {
    label: "Confirmed",
    value: "6,480",
    percentage: "15.3%",
    width: 46,
  },
  {
    label: "Enrolled",
    value: "4,160",
    percentage: "9.8%",
    width: 34,
  },
];

export function ConversionFunnel({
  centreGroup,
}: ConversionFunnelProps) {
  return (
    <div className="page-content">
      <div className="page-heading-row">
        <div>
          <div className="page-eyebrow">
            {centreGroup} Centre Group
          </div>

          <h1 className="page-heading">Conversion Funnel</h1>

          <p className="page-description">
            Track progression from initial offer through contact,
            confirmation and enrolment.
          </p>
        </div>

        <div className="filter-pills">
          <button className="filter-pill filter-pill-active">
            Recruitment Year
          </button>
          <button className="filter-pill">Intake</button>
          <button className="filter-pill">Centre</button>
        </div>
      </div>

      <section className="funnel-layout">
        <article className="dashboard-panel funnel-panel">
          <div className="panel-heading-row">
            <div>
              <div className="panel-eyebrow">
                Offer-holder journey
              </div>
              <h2>Progression by stage</h2>
            </div>

            <div className="prototype-badge">
              Illustrative figures
            </div>
          </div>

          <div className="funnel-visual">
            {funnelStages.map((stage, index) => (
              <div
                key={stage.label}
                className="funnel-stage-wrapper"
              >
                <div
                  className="funnel-stage"
                  style={{ width: `${stage.width}%` }}
                >
                  <div>
                    <span className="funnel-stage-number">
                      {index + 1}
                    </span>

                    <strong>{stage.label}</strong>
                  </div>

                  <div className="funnel-stage-values">
                    <strong>{stage.value}</strong>
                    <span>{stage.percentage}</span>
                  </div>
                </div>

                {index < funnelStages.length - 1 && (
                  <div className="funnel-connector">↓</div>
                )}
              </div>
            ))}
          </div>
        </article>

        <div className="funnel-side-column">
          <article className="dashboard-panel">
            <div className="panel-eyebrow">
              Stage movement
            </div>
            <h2>Largest conversion gaps</h2>

            <div className="gap-list">
              <GapRow
                stage="Contacted to Answered"
                loss="10,592"
                percentage="35.0%"
                severity="high"
              />

              <GapRow
                stage="Answered to Expert Call"
                loss="6,830"
                percentage="34.8%"
                severity="medium"
              />

              <GapRow
                stage="Confirmed to Enrolled"
                loss="2,320"
                percentage="35.8%"
                severity="medium"
              />
            </div>
          </article>

          <article className="dashboard-panel recommendation-panel">
            <div className="recommendation-icon">AI</div>
            <div>
              <div className="panel-eyebrow">
                Recommended focus
              </div>

              <h2>Improve answered-call progression</h2>

              <p>
                Prioritise offer holders with recent engagement but
                no expert-call progression.
              </p>

              <button type="button" className="text-action">
                Explore priority cohort →
              </button>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}

type GapRowProps = {
  stage: string;
  loss: string;
  percentage: string;
  severity: "high" | "medium";
};

function GapRow({
  stage,
  loss,
  percentage,
  severity,
}: GapRowProps) {
  return (
    <div className="gap-row">
      <span className={`severity-dot severity-${severity}`} />

      <div className="gap-row-content">
        <strong>{stage}</strong>
        <span>{loss} offer holders</span>
      </div>

      <span className="gap-percentage">{percentage}</span>
    </div>
  );
}