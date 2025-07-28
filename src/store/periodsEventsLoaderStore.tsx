import { create } from "zustand";
import { SimpleDate } from "../lib/SimpleDate";
import { type Period } from "../types/period";
import { type Event } from "../types/event";

type PeriodsLoaderState = {
    periods: Period[];
    setPeriods: (periods: Period[]) => void;
    addPeriod: (period: Period) => void;
    removePeriod: (periodId: string) => void;
    updatePeriod: (updatedPeriod: Period) => void;
    loadPeriodsFromLocalStorage: () => void;
    savePeriodsToLocalStorage: (updatedPeriods: Period[]) => void;
    clearPeriods: () => void;
}

export const usePeriodsLoaderStore = create<PeriodsLoaderState>((set, get) => ({
    periods: [],
    setPeriods: (periods) => set({ periods }),
    addPeriod: (period) => {
        set((state) => {
            const updatedPeriods = [...state.periods, period]
            get().savePeriodsToLocalStorage(updatedPeriods)
            return { periods: updatedPeriods };
        });
    },
    removePeriod: (periodId) => {
        set((state) => {
            const updatedPeriods = state.periods.filter(period => period.id !== periodId);
            get().savePeriodsToLocalStorage(updatedPeriods)
            return { periods: updatedPeriods };
        });
    },
    updatePeriod: (updatedPeriod) => {
        set((state) => {
            const updatedPeriods = state.periods.map(period =>
                period.id === updatedPeriod.id ? updatedPeriod : period
            )
            get().savePeriodsToLocalStorage(updatedPeriods)
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
    addEvent: (event: Event) => void;
    removeEvent: (eventId: string) => void;
    updateEvent: (updatedEvent: Event) => void;
    loadEventsFromLocalStorage: () => void;
    saveEventsToLocalStorage: (updatedEvents: Event[]) => void;
    clearEvents: () => void;
}

export const useEventsLoaderStore = create<EventsLoaderState>((set, get) => ({
    events: [],
    setEvents: (events) => set({ events }),
    addEvent: (event) => {
        set((state) => {
            const updatedEvents = [...state.events, event]
            get().saveEventsToLocalStorage(updatedEvents)
            return { events: updatedEvents };
        });
    },
    removeEvent: (eventId) => {
        set((state) => {
            const updatedEvents = state.events.filter(event => event.id !== eventId);
            get().saveEventsToLocalStorage(updatedEvents)
            return { events: updatedEvents };
        })
    },
    updateEvent: (updatedEvent) => {
        set((state) => {
            const updatedEvents = state.events.map(event =>
                event.id === updatedEvent.id ? updatedEvent : event
            )
            get().saveEventsToLocalStorage(updatedEvents)
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