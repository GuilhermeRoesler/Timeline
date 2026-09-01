import { hexToRgba } from "../../utils/colorUtils"
import type { Event } from "../../types/event"

const SameYearEventsList = ({ sameYearEvents, sameYearEventsIndex, setSameYearEventsIndex }: { sameYearEvents: Event[], sameYearEventsIndex: number, setSameYearEventsIndex: React.Dispatch<React.SetStateAction<number>> }) => {
    return (
        <div className="same-year-events-list">
            {sameYearEvents.map((event, index) => (
                <div key={index} className="item" onClick={() => setSameYearEventsIndex(index)}
                    style={{ backgroundColor: hexToRgba(event.color, 0.7), opacity: index === sameYearEventsIndex ? 1 : 0.5 }}>
                    <h3 className="title">{event.title}</h3>
                    <p className="description">{event.description === "" ? "Add a description here..." : event.description}</p>
                </div>
            ))}
        </div>
    )
}

export default SameYearEventsList