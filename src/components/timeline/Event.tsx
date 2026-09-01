import { type Event as EventType } from "../../types/event"
import { Circle } from "react-konva";
import { useDetailsBalloonStore } from "../../store/detailsBalloonStore";
import { useSidePanelStore } from "../../store/sidePanelStore";
import { TIMELINE_Y, useSettingsStore } from "../../store/settingsStore";

const Event = ({ event }: { event: EventType }) => {
    const setEvent = useDetailsBalloonStore((state) => state.setEvent);
    const { BASE_YEAR, YEAR_SPACING, EVENT_RADIUS } = useSettingsStore((state) => state);

    const x = (event.date.getYear() - BASE_YEAR) * YEAR_SPACING;

    return (
        <>
            <Circle
                x={x}
                y={TIMELINE_Y}
                radius={EVENT_RADIUS}
                fill={event.color || "#ffb703"}
                onMouseEnter={() => setEvent(event)}
                onMouseLeave={() => setEvent(null)}
                onClick={() => useSidePanelStore.setState({ editEvent: event })}
            />
        </>
    )
}

export default Event