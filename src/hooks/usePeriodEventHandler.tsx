import { usePeriodsStore } from "../store/periodsStore";
import { useEventsStore } from "../store/eventsStore";
import { useSidePanelStore } from "../store/sidePanelStore";
import { SimpleDate } from "../lib/SimpleDate";
import { calculateLevel } from "../utils/levelUtils";
import { useGlobalConfigStore } from "../store/globalConfigStore";

export const usePeriodEventHandler = () => {
    const periods = usePeriodsStore(state => state.periods)
    const { titleValue, descriptionValue, startValue, endValue, dateValue, colorValue, linkValue } = useSidePanelStore(state => state)
    const api = useGlobalConfigStore(state => state.api)

    // Function to calculate the level based on overlapping periods
    const addPeriod = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleValue;
        const description = descriptionValue;
        const image = linkValue;
        const color = colorValue;
        const start = new SimpleDate(startValue);
        const end = new SimpleDate(endValue);
        const level = calculateLevel(start.getYear(), end.getYear(), periods);

        if (start.getYear() > end.getYear()) {
            alert("A data de início não pode ser maior que a data de término.");
            return;
        }

        if (start.getYear() === end.getYear()) {
            alert("A data de início não pode ser igual à data de término.");
            return;
        }

        const newPeriod = { title, description, image, color, start_date: start.toString(), end_date: end.toString(), level };
        const response = await api.post('/periods', newPeriod)
        usePeriodsStore.getState().addPeriod(response.data);
    }

    const addEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEventData = {
            title: titleValue,
            description: descriptionValue,
            image: linkValue,
            color: colorValue,
            event_date: new SimpleDate(dateValue).toString(), // <- Mude para "event_date" e já converta para string
        };

        const response = await api.post('/events', newEventData)
        useEventsStore.getState().addEvent(response.data);
    }

    const updatePeriod = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { editPeriod } = useSidePanelStore.getState();
        if (!editPeriod) return;

        const title = titleValue;
        const description = descriptionValue;
        const image = linkValue;
        const color = colorValue;
        const start = new SimpleDate(startValue);
        const end = new SimpleDate(endValue);

        const periodToUpdate = {
            id: editPeriod.id,
            title,
            description,
            image,
            color,
            start_date: start.toString(),
            end_date: end.toString(),
            level: editPeriod.level,
        };
        await api.put(`/periods/${editPeriod.id}`, periodToUpdate);
        usePeriodsStore.getState().updatePeriod(periodToUpdate);
    }

    const updateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { editEvent } = useSidePanelStore.getState();
        if (!editEvent) return;

        const title = titleValue;
        const description = descriptionValue;
        const image = linkValue;
        const color = colorValue;
        const date = new SimpleDate(dateValue);

        const eventToUpdate = {
            id: editEvent.id,
            title,
            description,
            image,
            color,
            event_date: date.toString(),
        };
        await api.put(`/events/${editEvent.id}`, eventToUpdate);
        useEventsStore.getState().updateEvent(eventToUpdate);
    }

    return { addPeriod, addEvent, updatePeriod, updateEvent };
}