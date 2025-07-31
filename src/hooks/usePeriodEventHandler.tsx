import { ulid } from "ulid";
import { usePeriodsLoaderStore, useEventsLoaderStore } from "../store/periodsEventsLoaderStore";
import { useSidePanelStore } from "../store/sidePanelStore";
import { type Period } from "../types/period";
import { type Event } from "../types/event";
import { SimpleDate } from "../lib/SimpleDate";
import { calculateLevel } from "../utils/levelUtils";

export const usePeriodEventHandler = () => {
    const periods = usePeriodsLoaderStore(state => state.periods)
    const imageSelectedType = useSidePanelStore(state => state.imageSelectedType)
    const { titleValue, descriptionValue, startValue, endValue, colorValue, linkValue } = useSidePanelStore(state => state)

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
            title: (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value,
            description: (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value,
            image: imageSelectedType === "upload"
                ? (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0]?.name || ''
                : useSidePanelStore.getState().linkValue,
            color: (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value,
            date: new SimpleDate((e.currentTarget.elements.namedItem('date') as HTMLInputElement).value),
        } as Event;

        useEventsLoaderStore.getState().addEvent(newEvent);
    }

    const updatePeriod = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value;
        const description = (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value;
        const image = imageSelectedType === "upload"
            ? (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0]?.name || ''
            : useSidePanelStore.getState().linkValue;
        const color = (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value;
        const start = new SimpleDate((e.currentTarget.elements.namedItem('start') as HTMLInputElement).value);
        const end = new SimpleDate((e.currentTarget.elements.namedItem('end') as HTMLInputElement).value);

        const updatedPeriod = { ...useSidePanelStore.getState().editPeriod, title, description, image, color, start, end } as Period;
        usePeriodsLoaderStore.getState().updatePeriod(updatedPeriod);
    }

    const updateEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const title = (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value;
        const description = (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value;
        const image = imageSelectedType === "upload"
            ? (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0]?.name || ''
            : useSidePanelStore.getState().linkValue;
        const color = (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value;
        const date = new SimpleDate((e.currentTarget.elements.namedItem('date') as HTMLInputElement).value);

        const updatedEvent = { ...useSidePanelStore.getState().editEvent, title, description, image, color, date } as Event;
        useEventsLoaderStore.getState().updateEvent(updatedEvent);
    }

    return { addPeriod, addEvent, updatePeriod, updateEvent };
}