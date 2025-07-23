import { type Event as EventType } from "../models/event"
import { Circle } from "react-konva";
import { timelineY, baseYear, yearSpacing } from "../constants";
import { useEventsDetails } from "../hooks/useEventDetails";

const Event = ({ event }: { event: EventType }) => {
    const { setIsHovered } = useEventsDetails();

    const x = (event.year - baseYear) * yearSpacing;

    return (
        <>
            <Circle
                x={x}
                y={timelineY}
                radius={20}
                fill={event.color || "#ffb703"}
                opacity={0.7}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            />
        </>
    )
}

export default Event