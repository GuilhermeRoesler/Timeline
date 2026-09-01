import { useState, useEffect } from "react"
import { type Event as EventType } from "../types/event"
import Event from "./Event"

const EventsLoader = () => {
    const [events, setEvents] = useState<EventType[]>([]);

    useEffect(() => {
        const events = localStorage.getItem('events');
        if (events) setEvents(JSON.parse(events));
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