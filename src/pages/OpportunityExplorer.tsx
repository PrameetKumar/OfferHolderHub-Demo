import { useState } from "react";

type OpportunityExplorerProps = {
    centreGroup: string;
};

type Opportunity = {
    name: string;
    centre: string;
    territory: string;
    status: string;
    priority: string;
    lastContact: string;
    likelihood: number;
    action: string;
};

const opportunities: Opportunity[] = [
    {
        name: "Sample Offer Holder 001",
        centre: "London",
        territory: "South Asia",
        status: "Expert Call Due",
        priority: "High",
        lastContact: "2 Days Ago",
        likelihood: 78,
        action: "Schedule Expert Call",
    },
    {
        name: "Sample Offer Holder 002",
        centre: "Manchester",
        territory: "Middle East",
        status: "Follow-up Requested",
        priority: "Medium",
        lastContact: "Yesterday",
        likelihood: 64,
        action: "Arrange Follow-up Call",
    },
    {
        name: "Sample Offer Holder 003",
        centre: "Sydney",
        territory: "East Asia",
        status: "Confirmation Pending",
        priority: "High",
        lastContact: "4 Days Ago",
        likelihood: 85,
        action: "Convert to Confirmation",
    },
    {
        name: "Sample Offer Holder 004",
        centre: "New York",
        territory: "North America",
        status: "Recently Contacted",
        priority: "Low",
        lastContact: "Today",
        likelihood: 58,
        action: "Continue Nurture Journey",
    },
];

export function OpportunityExplorer({
    centreGroup,
}: OpportunityExplorerProps) {
    const [search, setSearch] = useState("");

    const [selectedOpportunity, setSelectedOpportunity] =
        useState<Opportunity>(opportunities[0]);

    const filteredOpportunities = opportunities.filter((item) =>
        [
            item.name,
            item.centre,
            item.territory,
            item.status,
        ]
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="page-content">
            <div className="page-heading-row">
                <div>
                    <div className="page-eyebrow">
                        {centreGroup} Centre Group
                    </div>

                    <h1 className="page-heading">
                        Opportunity Explorer
                    </h1>

                    <p className="page-description">
                        Search and inspect offer-holder
                        opportunities, contact status and
                        recommended next actions.
                    </p>
                </div>
            </div>

            <section className="explorer-search-panel">
                <div className="search-icon">⌕</div>

                <input
                    type="search"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search by offer holder, centre, territory or status"
                />

                <button
                    type="button"
                    className="primary-action"
                >
                    Advanced Filters
                </button>
            </section>

            <section className="explorer-layout">
                <article className="dashboard-panel opportunity-results">
                    <div className="panel-heading-row">
                        <div>
                            <div className="panel-eyebrow">
                                Search Results
                            </div>

                            <h2>
                                {filteredOpportunities.length} Opportunities
                            </h2>
                        </div>

                        <div className="prototype-badge">
                            Prototype Records
                        </div>
                    </div>

                    <div className="opportunity-list">
                        {filteredOpportunities.map((item) => (
                            <article
                                key={item.name}
                                className={`opportunity-card ${selectedOpportunity.name === item.name
                                        ? "selected-opportunity"
                                        : ""
                                    }`}
                                onClick={() =>
                                    setSelectedOpportunity(item)
                                }
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                <div className="opportunity-avatar">
                                    {item.name.slice(-3)}
                                </div>

                                <div className="opportunity-main">
                                    <strong>{item.name}</strong>

                                    <span>
                                        {item.centre} · {item.territory}
                                    </span>
                                </div>

                                <div className="opportunity-status">
                                    <span>Status</span>
                                    <strong>{item.status}</strong>
                                </div>

                                <div className="opportunity-status">
                                    <span>Last Contact</span>
                                    <strong>{item.lastContact}</strong>
                                </div>

                                <span
                                    className={`priority-badge priority-${item.priority.toLowerCase()}`}
                                >
                                    {item.priority}
                                </span>

                                <button
                                    type="button"
                                    className="row-action"
                                >
                                    →
                                </button>
                            </article>
                        ))}
                    </div>
                </article>

                <aside className="dashboard-panel explorer-summary">
                    <div className="panel-eyebrow">
                        Selected Opportunity
                    </div>

                    <h2>Offer Holder Profile</h2>

                    <div
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        <h3>{selectedOpportunity.name}</h3>

                        <p>
                            <strong>Centre:</strong>{" "}
                            {selectedOpportunity.centre}
                        </p>

                        <p>
                            <strong>Territory:</strong>{" "}
                            {selectedOpportunity.territory}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {selectedOpportunity.status}
                        </p>

                        <p>
                            <strong>Last Contact:</strong>{" "}
                            {selectedOpportunity.lastContact}
                        </p>

                        <p>
                            <strong>Priority:</strong>{" "}
                            {selectedOpportunity.priority}
                        </p>

                        <div
                            style={{
                                marginTop: "25px",
                            }}
                        >
                            <div className="panel-eyebrow">
                                Conversion Likelihood
                            </div>

                            <h2>
                                {selectedOpportunity.likelihood}%
                            </h2>

                            <p>
                                Likely To Convert
                            </p>
                        </div>

                        <div
                            style={{
                                marginTop: "25px",
                            }}
                        >
                            <div className="panel-eyebrow">
                                Recommended Action
                            </div>

                            <strong>
                                {selectedOpportunity.action}
                            </strong>
                        </div>

                        <div
                            style={{
                                marginTop: "25px",
                            }}
                        >
                            <div className="panel-eyebrow">
                                Timeline
                            </div>

                            <ul>
                                <li>Offer Created</li>
                                <li>Contacted</li>
                                <li>Call Answered</li>
                                <li>Expert Call Pending</li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </section>
        </div>
    );
}