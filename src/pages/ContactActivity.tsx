import { useState } from "react";
import { KpiCard } from "../components/KpiCard";

type ContactActivityProps = {
  centreGroup: string;
};

type ActivityChannel = "CSS Calls" | "Referrals" | "Sistering";

const outcomeRows = [
  {
    outcome: "Answered",
    volume: "8,420",
    percentage: 78,
    colour: "#34d399",
  },
  {
    outcome: "No answer",
    volume: "4,180",
    percentage: 44,
    colour: "#fbbf24",
  },
  {
    outcome: "Call back requested",
    volume: "2,360",
    percentage: 29,
    colour: "#38bdf8",
  },
  {
    outcome: "Referred to expert",
    volume: "1,920",
    percentage: 23,
    colour: "#fb7185",
  },
];

export function ContactActivity({
  centreGroup,
}: ContactActivityProps) {
  const [channel, setChannel] =
    useState<ActivityChannel>("CSS Calls");

  const channels: ActivityChannel[] = [
    "CSS Calls",
    "Referrals",
    "Sistering",
  ];

  return (
    <div className="page-content">
      <div className="page-heading-row">
        <div>
          <div className="page-eyebrow">
            {centreGroup} Centre Group
          </div>

          <h1 className="page-heading">Contact Activity</h1>

          <p className="page-description">
            Monitor engagement volumes, contact outcomes and recent
            activity by contact channel.
          </p>
        </div>

        <div className="segmented-control">
          {channels.map((item) => (
            <button
              key={item}
              type="button"
              className={
                channel === item
                  ? "segment-button segment-button-active"
                  : "segment-button"
              }
              onClick={() => setChannel(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <section className="dashboard-kpi-grid">
        <KpiCard
          label={`${channel} YTD`}
          value="18.3K"
          change="7.2%"
          trend="up"
          accent="blue"
        />

        <KpiCard
          label="Last week"
          value="1,482"
          change="4.6%"
          trend="up"
          accent="green"
        />

        <KpiCard
          label="Refer to expert"
          value="2,190"
          change="2.1%"
          trend="up"
          accent="amber"
        />

        <KpiCard
          label="Answered"
          value="64.8%"
          change="1.8%"
          trend="down"
          accent="red"
        />
      </section>

      <section className="activity-layout">
        <article className="dashboard-panel">
          <div className="panel-heading-row">
            <div>
              <div className="panel-eyebrow">
                {channel}
              </div>
              <h2>Outcome breakdown</h2>
            </div>

            <button className="secondary-action">
              View details
            </button>
          </div>

          <div className="outcome-list">
            {outcomeRows.map((row) => (
              <div key={row.outcome} className="outcome-row">
                <div className="outcome-heading">
                  <span>{row.outcome}</span>
                  <strong>{row.volume}</strong>
                </div>

                <div className="outcome-track">
                  <div
                    className="outcome-value"
                    style={{
                      width: `${row.percentage}%`,
                      background: row.colour,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="panel-eyebrow">
            Recent movement
          </div>
          <h2>16-week activity trend</h2>

          <div className="bar-chart">
            {[31, 42, 36, 51, 47, 58, 64, 55, 69, 73, 68, 81, 76, 84, 79, 91].map(
              (value, index) => (
                <div key={index} className="bar-column">
                  <div
                    className="bar-value"
                    style={{ height: `${value}%` }}
                  />
                  <span>{index + 1}</span>
                </div>
              )
            )}
          </div>
        </article>

        <article className="dashboard-panel recent-activity-panel">
          <div className="panel-eyebrow">Live feed</div>
          <h2>Recent activity</h2>

          <div className="activity-feed">
            <ActivityItem
              title="Expert call completed"
              detail="London centre · 4 minutes ago"
              tone="positive"
            />

            <ActivityItem
              title="Follow-up requested"
              detail="Manchester centre · 11 minutes ago"
              tone="neutral"
            />

            <ActivityItem
              title="Offer holder referred"
              detail="Sydney centre · 18 minutes ago"
              tone="positive"
            />

            <ActivityItem
              title="Priority contact overdue"
              detail="New York centre · 24 minutes ago"
              tone="warning"
            />
          </div>
        </article>
      </section>
    </div>
  );
}

type ActivityItemProps = {
  title: string;
  detail: string;
  tone: "positive" | "neutral" | "warning";
};

function ActivityItem({
  title,
  detail,
  tone,
}: ActivityItemProps) {
  return (
    <div className="activity-item">
      <span className={`activity-marker activity-${tone}`} />

      <div>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
    </div>
  );
}