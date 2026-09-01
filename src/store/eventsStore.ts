import { create } from "zustand";
import { SimpleDate } from "../lib/SimpleDate";
import { type Event } from "../types/event";

type EventFromApi = Omit<Event, 'date'> & {
    event_date: string;
};

type EventsLoaderState = {
    events: Event[];
    setEvents: (events: Event[]) => void;
    addEvent: (event: EventFromApi) => void;
    removeEvent: (eventId: string) => void;
    updateEvent: (updatedEvent: EventFromApi) => void;
    clearEvents: () => void;
}

export const useEventsStore = create<EventsLoaderState>((set) => ({
    events: [],
    setEvents: (events) => {
        set({ events })
    },
    addEvent: (event) => {
        set((state) => {
            const newEvent: Event = { ...event, date: new SimpleDate(event.event_date) };
            const updatedEvents = [...state.events, newEvent];
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
            const newUpdatedEvent: Event = { ...updatedEvent, date: new SimpleDate(updatedEvent.event_date) };
            const updatedEvents = state.events.map(event =>
                event.id === newUpdatedEvent.id ? newUpdatedEvent : event
            );
            return { events: updatedEvents };
        })
    },
    clearEvents: () => set({ events: [] }),
}));