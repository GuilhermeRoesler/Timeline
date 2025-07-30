import { useEffect } from "react"
import Event from "./Event"
import { useEventsLoaderStore } from "../../store/periodsEventsLoaderStore"

const EventsLoader = () => {
    const { events, loadEventsFromLocalStorage } = useEventsLoaderStore(state => state)

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