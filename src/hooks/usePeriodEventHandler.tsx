import { usePeriodsStore } from "../store/periodsStore";
import { useEventsStore } from "../store/eventsStore";
import { useSidePanelStore } from "../store/sidePanelStore";
import { SimpleDate } from "../lib/SimpleDate";
import { calculateLevel } from "../utils/levelUtils";
import { createPeriod, updatePeriod as updatePeriodService } from "../services/periodService";
import { createEvent, updateEvent as updateEventService } from "../services/eventService";

export const usePeriodEventHandler = () => {
    const periods = usePeriodsStore(state => state.periods)
    const { titleValue, descriptionValue, startValue, endValue, dateValue, colorValue, linkValue } = useSidePanelStore(state => state)

    const addPeriod = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const start = new SimpleDate(startValue);
        const end = new SimpleDate(endValue);

        if (start.getYear() > end.getYear()) {
            alert("A data de início não pode ser maior que a data de término.");
            return;
        }
        if (start.getYear() === end.getYear()) {
            alert("A data de início não pode ser igual à data de término.");
            return;
        }

        const newPeriod = {
            title: titleValue,
            description: descriptionValue,
            image: linkValue,
            color: colorValue,
            start_date: start.toString(),
            end_date: end.toString(),
            level: calculateLevel(start.getYear(), end.getYear(), periods),
        };
        const responseData = await createPeriod(newPeriod);
        usePeriodsStore.getState().addPeriod(responseData);
    }

    const addEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEventData = {
            title: titleValue,
            description: descriptionValue,
            image: linkValue,
            color: colorValue,
            event_date: new SimpleDate(dateValue).toString(),
        };

        const responseData = await createEvent(newEventData);
        useEventsStore.getState().addEvent(responseData);
    }

    const updatePeriod = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { editPeriod } = useSidePanelStore.getState();
        if (!editPeriod) return;

        const periodToUpdateForApi = {
            ...editPeriod,
            title: titleValue,
            description: descriptionValue,
            image: linkValue,
            color: colorValue,
            start_date: new SimpleDate(startValue).toString(),
            end_date: new SimpleDate(endValue).toString(),
        };
        delete (periodToUpdateForApi as any).start;
        delete (periodToUpdateForApi as any).end;

        const responseData = await updatePeriodService(periodToUpdateForApi);
        usePeriodsStore.getState().updatePeriod(responseData);
    }

    const updateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { editEvent } = useSidePanelStore.getState();
        if (!editEvent) return;

        const eventToUpdateForApi = {
            ...editEvent,
            title: titleValue,
            description: descriptionValue,
            image: linkValue,
            color: colorValue,
            event_date: new SimpleDate(dateValue).toString(),
        };
        delete (eventToUpdateForApi as any).date;

        const responseData = await updateEventService(eventToUpdateForApi);
        useEventsStore.getState().updateEvent(responseData);
    }

    return { addPeriod, addEvent, updatePeriod, updateEvent };
}