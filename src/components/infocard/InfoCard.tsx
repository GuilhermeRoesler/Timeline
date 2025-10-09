import { useState, useEffect } from "react";
import { useDetailsBalloonStore } from "../../store/detailsBalloonStore"
import { useStageControlsStore } from "../../store/stageControlsStore";
import { type Event } from "../../types/event";
import { type Period } from "../../types/period";
import { usePeriodsLoaderStore, useEventsLoaderStore } from "../../store/periodsEventsLoaderStore";
import { TIMELINE_Y, useSettingsStore } from "../../store/settingsStore";
import SameYearEventsList from "./SameYearEventsList";
import InfoCardContent from "./InfoCardContent";
import { useGlobalConfigStore } from "../../store/globalConfigStore";

const InfoCard = () => {
    const { stageScale, stagePos } = useStageControlsStore((state) => state);
    const { event, period } = useDetailsBalloonStore((state) => state);
    const { YEAR_SPACING, BASE_YEAR, PERIOD_HEIGHT, LEVEL_SPACING } = useSettingsStore((state) => state);
    const [localEvent, setLocalEvent] = useState<Event | null>(null);
    const [localPeriod, setLocalPeriod] = useState<Period | null>(null);
    const [isHovered, setIsHovered] = useState(false)
    const [animation, setAnimation] = useState('');
    const [sameYearEvents, setSameYearEvents] = useState<Event[]>([]);
    const [sameYearEventsIndex, setSameYearEventsIndex] = useState(0);
    const events = useEventsLoaderStore((state) => state.events);
    const api = useGlobalConfigStore(state => state.api)

    const handleDelete = async () => {
        if (localEvent) {
            useEventsLoaderStore.getState().removeEvent(localEvent.id);
            await api.post('/manage_events.php', {
                id: localEvent.id,
                _method: 'DELETE'
            });
            setLocalEvent(null);
        } else if (localPeriod) {
            usePeriodsLoaderStore.getState().removePeriod(localPeriod.id);
            await api.post('/manage_periods.php', {
                id: localPeriod.id,
                _method: 'DELETE'
            });
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
            <InfoCardContent
                title={sameYearEvents[sameYearEventsIndex].title}
                date={sameYearEvents[sameYearEventsIndex].date.getYear().toString()}
                description={sameYearEvents[sameYearEventsIndex].description}
                image={sameYearEvents[sameYearEventsIndex].image}
                onClose={() => setIsHovered(false)}
                onDelete={handleDelete} />
            <SameYearEventsList
                sameYearEvents={sameYearEvents}
                sameYearEventsIndex={sameYearEventsIndex}
                setSameYearEventsIndex={setSameYearEventsIndex} />
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
            <InfoCardContent
                title={localPeriod.title}
                date={`${localPeriod.start.getYear()} - ${localPeriod.end.getYear()}`}
                description={localPeriod.description}
                image={localPeriod.image}
                onClose={() => setIsHovered(false)}
                onDelete={handleDelete} />
        </div>
    )
}

export default InfoCard