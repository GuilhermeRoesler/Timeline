import { create } from "zustand";
import { SimpleDate } from "../lib/SimpleDate";
import { type Period } from "../types/period";
import { type Event } from "../types/event";

type PeriodsLoaderState = {
    periods: Period[];
    setPeriods: (periods: Period[]) => void;
    addPeriod: (period: any) => void;
    removePeriod: (periodId: string) => void;
    updatePeriod: (updatedPeriod: any) => void;
    loadPeriodsFromLocalStorage: () => void;
    savePeriodsToLocalStorage: (updatedPeriods: Period[]) => void;
    clearPeriods: () => void;
}

export const usePeriodsLoaderStore = create<PeriodsLoaderState>((set) => ({
    periods: [],
    setPeriods: (periods) => {
        set({ periods })
    },
    addPeriod: (period) => {
        set((state) => {
            const updatedPeriod = { ...period, start: new SimpleDate(period.start_date), end: new SimpleDate(period.end_date) }
            const updatedPeriods = [...state.periods, updatedPeriod]
            return { periods: updatedPeriods };
        });
    },
    removePeriod: (periodId) => {
        set((state) => {
            const updatedPeriods = state.periods.filter(period => period.id !== periodId);
            console.log(updatedPeriods)
            // get().savePeriodsToLocalStorage(updatedPeriods)
            return { periods: updatedPeriods };
        });
    },
    updatePeriod: (updatedPeriod) => {
        set((state) => {
            const newUpdatedPeriod = { ...updatedPeriod, start: new SimpleDate(updatedPeriod.start_date), end: new SimpleDate(updatedPeriod.end_date) }
            const updatedPeriods = state.periods.map(period =>
                period.id === newUpdatedPeriod.id ? newUpdatedPeriod : period
            )
            return { periods: updatedPeriods };
        });
    },
    loadPeriodsFromLocalStorage: () => {
        const periodsFromLocalStorage = localStorage.getItem('periods');
        if (periodsFromLocalStorage) {
            const periodsRaw = JSON.parse(periodsFromLocalStorage);
            const periods = periodsRaw.map((period: any) => ({ ...period, start: new SimpleDate(period.start), end: new SimpleDate(period.end) }))
            set({ periods });
        }
    },
    savePeriodsToLocalStorage: (updatedPeriods: Period[]) => {
        const updatedPeriodsToLocalStorage = updatedPeriods.map((period: any) => ({ ...period, start: period.start.toString(), end: period.end.toString() }))
        localStorage.setItem('periods', JSON.stringify(updatedPeriodsToLocalStorage));
    },
    clearPeriods: () => set({ periods: [] }),
}))

type EventsLoaderState = {
    events: Event[];
    setEvents: (events: Event[]) => void;
    addEvent: (event: any) => void;
    removeEvent: (eventId: string) => void;
    updateEvent: (updatedEvent: any) => void;
    loadEventsFromLocalStorage: () => void;
    saveEventsToLocalStorage: (updatedEvents: Event[]) => void;
    clearEvents: () => void;
}

export const useEventsLoaderStore = create<EventsLoaderState>((set) => ({
    events: [],
    setEvents: (events) => {
        // get().saveEventsToLocalStorage(events);
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
            // get().saveEventsToLocalStorage(updatedEvents)
            return { events: updatedEvents };
        })
    },
    updateEvent: (updatedEvent) => {
        set((state) => {
            const newUpdatedEvent = { ...updatedEvent, date: new SimpleDate(updatedEvent.event_date) }
            const updatedEvents = state.events.map(event =>
                event.id === newUpdatedEvent.id ? newUpdatedEvent : event
            )
            // get().saveEventsToLocalStorage(updatedEvents)
            return { events: updatedEvents };
        })
    },
    loadEventsFromLocalStorage: () => {
        const eventsFromLocalStorage = localStorage.getItem('events');
        if (eventsFromLocalStorage) {
            const eventsRaw = JSON.parse(eventsFromLocalStorage);
            const events = eventsRaw.map((event: any) => ({ ...event, date: new SimpleDate(event.date) }))
            set({ events });
        }
    },
    saveEventsToLocalStorage: (updatedEvents: Event[]) => {
        const updatedEventsToLocalStorage = updatedEvents.map((event: any) => ({ ...event, date: event.date.toString() }))
        localStorage.setItem('events', JSON.stringify(updatedEventsToLocalStorage));
    },
    clearEvents: () => set({ events: [] }),
}))