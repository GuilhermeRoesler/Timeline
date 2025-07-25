import { ulid } from "ulid";
import { usePeriodsLoaderStore, useEventsLoaderStore } from "../store/periodsEventsLoaderStore";
import { type Period } from "../types/period";
import { type Event } from "../types/event";

export const usePeriodEventHandler = () => {
    const addPeriodToStore = usePeriodsLoaderStore((state) => state.addPeriod);
    const addEventToStore = useEventsLoaderStore((state) => state.addEvent);

    const addPeriod = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPeriod = {
            id: ulid(),
            title: (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value,
            description: (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value,
            image: (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0]?.name || '',
            color: (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value,
            start: Number((e.currentTarget.elements.namedItem('start') as HTMLInputElement).value),
            end: Number((e.currentTarget.elements.namedItem('end') as HTMLInputElement).value),
        } as Period;

        addPeriodToStore(newPeriod);
    }

    const addEvent = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newEvent = {
            id: ulid(),
            title: (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value,
            description: (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value,
            image: (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0]?.name || '',
            color: (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value,
            year: Number((e.currentTarget.elements.namedItem('year') as HTMLInputElement).value),
        } as Event;

        addEventToStore(newEvent);
    }

    return { addPeriod, addEvent };
}