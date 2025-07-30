import { useState, useEffect } from "react";
import { useDetailsBalloonStore } from "../store/detailsBalloonStore"
import { useStageControlsStore } from "../store/stageControlsStore";
import { type Event } from "../types/event";
import { type Period } from "../types/period";
import { usePeriodsLoaderStore, useEventsLoaderStore } from "../store/periodsEventsLoaderStore";
import { TIMELINE_Y, useSettingsStore } from "../store/settingsStore";
import { hexToRgba } from "../utils/colorUtils";

const DetailsBalloon = () => {
    const { stageScale, stagePos } = useStageControlsStore((state) => state);
    const { event, period } = useDetailsBalloonStore((state) => state);
    const [localEvent, setLocalEvent] = useState<Event | null>(null);
    const [localPeriod, setLocalPeriod] = useState<Period | null>(null);
    const [isHovered, setIsHovered] = useState(false)
    const [animation, setAnimation] = useState('');
    const { YEAR_SPACING, BASE_YEAR, PERIOD_HEIGHT, LEVEL_SPACING } = useSettingsStore((state) => state);
    const [sameYearEvents, setSameYearEvents] = useState<Event[]>([]);
    const [sameYearEventsIndex, setSameYearEventsIndex] = useState(0);
    const events = useEventsLoaderStore((state) => state.events);

    const handleDelete = () => {
        if (localEvent) {
            useEventsLoaderStore.getState().removeEvent(localEvent.id);
            setLocalEvent(null);
        } else if (localPeriod) {
            usePeriodsLoaderStore.getState().removePeriod(localPeriod.id);
            setLocalPeriod(null);
        }
        setAnimation('infoCardFadeOut 0.3s ease-in-out');
    }

    const getOtherEvents = (event: Event): void => {
        const eventsFiltered = events.filter(e => e.date.getYear() === event.date.getYear());
        setSameYearEvents(eventsFiltered);
    }

    useEffect(() => {
        if (event) {
            setTimeout(() => {
                setLocalEvent(event);
                setAnimation('infoCardFadeIn 0.3s ease-in-out');
                setLocalPeriod(null);
                getOtherEvents(event);
            }, 300);
        }
        if (period) {
            setTimeout(() => {
                setLocalPeriod(period);
                setAnimation('infoCardFadeIn 0.3s ease-in-out');
                setLocalEvent(null);
            }, 300);
        }
    }, [event, period]);

    useEffect(() => {
        if (!isHovered && !(event || period)) {
            setAnimation('infoCardFadeOut 0.3s ease-in-out');
            setTimeout(() => {
                setLocalEvent(null);
                setLocalPeriod(null);
            }, 300);
        }
    }, [event, period, isHovered]);

    if (localEvent) return (
        <div className="info-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                left: `${(((localEvent.date.getYear()) - BASE_YEAR) * YEAR_SPACING + stagePos.x / stageScale + 10) * stageScale}px`,
                top: `${(TIMELINE_Y + stagePos.y / stageScale) * stageScale - 130}px`,
                translate: '0 -50%',
                animation: animation,
            }}>
            <div className="content">
                <h3 className="title">{sameYearEvents[sameYearEventsIndex].title}</h3>
                <i className="fa-solid fa-xmark" onClick={() => setIsHovered(false)}></i>
                <p className="date">{sameYearEvents[sameYearEventsIndex].date.getYear()}</p>
                <p className="description">{sameYearEvents[sameYearEventsIndex].description === "" ? "Add a description here..." : sameYearEvents[sameYearEventsIndex].description}</p>
                {sameYearEvents[sameYearEventsIndex].image && <img src={sameYearEvents[sameYearEventsIndex].image} alt={sameYearEvents[sameYearEventsIndex].title} />}
                <button className="delete" onClick={handleDelete}>Delete</button>
            </div>
            <div className="assistant">
                {sameYearEvents.map((event, index) => (
                    <div key={index} className="item" onClick={() => setSameYearEventsIndex(index)}
                        style={{ backgroundColor: hexToRgba(event.color, 0.7), opacity: index === sameYearEventsIndex ? 1 : 0.5 }}>
                        <h3 className="title">{event.title}</h3>
                        <p className="description">{event.description === "" ? "Add a description here..." : event.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )

    if (localPeriod) return (
        <div className="info-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                left: `${((localPeriod.end.getYear() - BASE_YEAR) * YEAR_SPACING + stagePos.x / stageScale) * stageScale}px`,
                top: `${(TIMELINE_Y + stagePos.y / stageScale) * stageScale - localPeriod.level * (PERIOD_HEIGHT + LEVEL_SPACING) * stageScale}px`,
                translate: `-20px calc(-50% - 100px * ${stageScale})`,
                animation: animation,
            }}>
            <div className="content">
                <h3 className="title">{localPeriod.title}</h3>
                <i className="fa-solid fa-xmark" onClick={() => setIsHovered(false)}></i>
                <p className="date">{localPeriod.start.getYear()} - {localPeriod.end.getYear()}</p>
                <p className="description">{localPeriod.description === "" ? "Add a description here..." : localPeriod.description}</p>
                {localPeriod.image && <img src={localPeriod.image} alt={localPeriod.title} />}
                <button className="delete" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DetailsBalloon