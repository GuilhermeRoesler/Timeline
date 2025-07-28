import { useState, useEffect } from "react";
import { useDetailsBalloonStore } from "../store/detailsBalloonStore"
import { useStageControlsStore } from "../store/stageControlsStore";
import { TIMELINE_Y, BASE_YEAR, YEAR_SPACING, LEVEL_SPACING, PERIOD_HEIGHT } from "../constants";
import { type Event } from "../types/event";
import { type Period } from "../types/period";
import { usePeriodsLoaderStore, useEventsLoaderStore } from "../store/periodsEventsLoaderStore";

const DetailsBalloon = () => {
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const stagePos = useStageControlsStore((state) => state.stagePos);
    const event = useDetailsBalloonStore((state) => state.event);
    const period = useDetailsBalloonStore((state) => state.period);
    const [localEvent, setLocalEvent] = useState<Event | null>(null);
    const [localPeriod, setLocalPeriod] = useState<Period | null>(null);
    const [isHovered, setIsHovered] = useState(false)
    const [animation, setAnimation] = useState('');

    const handleDelete = () => {
        if (localEvent) {
            useEventsLoaderStore.getState().removeEvent(localEvent.id);
            setLocalEvent(null);
        } else if (localPeriod) {
            usePeriodsLoaderStore.getState().removePeriod(localPeriod.id);
            setLocalPeriod(null);
        }
        setAnimation('detailsBalloonFadeOut 0.3s ease-in-out');
    }

    useEffect(() => {
        if (event) {
            setTimeout(() => {
                setLocalEvent(event);
                setAnimation('detailsBalloonFadeIn 0.3s ease-in-out');
                setLocalPeriod(null);
            }, 300);
        }
        if (period) {
            setTimeout(() => {
                setLocalPeriod(period);
                setAnimation('detailsBalloonFadeIn 0.3s ease-in-out');
                setLocalEvent(null);
            }, 300);
        }
    }, [event, period]);

    useEffect(() => {
        if (!isHovered && !(event || period)) {
            setAnimation('detailsBalloonFadeOut 0.3s ease-in-out');
            setTimeout(() => {
                setLocalEvent(null);
                setLocalPeriod(null);
            }, 300);
        }
    }, [event, period, isHovered]);

    if (localEvent) return (
        <div className="details-balloon"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                left: `${(((localEvent.date.getYear()) - BASE_YEAR) * YEAR_SPACING + stagePos.x / stageScale + 10) * stageScale}px`,
                top: `${(TIMELINE_Y + stagePos.y / stageScale) * stageScale - 130}px`,
                translate: '0 -50%',
                animation: animation,
            }}>
            <h3 className="title">{localEvent.title}</h3>
            <i className="fa-solid fa-xmark" onClick={() => setIsHovered(false)}></i>
            <p className="date">{localEvent.date.getYear()}</p>
            <p className="description">{localEvent.description}</p>
            {localEvent.image && <img src={localEvent.image} alt={localEvent.title} />}
            <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
    )

    if (localPeriod) return (
        <div className="details-balloon"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                left: `${((localPeriod.end.getYear() - BASE_YEAR) * YEAR_SPACING + stagePos.x / stageScale) * stageScale}px`,
                top: `${(TIMELINE_Y + stagePos.y / stageScale) * stageScale - localPeriod.level * (PERIOD_HEIGHT + LEVEL_SPACING) * stageScale}px`,
                translate: `-20px calc(-50% - 100px * ${stageScale})`,
                animation: animation,
            }}>
            <h3 className="title">{localPeriod.title}</h3>
            <i className="fa-solid fa-xmark" onClick={() => setIsHovered(false)}></i>
            <p className="date">{localPeriod.start.getYear()} - {localPeriod.end.getYear()}</p>
            <p className="description">{localPeriod.description === "" ? "Add a description here..." : localPeriod.description}</p>
            {localPeriod.image && <img src={localPeriod.image} alt={localPeriod.title} />}
            <div className="delete-container"><button className="delete" onClick={handleDelete}>Delete</button></div>
        </div>
    )
}

export default DetailsBalloon