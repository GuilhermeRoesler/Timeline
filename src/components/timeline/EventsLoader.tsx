import { useEffect } from "react"
import Event from "./Event"
import { useEventsLoaderStore } from "../../store/periodsEventsLoaderStore"

const EventsLoader = () => {
    const events = useEventsLoaderStore(state => state.events)
    const loadEventsFromLocalStorage = useEventsLoaderStore(state => state.loadEventsFromLocalStorage)

    useEffect(() => {
        loadEventsFromLocalStorage();
    }, []);

    return (
        <>
            {events.map((event, index) => (
                <Event key={index} event={event} />
            ))}
        </>
    )
}

export default EventsLoader