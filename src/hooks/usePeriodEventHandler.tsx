import { ulid } from "ulid";
import { usePeriodsLoaderStore, useEventsLoaderStore } from "../store/periodsEventsLoaderStore";
import { type Period } from "../types/period";
import { type Event } from "../types/event";

export const usePeriodEventHandler = () => {
    const periods = usePeriodsLoaderStore(state => state.periods)
    const addPeriodToStore = usePeriodsLoaderStore((state) => state.addPeriod);
    const addEventToStore = useEventsLoaderStore((state) => state.addEvent);

    // Function to calculate the level based on overlapping periods
    const calculateLevel = (start: number, end: number) => {
        let level = 0;

        while (true) {
            const filteredPeriods = periods.filter(period => period.level === level);
            if (filteredPeriods.length === 0) {
                return level; // No periods at this level, return it
            }
            const conflict = filteredPeriods.some(period => {
                if (period.start < end && period.end > start) {
                    return true; // Overlapping period found
                };
            });

            if (!conflict) {
                return level; // No conflict, return the current level
            } else {
                level++;
            }
        }
    }

    const addPeriod = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.currentTarget.reset(); // Clear the form after submission

        const id = ulid();
        const title = (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value;
        const description = (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value;
        const image = (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0]?.name || '';
        const color = (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value;
        const start = Number((e.currentTarget.elements.namedItem('start') as HTMLInputElement).value);
        const end = Number((e.currentTarget.elements.namedItem('end') as HTMLInputElement).value);
        const level = calculateLevel(start, end);
        console.log('level', level)

        const newPeriod = { id, title, description, image, color, start, end, level } as Period;

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

    return { addPeriod, addEvent, calculateLevel };
}