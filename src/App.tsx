import {
    useEffect,
    useRef,
    useState,
    type TouchEvent,
    type WheelEvent,
} from "react";

import mapImage from "./empty-state-preview-world-map.png";

import type { AppPage } from "./components/AppNavigation";
import { AppNavigation } from "./components/AppNavigation";

import { ExecutiveOverview } from "./pages/ExecutiveOverview";
import { ConversionFunnel } from "./pages/ConversionFunnel";
import { ContactActivity } from "./pages/ContactActivity";
import { CentrePerformance } from "./pages/CentrePerformance";
import { OpportunityExplorer } from "./pages/OpportunityExplorer";
import { AiInsights } from "./pages/AiInsights";

import "./app.css";

type CentreGroup = {
    id: string;
    shortName: string;
    name: string;
    subtitle: string;
    icon: string;
    mapPosition: string;
    mapSize: string;
    metricOneLabel: string;
    metricOneValue: string;
    metricTwoLabel: string;
    metricTwoValue: string;
    metricThreeLabel: string;
    metricThreeValue: string;
    isRisk?: boolean;
};

const centreGroups: CentreGroup[] = [
    {
        id: "overall",
        shortName: "Overall",
        name: "Overall Summary",
        subtitle: "All centre groups",
        icon: "O",
        mapPosition: "center",
        mapSize: "760px auto",
        metricOneLabel: "Total Calls - Offer Holders YTD",
        metricOneValue: "38.6K",
        metricTwoLabel: "% Expert Calls",
        metricTwoValue: "30.2%",
        metricThreeLabel: "Offer to Confirm + Enrol",
        metricThreeValue: "18.6%",
    },
    {
        id: "au",
        shortName: "AU",
        name: "Australia",
        subtitle: "AU Centre Group",
        icon: "AU",
        mapPosition: "88% 76%",
        mapSize: "920px auto",
        metricOneLabel: "Calls %",
        metricOneValue: "74.2%",
        metricTwoLabel: "Expert Calls Made (RO)",
        metricTwoValue: "3.6K",
        metricThreeLabel: "Offer to Confirm + Enrol",
        metricThreeValue: "21.2%",
    },
    {
        id: "uk",
        shortName: "UK",
        name: "United Kingdom",
        subtitle: "UK Centre Group",
        icon: "UK",
        mapPosition: "47% 30%",
        mapSize: "1050px auto",
        metricOneLabel: "Calls %",
        metricOneValue: "78.8%",
        metricTwoLabel: "Expert Calls Made (RO)",
        metricTwoValue: "4.8K",
        metricThreeLabel: "Offer to Confirm + Enrol",
        metricThreeValue: "24.5%",
    },
    {
        id: "us",
        shortName: "US",
        name: "United States",
        subtitle: "US Centre Group",
        icon: "US",
        mapPosition: "16% 38%",
        mapSize: "900px auto",
        metricOneLabel: "Calls %",
        metricOneValue: "67.1%",
        metricTwoLabel: "Expert Calls Made (RO)",
        metricTwoValue: "2.5K",
        metricThreeLabel: "Offer to Confirm + Enrol",
        metricThreeValue: "16.7%",
    },
    {
        id: "gl",
        shortName: "GL",
        name: "Global",
        subtitle: "GL Centre Group",
        icon: "GL",
        mapPosition: "center",
        mapSize: "760px auto",
        metricOneLabel: "Calls %",
        metricOneValue: "72.9%",
        metricTwoLabel: "Expert Calls Made (RO)",
        metricTwoValue: "10.9K",
        metricThreeLabel: "Offer to Confirm + Enrol",
        metricThreeValue: "19.8%",
    },
    {
        id: "risk",
        shortName: "Risk",
        name: "At Risk",
        subtitle: "Priority intervention view",
        icon: "!",
        mapPosition: "center",
        mapSize: "760px auto",
        metricOneLabel: "Highest Risk Region",
        metricOneValue: "United States",
        metricTwoLabel: "% Expert Calls",
        metricTwoValue: "4.8%",
        metricThreeLabel: "Offer to Confirm + Enrol",
        metricThreeValue: "3.2%",
        isRisk: true,
    },
];

function normaliseIndex(index: number) {
    return (
        (index + centreGroups.length) %
        centreGroups.length
    );
}

function signedDistance(
    index: number,
    selectedIndex: number
) {
    let distance = index - selectedIndex;
    const half = centreGroups.length / 2;

    if (distance > half) {
        distance -= centreGroups.length;
    }

    if (distance < -half) {
        distance += centreGroups.length;
    }

    return distance;
}

