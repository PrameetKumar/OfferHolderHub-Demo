type KpiCardProps = {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  description?: string;
  accent?: "red" | "blue" | "green" | "amber";
};

export function KpiCard({
  label,
  value,
  change,
  trend = "neutral",
  description,
  accent = "blue",
}: KpiCardProps) {
  return (
    <article className={`dashboard-kpi dashboard-kpi-${accent}`}>
      <div className="dashboard-kpi-top">
        <span className="dashboard-kpi-label">{label}</span>

        <span className={`trend-badge trend-${trend}`}>
          {trend === "up" && "↑"}
          {trend === "down" && "↓"}
          {trend === "neutral" && "•"}
          {change}
        </span>
      </div>

      <div className="dashboard-kpi-value">{value}</div>

      {description && (
        <div className="dashboard-kpi-description">
          {description}
        </div>
      )}
    </article>
  );
}