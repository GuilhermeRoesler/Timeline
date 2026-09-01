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
            id: null,
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
            id: null,
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

        const periodData = {
            id: editPeriod.id,
            title: titleValue,
            description: descriptionValue,
            image: linkValue,
            color: colorValue,
            start_date: new SimpleDate(startValue).toString(),
            end_date: new SimpleDate(endValue).toString(),
            level: editPeriod.level,
        };

        await updatePeriodService(periodData);
        usePeriodsStore.getState().updatePeriod(periodData);
    }

    const updateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { editEvent } = useSidePanelStore.getState();
        if (!editEvent) return;

        const eventData = {
            id: editEvent.id,
            title: titleValue,
            description: descriptionValue,
            image: linkValue,
            color: colorValue,
            event_date: new SimpleDate(dateValue).toString(),
        };

        await updateEventService(eventData);
        useEventsStore.getState().updateEvent(eventData);
    }

    return { addPeriod, addEvent, updatePeriod, updateEvent };
}