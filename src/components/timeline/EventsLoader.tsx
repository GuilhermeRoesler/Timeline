import Event from "./Event"
import { useEventsLoaderStore } from "../../store/periodsEventsLoaderStore"

const EventsLoader = () => {
    const { events } = useEventsLoaderStore(state => state)

    return (
        <>
            {events.map((event, index) => (
                <Event key={index} event={event} />
            ))}
        </>
    )
}

export default EventsLoader