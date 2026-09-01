import { useGlobalConfigStore } from "../store/globalConfigStore";
import { usePeriodsStore } from "../store/periodsStore";
import { useEventsStore } from "../store/eventsStore";
import { useSidePanelStore } from "../store/sidepanel/sidePanelStore";
import { SimpleDate } from "../lib/SimpleDate";
import type { Period } from "../types/userData";
import type { Event } from "../types/userData";

const getPeriodFromForm = (e: React.FormEvent<HTMLFormElement>, id: string): Period => {
    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    const start_date = (form.elements.namedItem('start') as HTMLInputElement).value;
    const end_date = (form.elements.namedItem('end') as HTMLInputElement).value;
    const color = (form.elements.namedItem('color') as HTMLInputElement).value;
    const image = useSidePanelStore.getState().linkValue;

    return {
        id,
        title,
        description,
        start: new SimpleDate(start_date),
        end: new SimpleDate(end_date),
        level: 0,
        color,
        image,
    };
};

const getEventFromForm = (e: React.FormEvent<HTMLFormElement>, id: string): Event => {
    const form = e.currentTarget;
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    const event_date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const color = (form.elements.namedItem('color') as HTMLInputElement).value;
    const image = useSidePanelStore.getState().linkValue;

    return {
        id,
        title,
        description,
        date: new SimpleDate(event_date),
        color,
        image,
    };
};

export const usePeriodEventHandler = () => {
    const api = useGlobalConfigStore(state => state.api);
    const { periods, setPeriods, addPeriod: addPeriodToStore } = usePeriodsStore(state => ({ periods: state.periods, setPeriods: state.setPeriods, addPeriod: state.addPeriod }));
    const { events, setEvents, addEvent: addEventToStore } = useEventsStore(state => ({ events: state.events, setEvents: state.setEvents, addEvent: state.addEvent }));

    const addPeriod = async (e: React.FormEvent<HTMLFormElement>) => {
        const newPeriod = getPeriodFromForm(e, crypto.randomUUID());
        addPeriodToStore(newPeriod);
        try {
            await api.post('/periods', newPeriod);
        } catch (error) {
            console.error("Failed to add period:", error);
        }
    };

    const addEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        const newEvent = getEventFromForm(e, crypto.randomUUID());
        addEventToStore(newEvent);
        try {
            await api.post('/events', newEvent);
        } catch (error) {
            console.error("Failed to add event:", error);
        }
    };

    const updatePeriod = async (e: React.FormEvent<HTMLFormElement>) => {
        const { editPeriod } = useSidePanelStore.getState();
        if (!editPeriod) return;

        const updatedPeriod = getPeriodFromForm(e, editPeriod.id);

        const periodPayload = {
            ...updatedPeriod,
            start_date: updatedPeriod.start.toString(),
            end_date: updatedPeriod.end.toString(),
        };
        delete (periodPayload as Partial<typeof periodPayload>).start;
        delete (periodPayload as Partial<typeof periodPayload>).end;

        try {
            const response = await api.put(`/periods/${updatedPeriod.id}`, periodPayload);
            const returnedPeriod = response.data;

            const newPeriod: Period = {
                ...returnedPeriod,
                start: new SimpleDate(returnedPeriod.start_date),
                end: new SimpleDate(returnedPeriod.end_date),
            };

            setPeriods(periods.map(p => p.id === newPeriod.id ? newPeriod : p));
            useSidePanelStore.getState().resetFields();
        } catch (error) {
            console.error("Failed to update period:", error);
            throw error;
        }
    };

    const updateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        const { editEvent } = useSidePanelStore.getState();
        if (!editEvent) return;

        const updatedEvent = getEventFromForm(e, editEvent.id);

        const eventPayload = {
            ...updatedEvent,
            event_date: updatedEvent.date.toString(),
        };
        delete (eventPayload as Partial<typeof eventPayload>).date;

        try {
            const response = await api.put(`/events/${updatedEvent.id}`, eventPayload);
            const returnedEvent = response.data;

            const newEvent: Event = {
                ...returnedEvent,
                date: new SimpleDate(returnedEvent.event_date),
            };

            setEvents(events.map(ev => ev.id === newEvent.id ? newEvent : ev));
            useSidePanelStore.getState().resetFields();
        } catch (error) {
            console.error("Failed to update event:", error);
            throw error;
        }
    };

    const deletePeriod = async (id: string) => {
        setPeriods(periods.filter(p => p.id !== id));
        try {
            await api.delete(`/periods/${id}`);
        } catch (error) {
            console.error("Failed to delete period:", error);
        }
    };

    const deleteEvent = async (id: string) => {
        setEvents(events.filter(e => e.id !== id));
        try {
            await api.delete(`/events/${id}`);
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    return { addPeriod, addEvent, updatePeriod, updateEvent, deletePeriod, deleteEvent };
};