import { ulid } from "ulid";
import { usePeriodsLoaderStore, useEventsLoaderStore } from "../store/periodsEventsLoaderStore";
import { useSidePanelStore } from "../store/sidePanelStore";
import { type Period } from "../types/period";
import { type Event } from "../types/event";
import { SimpleDate } from "../lib/SimpleDate";

export const usePeriodEventHandler = () => {
    const periods = usePeriodsLoaderStore(state => state.periods)
    const imageSelectedType = useSidePanelStore(state => state.imageSelectedType)

    // Function to calculate the level based on overlapping periods
    const calculateLevel = (start: number, end: number) => {
        let level = 1;

        while (true) {
            const filteredPeriods = periods.filter(period => period.level === level);
            if (filteredPeriods.length === 0) {
                return level; // No periods at this level, return it
            }
            const conflict = filteredPeriods.some(period => {
                if (period.start.getYear() < end && period.end.getYear() > start) {
                    return true; // Overlapping period found
                };
            });

            if (!conflict) {
                return level; // No conflict, return the current level
            } else {
                if (level > 0) {
                    level = -level; // Switch to negative levels if conflicts exist
                } else if (level < 0) {
                    level = -level + 1; // Increment negative level}
                }
            }
        }
    }

    const addPeriod = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const id = ulid();
        const title = (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value;
        const description = (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value;
        const image = imageSelectedType === "upload"
            ? (e.currentTarget.elements.namedItem('image') as HTMLInputElement).files?.[0]?.name || ''
            : (e.currentTarget.elements.namedItem('imageLink') as HTMLInputElement).value;
        const color = (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value;
        const start = new SimpleDate((e.currentTarget.elements.namedItem('start') as HTMLInputElement).value);
        const end = new SimpleDate((e.currentTarget.elements.namedItem('end') as HTMLInputElement).value);
        const level = calculateLevel(start.getYear(), end.getYear());

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
                : (e.currentTarget.elements.namedItem('imageLink') as HTMLInputElement).value,
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
            : (e.currentTarget.elements.namedItem('imageLink') as HTMLInputElement).value;
        const color = (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value;
        const start = new SimpleDate((e.currentTarget.elements.namedItem('start') as HTMLInputElement).value);
        const end = new SimpleDate((e.currentTarget.elements.namedItem('end') as HTMLInputElement).value);

        const updatedPeriod = { ...useSidePanelStore.getState().editPeriod, title, description, image, color, start, end } as Period;
        usePeriodsLoaderStore.getState().updatePeriod(updatedPeriod);
    }

    return { addPeriod, addEvent, updatePeriod };
}