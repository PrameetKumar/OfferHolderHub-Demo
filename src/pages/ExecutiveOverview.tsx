import { KpiCard } from "../components/KpiCard";

type ExecutiveOverviewProps = {
  centreGroup: string;
};

const trendPoints = [30, 41, 37, 52, 49, 64, 58, 71, 68, 79, 77, 86];

export function ExecutiveOverview({
  centreGroup,
}: ExecutiveOverviewProps) {
  return (
    <div className="page-content">
      <div className="page-heading-row">
        <div>
          <div className="page-eyebrow">
            {centreGroup} Centre Group
          </div>

          <h1 className="page-heading">Executive Overview</h1>

          <p className="page-description">
            A consolidated view of offer-holder engagement,
            expert-call coverage and conversion performance.
          </p>
        </div>

        <div className="page-actions">
          <button type="button" className="secondary-action">
            Export
          </button>

          <button type="button" className="primary-action">
            View priorities
          </button>
        </div>
      </div>

      <section className="dashboard-kpi-grid">
        <KpiCard
          label="Offer Holders"
          value="42.3K"
          change="6.8%"
          trend="up"
          description="Across the selected recruitment cycle"
          accent="blue"
        />

        <KpiCard
          label="Calls %"
          value="71.4%"
          change="3.2%"
          trend="up"
          description="Offer holders with recorded call activity"
          accent="green"
        />

        <KpiCard
          label="Expert Calls Made (RO)"
          value="12.8K"
          change="8.1%"
          trend="up"
          description="Recruitment office expert-call activity"
          accent="amber"
        />

        <KpiCard
          label="Offer to Confirm + Enrol"
          value="18.6%"
          change="1.4%"
          trend="up"
          description="Combined confirmation and enrolment rate"
          accent="red"
        />
      </section>

      <section className="overview-layout">
        <article className="dashboard-panel trend-panel">
          <div className="panel-heading-row">
            <div>
              <div className="panel-eyebrow">
                Engagement trend
              </div>

              <h2>Offer-holder contact activity</h2>
            </div>

            <select
              className="dashboard-select"
              defaultValue="16-weeks"
            >
              <option value="16-weeks">Last 16 weeks</option>
              <option value="8-weeks">Last 8 weeks</option>
              <option value="4-weeks">Last 4 weeks</option>
            </select>
          </div>

          <div className="mock-chart">
            <div className="chart-grid-lines" />

            <svg
              className="trend-svg"
              viewBox="0 0 1000 250"
              preserveAspectRatio="none"
              aria-label="Illustrative engagement trend"
            >
              <defs>
                <linearGradient
                  id="chartArea"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#34d399"
                    stopOpacity="0.42"
                  />
                  <stop
                    offset="100%"
                    stopColor="#34d399"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              <path
                d={createAreaPath(trendPoints)}
                fill="url(#chartArea)"
              />

              <polyline
                points={createLinePoints(trendPoints)}
                fill="none"
                stroke="#34d399"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="chart-axis">
              <span>W1</span>
              <span>W4</span>
              <span>W8</span>
              <span>W12</span>
              <span>W16</span>
            </div>
          </div>
        </article>

        <article className="dashboard-panel health-panel">
          <div className="panel-eyebrow">Current health</div>
          <h2>Conversion readiness</h2>

          <div className="health-score-row">
            <div className="health-ring">
              <div>
                <strong>78</strong>
                <span>/100</span>
              </div>
            </div>

            <div>
              <div className="health-rating">Healthy</div>

              <p>
                Engagement and conversion indicators are tracking
                positively in this prototype view.
              </p>
            </div>
          </div>

          <div className="progress-list">
            <ProgressRow
              label="Contact coverage"
              value={84}
              colour="#38bdf8"
            />

            <ProgressRow
              label="Expert-call coverage"
              value={67}
              colour="#fbbf24"
            />

            <ProgressRow
              label="Conversion momentum"
              value={74}
              colour="#34d399"
            />
          </div>
        </article>
      </section>

      <section className="insight-strip">
        <InsightCard
          title="Leading indicator"
          value="UK contact rate"
          description="Strongest week-on-week engagement improvement."
          tone="positive"
        />

        <InsightCard
          title="Largest opportunity"
          value="Uncontacted offer holders"
          description="Priority cohort available for targeted action."
          tone="neutral"
        />

        <InsightCard
          title="Watchlist"
          value="Expert-call follow-up"
          description="Selected centres show slower progression."
          tone="warning"
        />
      </section>
    </div>
  );
}

type ProgressRowProps = {
  label: string;
  value: number;
  colour: string;
};

function ProgressRow({
  label,
  value,
  colour,
}: ProgressRowProps) {
  return (
    <div className="progress-row">
      <div className="progress-row-heading">
        <span>{label}</span>
        <strong>{value}%</strong>
      </div>

      <div className="progress-track">
        <div
          className="progress-value"
          style={{
            width: `${value}%`,
            background: colour,
          }}
        />
      </div>
    </div>
  );
}

type InsightCardProps = {
  title: string;
  value: string;
  description: string;
  tone: "positive" | "neutral" | "warning";
};

function InsightCard({
  title,
  value,
  description,
  tone,
}: InsightCardProps) {
  return (
    <article className={`insight-card insight-card-${tone}`}>
      <div className="insight-card-title">{title}</div>
      <strong>{value}</strong>
      <p>{description}</p>
    </article>
  );
}

function createLinePoints(values: number[]) {
  return values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 1000;
      const y = 230 - value * 2.1;
      return `${x},${y}`;
    })
    .join(" ");
}

function createAreaPath(values: number[]) {
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 1000;
      const y = 230 - value * 2.1;
      return `${x} ${y}`;
    })
    .join(" L ");

  return `M 0 250 L ${points} L 1000 250 Z`;
}