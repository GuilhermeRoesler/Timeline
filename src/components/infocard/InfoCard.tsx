import { useState, useEffect, useCallback } from 'react';
import { useDetailsBalloonStore } from '../../store/detailsBalloonStore';
import { useStageControlsStore } from '../../store/stageControlsStore';
import { type Event } from '../../types/event';
import { type Period } from '../../types/period';
import { usePeriodsStore } from '../../store/periodsStore';
import { useEventsStore } from '../../store/eventsStore';
import { TIMELINE_Y, useSettingsStore } from '../../store/settingsStore';
import SameYearEventsList from './SameYearEventsList';
import InfoCardContent from './InfoCardContent';
import { deletePeriod } from '../../services/periodService';
import { deleteEvent } from '../../services/eventService';

const InfoCard = () => {
    const { stageScale, stagePos } = useStageControlsStore((state) => state);
    const { event, period, pinned, clearDetails } = useDetailsBalloonStore((state) => state);
    const { YEAR_SPACING, BASE_YEAR, PERIOD_HEIGHT, LEVEL_SPACING } = useSettingsStore(
        (state) => state,
    );
    const [localEvent, setLocalEvent] = useState<Event | null>(null);
    const [localPeriod, setLocalPeriod] = useState<Period | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [animation, setAnimation] = useState('');
    const [sameYearEvents, setSameYearEvents] = useState<Event[]>([]);
    const [sameYearEventsIndex, setSameYearEventsIndex] = useState(0);
    const events = useEventsStore((state) => state.events);

    const handleClose = () => {
        setIsHovered(false);
        clearDetails();
    };

    const handleDelete = () => {
        if (localEvent) {
            deleteEvent(localEvent.id);
            useEventsStore.getState().removeEvent(localEvent.id);
            setLocalEvent(null);
        } else if (localPeriod) {
            deletePeriod(localPeriod.id);
            usePeriodsStore.getState().removePeriod(localPeriod.id);
            setLocalPeriod(null);
        }
        clearDetails();
        setAnimation('infoCardFadeOut 0.35s cubic-bezier(0.22, 1, 0.36, 1)');
    };

    const getOtherEvents = useCallback(
        (selectedEvent: Event): void => {
            const eventsFiltered = events.filter(
                (e) => e.date.getYear() === selectedEvent.date.getYear(),
            );
            setSameYearEvents(eventsFiltered);
        },
        [events],
    );

    useEffect(() => {
        if (event) {
            const timeout = window.setTimeout(
                () => {
                    setLocalEvent(event);
                    setAnimation('infoCardFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)');
                    setLocalPeriod(null);
                    getOtherEvents(event);
                },
                pinned ? 0 : 220,
            );
            return () => window.clearTimeout(timeout);
        }
        if (period) {
            const timeout = window.setTimeout(
                () => {
                    setLocalPeriod(period);
                    setAnimation('infoCardFadeIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)');
                    setLocalEvent(null);
                },
                pinned ? 0 : 220,
            );
            return () => window.clearTimeout(timeout);
        }
    }, [event, period, getOtherEvents, pinned]);

    useEffect(() => {
        if (!isHovered && !pinned && !(event || period)) {
            const fadeTimeout = window.setTimeout(() => {
                setAnimation('infoCardFadeOut 0.3s ease-in-out');
                window.setTimeout(() => {
                    setLocalEvent(null);
                    setLocalPeriod(null);
                }, 280);
            }, 0);
            return () => window.clearTimeout(fadeTimeout);
        }
    }, [event, period, isHovered, pinned]);

    if (localEvent)
        return (
            <div
                className="info-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    left: `${((localEvent.date.getYear() - BASE_YEAR) * YEAR_SPACING + stagePos.x / stageScale + 10) * stageScale}px`,
                    top: `${(TIMELINE_Y + stagePos.y / stageScale) * stageScale - 130}px`,
                    translate: '0 -50%',
                    animation: animation,
                }}
            >
                <InfoCardContent
                    title={sameYearEvents[sameYearEventsIndex].title}
                    date={sameYearEvents[sameYearEventsIndex].date.getYear().toString()}
                    description={sameYearEvents[sameYearEventsIndex].description}
                    image={sameYearEvents[sameYearEventsIndex].image}
                    onClose={handleClose}
                    onDelete={handleDelete}
                />
                <SameYearEventsList
                    sameYearEvents={sameYearEvents}
                    sameYearEventsIndex={sameYearEventsIndex}
                    setSameYearEventsIndex={setSameYearEventsIndex}
                />
            </div>
        );

    if (localPeriod)
        return (
            <div
                className="info-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    left: `${((localPeriod.end.getYear() - BASE_YEAR) * YEAR_SPACING + stagePos.x / stageScale) * stageScale}px`,
                    top: `${(TIMELINE_Y + stagePos.y / stageScale) * stageScale - localPeriod.level * (PERIOD_HEIGHT + LEVEL_SPACING) * stageScale}px`,
                    translate: `-20px calc(-50% - 100px * ${stageScale})`,
                    animation: animation,
                }}
            >
                <InfoCardContent
                    title={localPeriod.title}
                    date={`${localPeriod.start.getYear()} - ${localPeriod.end.getYear()}`}
                    description={localPeriod.description}
                    image={localPeriod.image}
                    onClose={handleClose}
                    onDelete={handleDelete}
                />
            </div>
        );
};

export default InfoCard;
