import Event from "./Event"
import { useEventsStore } from "../../store/eventsStore"

const EventsLoader = () => {
    const { events } = useEventsStore(state => state)

    return (
        <>
            {events.map((event, index) => (
                <Event key={index} event={event} />
            ))}
        </>
    )
}

export default EventsLoader