import { create } from "zustand";
import { SimpleDate } from "../lib/SimpleDate";
import { type Event } from "../types/event";

type EventsLoaderState = {
    events: Event[];
    setEvents: (events: Event[]) => void;
    addEvent: (event: any) => void;
    removeEvent: (eventId: string) => void;
    updateEvent: (updatedEvent: any) => void;
    clearEvents: () => void;
}

export const useEventsStore = create<EventsLoaderState>((set) => ({
    events: [],
    setEvents: (events) => {
        set({ events })
    },
    addEvent: (event) => {
        set((state) => {
            const updatedEvent = { ...event, date: new SimpleDate(event.event_date) }
            const updatedEvents = [...state.events, updatedEvent]
            return { events: updatedEvents };
        });
    },
    removeEvent: (eventId) => {
        set((state) => {
            const updatedEvents = state.events.filter(event => event.id !== eventId);
            return { events: updatedEvents };
        })
    },
    updateEvent: (updatedEvent) => {
        set((state) => {
            const newUpdatedEvent = { ...updatedEvent, date: new SimpleDate(updatedEvent.event_date) }
            const updatedEvents = state.events.map(event =>
                event.id === newUpdatedEvent.id ? newUpdatedEvent : event
            )
            return { events: updatedEvents };
        })
    },
    clearEvents: () => set({ events: [] }),
}));