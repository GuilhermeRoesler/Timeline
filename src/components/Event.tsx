import { type Event as EventType } from "../types/event"
import { Circle } from "react-konva";
import { TIMELINE_Y, BASE_YEAR, YEAR_SPACING } from "../constants";
import { useDetailsBalloonStore } from "../store/detailsBalloonStore";

const Event = ({ event }: { event: EventType }) => {
    const setEvent = useDetailsBalloonStore((state) => state.setEvent);

    const x = (event.year - BASE_YEAR) * YEAR_SPACING;

    return (
        <>
            <Circle
                x={x}
                y={TIMELINE_Y}
                radius={20}
                fill={event.color || "#ffb703"}
                opacity={0.7}
                onMouseEnter={() => setEvent(event)}
                onMouseLeave={() => setEvent(null)}
            />
        </>
    )
}

export default Event