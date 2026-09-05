import { useState } from 'react';
import { type Event as EventType } from '../../types/event';
import { Circle } from 'react-konva';
import { useDetailsBalloonStore } from '../../store/detailsBalloonStore';
import { useSidePanelStore } from '../../store/sidePanelStore';
import { TIMELINE_Y, useSettingsStore } from '../../store/settingsStore';

const Event = ({ event }: { event: EventType }) => {
    const [hovered, setHovered] = useState(false);
    const setEvent = useDetailsBalloonStore((state) => state.setEvent);
    const isSelected = useSidePanelStore((state) => state.editEvent?.id === event.id);
    const { BASE_YEAR, YEAR_SPACING, EVENT_RADIUS } = useSettingsStore((state) => state);

    const x = (event.date.getYear() - BASE_YEAR) * YEAR_SPACING;
    const active = hovered || isSelected;
    const radius = active ? EVENT_RADIUS * (isSelected ? 1.45 : 1.35) : EVENT_RADIUS;

    return (
        <Circle
            x={x}
            y={TIMELINE_Y}
            radius={radius}
            fill={event.color || '#ffb703'}
            stroke="#fff"
            strokeWidth={active ? (isSelected ? 4 : 3) : 2}
            shadowEnabled
            shadowColor="rgba(15, 23, 42, 0.4)"
            shadowBlur={active ? 16 : 6}
            shadowOffsetY={active ? 4 : 1}
            shadowOpacity={active ? 0.55 : 0.3}
            onMouseEnter={() => {
                setHovered(true);
                document.body.style.cursor = 'pointer';
                if (!useDetailsBalloonStore.getState().pinned) {
                    setEvent(event);
                }
            }}
            onMouseLeave={() => {
                setHovered(false);
                document.body.style.cursor = 'default';
                if (!useDetailsBalloonStore.getState().pinned) {
                    setEvent(null);
                }
            }}
            onClick={() => useSidePanelStore.setState({ editEvent: event })}
        />
    );
};

export default Event;