function App() {
    const [selectedIndex, setSelectedIndex] =
        useState(0);

    const [appMode, setAppMode] =
        useState<"landing" | "dashboard">("landing");

    const [selectedPage, setSelectedPage] =
        useState<AppPage>("overview");

    const wheelLocked = useRef(false);

    const touchStartX =
        useRef<number | null>(null);

    const goPrevious = () => {
        setSelectedIndex((current) =>
            normaliseIndex(current - 1)
        );
    };

    const goNext = () => {
        setSelectedIndex((current) =>
            normaliseIndex(current + 1)
        );
    };

    const handleCarouselWheel = (
        event: WheelEvent<HTMLElement>
    ) => {
        event.preventDefault();

        const movement =
            Math.abs(event.deltaY) >=
                Math.abs(event.deltaX)
                ? event.deltaY
                : event.deltaX;

        if (
            Math.abs(movement) < 10 ||
            wheelLocked.current
        ) {
            return;
        }

        wheelLocked.current = true;

        setSelectedIndex((current) =>
            normaliseIndex(
                current + (movement > 0 ? 1 : -1)
            )
        );

        window.setTimeout(() => {
            wheelLocked.current = false;
        }, 420);
    };

    const handleTouchStart = (
        event: TouchEvent<HTMLElement>
    ) => {
        touchStartX.current =
            event.touches[0]?.clientX ?? null;
    };

    const handleTouchEnd = (
        event: TouchEvent<HTMLElement>
    ) => {
        if (touchStartX.current === null) {
            return;
        }

        const touchEndX =
            event.changedTouches[0]?.clientX;

        if (touchEndX === undefined) {
            touchStartX.current = null;
            return;
        }

        const movement =
            touchStartX.current - touchEndX;

        if (Math.abs(movement) > 45) {
            if (movement > 0) {
                goNext();
            } else {
                goPrevious();
            }
        }

        touchStartX.current = null;
    };

    useEffect(() => {
        const handleKeyDown = (
            event: KeyboardEvent
        ) => {
            if (appMode !== "landing") {
                return;
            }

            if (event.key === "ArrowLeft") {
                event.preventDefault();

                setSelectedIndex((current) =>
                    normaliseIndex(current - 1)
                );
            }

            if (event.key === "ArrowRight") {
                event.preventDefault();

                setSelectedIndex((current) =>
                    normaliseIndex(current + 1)
                );
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [appMode]);

    const selectedCentreGroup =
        centreGroups[selectedIndex]?.name ??
        "Overall Summary";

    if (appMode === "dashboard") {
        return (
            <div className="dashboard-shell">
                <AppNavigation
                    selectedPage={selectedPage}
                    centreGroup={selectedCentreGroup}
                    onChange={setSelectedPage}
                    onBack={() => setAppMode("landing")}
                />

                <main className="dashboard-workspace">
                    {selectedPage === "overview" && (
                        <ExecutiveOverview
                            centreGroup={selectedCentreGroup}
                        />
                    )}

                    {selectedPage === "funnel" && (
                        <ConversionFunnel
                            centreGroup={selectedCentreGroup}
                        />
                    )}

                    {selectedPage === "activity" && (
                        <ContactActivity
                            centreGroup={selectedCentreGroup}
                        />
                    )}

                    {selectedPage === "performance" && (
                        <CentrePerformance
                            centreGroup={selectedCentreGroup}
                        />
                    )}

                    {selectedPage === "explorer" && (
                        <OpportunityExplorer
                            centreGroup={selectedCentreGroup}
                        />
                    )}

                    {selectedPage === "insights" && (
                        <AiInsights
                            centreGroup={selectedCentreGroup}
                        />
                    )}
                </main>
            </div>
        );
    }

    return (
        <main
            className="app-shell"
            onWheel={handleCarouselWheel}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="background-glow background-glow-one" />
            <div className="background-glow background-glow-two" />

            <header className="app-header">
                <div className="eyebrow">
                    Recruitment performance intelligence
                </div>

                <div className="header-row">
                    <div className="header-copy">
                        <h1>
                            Offer Holder Intelligence Hub
                        </h1>

                        <p>
                            Explore engagement, expert-call
                            activity and offer-holder conversion
                            performance across INTO centre groups.
                        </p>
                    </div>

                    <div className="header-status">
                        <span className="status-dot" />
                        EXECCUBE connected
                    </div>
                </div>
            </header>

            <section className="carousel-section">
                <div className="carousel-stage">
                    {centreGroups.map(
                        (group, index) => {
                            const distance = signedDistance(
                                index,
                                selectedIndex
                            );

                            const isSelected =
                                distance === 0;

                            const isVisible =
                                Math.abs(distance) <= 2;

                            return (
                                <button
                                    key={group.id}
                                    type="button"
                                    className={`centre-card ${isSelected
                                            ? "centre-card-selected"
                                            : ""
                                        } ${group.isRisk
                                            ? "centre-card-risk"
                                            : ""
                                        }`}
                                    aria-label={`Open ${group.name}`}
                                    aria-current={
                                        isSelected
                                            ? "true"
                                            : undefined
                                    }
                                    onClick={() => {
                                        if (isSelected) {
                                            setSelectedPage(
                                                "overview"
                                            );

                                            setAppMode(
                                                "dashboard"
                                            );
                                        } else {
                                            setSelectedIndex(index);
                                        }
                                    }}
                                    style={{
                                        transform:
                                            getCardTransform(
                                                distance
                                            ),

                                        opacity: isVisible
                                            ? isSelected
                                                ? 1
                                                : Math.abs(
                                                    distance
                                                ) === 1
                                                    ? 0.72
                                                    : 0.38
                                            : 0,

                                        pointerEvents: isVisible
                                            ? "auto"
                                            : "none",

                                        zIndex:
                                            20 -
                                            Math.abs(distance),
                                    }}
                                >
                                    <div
                                        className="map-background"
                                        style={{
                                            backgroundImage:
                                                `url(${mapImage})`,

                                            backgroundPosition:
                                                group.mapPosition,

                                            backgroundSize:
                                                group.mapSize,
                                        }}
                                    />

                                    <div className="map-overlay" />

                                    <div className="card-content">
                                        <div className="card-top-row">
                                            <div>
                                                <div
                                                    className="card-kicker"
                                                    style={
                                                        group.isRisk
                                                            ? {
                                                                color:
                                                                    "#fb7185",
                                                            }
                                                            : undefined
                                                    }
                                                >
                                                    {group.subtitle}
                                                </div>

                                                <h2
                                                    style={
                                                        group.isRisk
                                                            ? {
                                                                color:
                                                                    "#fb7185",
                                                            }
                                                            : undefined
                                                    }
                                                >
                                                    {group.name}
                                                </h2>
                                            </div>

                                            <div
                                                className={`region-icon ${group.id ===
                                                        "risk"
                                                        ? "risk-icon"
                                                        : ""
                                                    }`}
                                            >
                                                {group.icon}
                                            </div>
                                        </div>

                                        <div className="card-description">
                                            {isSelected
                                                ? group.isRisk
                                                    ? "Priority risk and intervention view"
                                                    : "Selected centre-group view"
                                                : "Select to explore this region"}
                                        </div>

                                        <div className="kpi-grid">
                                            <Kpi
                                                value={
                                                    group.metricOneValue
                                                }
                                                label={
                                                    group.metricOneLabel
                                                }
                                                isRisk={
                                                    group.isRisk
                                                }
                                            />

                                            <Kpi
                                                value={
                                                    group.metricTwoValue
                                                }
                                                label={
                                                    group.metricTwoLabel
                                                }
                                                isRisk={
                                                    group.isRisk
                                                }
                                            />

                                            <Kpi
                                                value={
                                                    group.metricThreeValue
                                                }
                                                label={
                                                    group.metricThreeLabel
                                                }
                                                isRisk={
                                                    group.isRisk
                                                }
                                            />
                                        </div>

                                        <div className="card-footer">
                                            <span>
                                                {isSelected
                                                    ? "Open Intelligence Hub"
                                                    : "Bring card forward"}
                                            </span>

                                            <span className="card-arrow">
                                                &gt;
                                            </span>
                                        </div>
                                    </div>
                                </button>
                            );
                        }
                    )}

                    <button
                        type="button"
                        className="carousel-control carousel-control-left"
                        onClick={goPrevious}
                        aria-label="Previous centre group"
                    >
                        &lt;
                    </button>

                    <button
                        type="button"
                        className="carousel-control carousel-control-right"
                        onClick={goNext}
                        aria-label="Next centre group"
                    >
                        &gt;
                    </button>
                </div>

                <div className="carousel-navigation">
                    {centreGroups.map(
                        (group, index) => (
                            <button
                                key={group.id}
                                type="button"
                                className={`navigation-item ${selectedIndex === index
                                        ? "navigation-item-selected"
                                        : ""
                                    }`}
                                onClick={() =>
                                    setSelectedIndex(index)
                                }
                                aria-label={`Select ${group.name}`}
                            >
                                {group.shortName}
                            </button>
                        )
                    )}
                </div>

                <p className="interaction-hint">
                    Scroll, swipe, use keyboard arrows or
                    select a card
                </p>
            </section>
        </main>
    );
}

function getCardTransform(
    distance: number
) {
    const absoluteDistance =
        Math.abs(distance);

    if (distance === 0) {
        return (
            "translateX(-50%) " +
            "translateZ(80px) " +
            "rotateY(0deg) " +
            "scale(1)"
        );
    }

    const direction =
        distance < 0 ? -1 : 1;

    const xPosition =
        direction *
        (absoluteDistance === 1
            ? 300
            : 500);

    const zPosition =
        absoluteDistance === 1
            ? -150
            : -330;

    const rotation =
        direction * -34;

    const scale =
        absoluteDistance === 1
            ? 0.76
            : 0.56;

    return (
        `translateX(calc(-50% + ${xPosition}px)) ` +
        `translateZ(${zPosition}px) ` +
        `rotateY(${rotation}deg) ` +
        `scale(${scale})`
    );
}

type KpiProps = {
    value: string;
    label: string;
    isRisk?: boolean;
};

function Kpi({
    value,
    label,
    isRisk = false,
}: KpiProps) {
    return (
        <div className="kpi">
            <div
                className="kpi-value"
                style={
                    isRisk
                        ? {
                            color: "#fb7185",
                        }
                        : undefined
                }
            >
                {value}
            </div>

            <div
                className="kpi-label"
                style={
                    isRisk
                        ? {
                            color: "#fda4af",
                        }
                        : undefined
                }
            >
                {label}
            </div>
        </div>
    );
}

export default App;