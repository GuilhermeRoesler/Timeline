import { usePeriodsLoaderStore, useEventsLoaderStore } from "../store/periodsEventsLoaderStore";
import { useSidePanelStore } from "../store/sidePanelStore";
import { SimpleDate } from "../lib/SimpleDate";
import { calculateLevel } from "../utils/levelUtils";
import { useGlobalConfigStore } from "../store/globalConfigStore";

export const usePeriodEventHandler = () => {
    const periods = usePeriodsLoaderStore(state => state.periods)
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

        const newPeriod = { title, description, image, color, start: start.toString(), end: end.toString(), level };
        const response = await api.post('/manage_periods.php', newPeriod)
        usePeriodsLoaderStore.getState().addPeriod(response.data);
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

        const response = await api.post('/manage_events.php', newEventData)
        useEventsLoaderStore.getState().addEvent(response.data);
    }

    const updatePeriod = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleValue;
        const description = descriptionValue;
        const image = linkValue;
        const color = colorValue;
        const start = new SimpleDate(startValue);
        const end = new SimpleDate(endValue);

        const periodToUpdate = { ...useSidePanelStore.getState().editPeriod, title, description, image, color, start: start.toString(), end: end.toString() };
        const response = await api.post('/manage_periods.php', {
            ...periodToUpdate,
            _method: 'PUT'
        });
        usePeriodsLoaderStore.getState().updatePeriod(response.data);
    }

    const updateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleValue;
        const description = descriptionValue;
        const image = linkValue;
        const color = colorValue;
        const date = new SimpleDate(dateValue);

        const eventToUpdate = { ...useSidePanelStore.getState().editEvent, title, description, image, color, date: date.toString() };
        const response = await api.post('/manage_events.php', {
            ...eventToUpdate,
            _method: 'PUT'
        });
        useEventsLoaderStore.getState().updateEvent(response.data);
    }

    return { addPeriod, addEvent, updatePeriod, updateEvent };
}