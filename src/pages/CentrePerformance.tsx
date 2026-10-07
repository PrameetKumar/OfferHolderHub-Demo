type CentrePerformanceProps = {
  centreGroup: string;
};

const centres = [
  {
    rank: 1,
    centre: "London",
    calls: "81.4%",
    expert: "4,820",
    conversion: "24.8%",
    movement: "+3",
    score: 92,
  },
  {
    rank: 2,
    centre: "Manchester",
    calls: "79.6%",
    expert: "3,740",
    conversion: "22.9%",
    movement: "+1",
    score: 88,
  },
  {
    rank: 3,
    centre: "Sydney",
    calls: "76.2%",
    expert: "3,120",
    conversion: "21.4%",
    movement: "-1",
    score: 84,
  },
  {
    rank: 4,
    centre: "Newcastle",
    calls: "72.8%",
    expert: "2,610",
    conversion: "19.7%",
    movement: "+2",
    score: 79,
  },
  {
    rank: 5,
    centre: "New York",
    calls: "68.1%",
    expert: "2,240",
    conversion: "17.3%",
    movement: "-2",
    score: 72,
  },
];

export function CentrePerformance({
  centreGroup,
}: CentrePerformanceProps) {
  return (
    <div className="page-content">
      <div className="page-heading-row">
        <div>
          <div className="page-eyebrow">
            {centreGroup} Centre Group
          </div>

          <h1 className="page-heading">Centre Performance</h1>

          <p className="page-description">
            Compare centre-level engagement, expert-call activity and
            conversion performance.
          </p>
        </div>

        <div className="filter-pills">
          <button className="filter-pill filter-pill-active">
            Composite score
          </button>
          <button className="filter-pill">Conversion</button>
          <button className="filter-pill">Calls</button>
        </div>
      </div>

      <section className="performance-summary">
        <article className="performance-highlight performance-best">
          <div className="performance-highlight-label">
             Leading Centre
          </div>
          <strong>London </strong>
          <span>Composite Score 92</span>
        </article>

        <article className="performance-highlight">
          <div className="performance-highlight-label">
               Biggest Improvement
          </div>
          <strong>Newcastle </strong>
          <span>Up 6.2 points</span>
        </article>

        <article className="performance-highlight performance-watch">
          <div className="performance-highlight-label">
               Requires Attention
          </div>
          <strong>New York </strong>
          <span>Conversion Below Benchmark</span>
        </article>
      </section>

      <section className="performance-layout">
        <article className="dashboard-panel ranking-panel">
          <div className="panel-heading-row">
            <div>
              <div className="panel-eyebrow">
                Centre rankings
              </div>
              <h2>Performance leaderboard</h2>
            </div>

            <button className="secondary-action">
              Expand ranking
            </button>
          </div>

          <div className="ranking-table">
            <div className="ranking-table-header">
              <span>Rank</span>
              <span>Centre</span>
              <span>Calls %</span>
              <span>Expert calls</span>
              <span>Conversion</span>
              <span>Movement</span>
              <span>Score</span>
            </div>

            {centres.map((centre) => (
              <div
                key={centre.centre}
                className="ranking-table-row"
              >
                <span className="rank-badge">{centre.rank}</span>
                <strong>{centre.centre}</strong>
                <span>{centre.calls}</span>
                <span>{centre.expert}</span>
                <span>{centre.conversion}</span>

                <span
                  className={
                    centre.movement.startsWith("+")
                      ? "movement-positive"
                      : "movement-negative"
                  }
                >
                  {centre.movement}
                </span>

                <span className="score-cell">
                  <span
                    className="score-bar"
                    style={{ width: `${centre.score}%` }}
                  />
                  <strong>{centre.score}</strong>
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel quadrant-panel">
          <div className="panel-eyebrow">
            Performance matrix
          </div>
          <h2>Engagement vs conversion</h2>

          <div className="quadrant-chart">
            <div className="quadrant-line-horizontal" />
            <div className="quadrant-line-vertical" />

            <span className="quadrant-label quadrant-top-left">
              High conversion
            </span>

            <span className="quadrant-label quadrant-top-right">
              Leaders
            </span>

            <span className="quadrant-label quadrant-bottom-left">
              Priority
            </span>

            <span className="quadrant-label quadrant-bottom-right">
              Engagement opportunity
            </span>

            <Bubble
              name="London"
              x={70}
              y={24}
              size={72}
              colour="#34d399"
            />

            <Bubble
              name="Manchester"
              x={61}
              y={35}
              size={62}
              colour="#38bdf8"
            />

            <Bubble
              name="Sydney"
              x={50}
              y={42}
              size={56}
              colour="#a78bfa"
            />

            <Bubble
              name="New York"
              x={29}
              y={67}
              size={48}
              colour="#fb7185"
            />
          </div>
        </article>
      </section>
    </div>
  );
}

type BubbleProps = {
  name: string;
  x: number;
  y: number;
  size: number;
  colour: string;
};

function Bubble({
  name,
  x,
  y,
  size,
  colour,
}: BubbleProps) {
  return (
    <div
      className="performance-bubble"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        background: colour,
      }}
    >
      {name}
    </div>
  );
}