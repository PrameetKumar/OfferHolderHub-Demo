export type AppPage =
  | "overview"
  | "funnel"
  | "activity"
  | "performance"
  | "explorer"
  | "insights";

type NavigationItem = {
  id: AppPage;
  label: string;
  shortLabel: string;
};

type AppNavigationProps = {
  selectedPage: AppPage;
  centreGroup: string;
  onChange: (page: AppPage) => void;
  onBack: () => void;
};

const navigationItems: NavigationItem[] = [
  {
    id: "overview",
    label: "Executive Overview",
    shortLabel: "Overview",
  },
  {
    id: "funnel",
    label: "Conversion Funnel",
    shortLabel: "Funnel",
  },
  {
    id: "activity",
    label: "Contact Activity",
    shortLabel: "Activity",
  },
  {
    id: "performance",
    label: "Centre Performance",
    shortLabel: "Performance",
  },
  {
    id: "explorer",
    label: "Opportunity Explorer",
    shortLabel: "Explorer",
  },
  {
    id: "insights",
    label: "AI Insights",
    shortLabel: "AI Insights",
  },
];

export function AppNavigation({
  selectedPage,
  centreGroup,
  onChange,
  onBack,
}: AppNavigationProps) {
  return (
    <header className="application-header">
      <div className="application-brand">
        <button
          type="button"
          className="back-button"
          onClick={onBack}
        >
          <span aria-hidden="true">←</span>
          Centre Groups
        </button>

        <div className="brand-divider" />

        <div>
          <div className="application-title">
            Offer Holder Intelligence Hub
          </div>

          <div className="application-context">
            {centreGroup} view
          </div>
        </div>
      </div>

      <nav
        className="application-navigation"
        aria-label="Application pages"
      >
        {navigationItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={
              selectedPage === item.id
                ? "application-tab application-tab-active"
                : "application-tab"
            }
            onClick={() => onChange(item.id)}
            title={item.label}
          >
            {item.shortLabel}
          </button>
        ))}
      </nav>

      <div className="connection-status">
        <span className="connection-dot" />
        Prototype mode
      </div>
    </header>
  );
}