import { useState } from 'react';
import { type Event as EventType } from '../../types/event';
import { Circle } from 'react-konva';
import { useDetailsBalloonStore } from '../../store/detailsBalloonStore';
import { useSidePanelStore } from '../../store/sidePanelStore';
import { TIMELINE_Y, useSettingsStore } from '../../store/settingsStore';

const Event = ({ event }: { event: EventType }) => {
    const [hovered, setHovered] = useState(false);
    const setEvent = useDetailsBalloonStore((state) => state.setEvent);
    const { BASE_YEAR, YEAR_SPACING, EVENT_RADIUS } = useSettingsStore((state) => state);

    const x = (event.date.getYear() - BASE_YEAR) * YEAR_SPACING;
    const radius = hovered ? EVENT_RADIUS * 1.35 : EVENT_RADIUS;

    return (
        <Circle
            x={x}
            y={TIMELINE_Y}
            radius={radius}
            fill={event.color || '#ffb703'}
            stroke="#fff"
            strokeWidth={hovered ? 3 : 2}
            shadowEnabled
            shadowColor="rgba(15, 23, 42, 0.35)"
            shadowBlur={hovered ? 12 : 6}
            shadowOffsetY={hovered ? 3 : 1}
            onMouseEnter={() => {
                setHovered(true);
                if (!useDetailsBalloonStore.getState().pinned) {
                    setEvent(event);
                }
            }}
            onMouseLeave={() => {
                setHovered(false);
                if (!useDetailsBalloonStore.getState().pinned) {
                    setEvent(null);
                }
            }}
            onClick={() => useSidePanelStore.setState({ editEvent: event })}
        />
    );
};

export default Event;
