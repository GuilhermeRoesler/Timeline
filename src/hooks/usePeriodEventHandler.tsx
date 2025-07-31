import { ulid } from "ulid";
import { usePeriodsLoaderStore, useEventsLoaderStore } from "../store/periodsEventsLoaderStore";
import { useSidePanelStore } from "../store/sidePanelStore";
import { type Period } from "../types/period";
import { type Event } from "../types/event";
import { SimpleDate } from "../lib/SimpleDate";
import { calculateLevel } from "../utils/levelUtils";

export const usePeriodEventHandler = () => {
    const periods = usePeriodsLoaderStore(state => state.periods)
    const { titleValue, descriptionValue, startValue, endValue, dateValue, colorValue, linkValue } = useSidePanelStore(state => state)

    // Function to calculate the level based on overlapping periods
    const addPeriod = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const id = ulid();
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

        const newPeriod = { id, title, description, image, color, start, end, level } as Period;
        usePeriodsLoaderStore.getState().addPeriod(newPeriod);
    }

    const addEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEvent = {
            id: ulid(),
            title: titleValue,
            description: descriptionValue,
            image: linkValue,
            color: colorValue,
            date: new SimpleDate(dateValue),
        } as Event;

        useEventsLoaderStore.getState().addEvent(newEvent);
    }

    const updatePeriod = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleValue;
        const description = descriptionValue;
        const image = linkValue;
        const color = colorValue;
        const start = new SimpleDate(startValue);
        const end = new SimpleDate(endValue);

        const updatedPeriod = { ...useSidePanelStore.getState().editPeriod, title, description, image, color, start, end } as Period;
        usePeriodsLoaderStore.getState().updatePeriod(updatedPeriod);
    }

    const updateEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = titleValue;
        const description = descriptionValue;
        const image = linkValue;
        const color = colorValue;
        const date = new SimpleDate(dateValue);

        const updatedEvent = { ...useSidePanelStore.getState().editEvent, title, description, image, color, date } as Event;
        useEventsLoaderStore.getState().updateEvent(updatedEvent);
    }

    return { addPeriod, addEvent, updatePeriod, updateEvent };
}