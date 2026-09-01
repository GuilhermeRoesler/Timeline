import { create } from "zustand";
import { SimpleDate } from "../lib/SimpleDate";
import { type Period } from "../types/period";

// This is the shape of the data coming from the API
type PeriodFromApi = Omit<Period, 'start' | 'end'> & {
    start_date: string;
    end_date: string;
};

type PeriodsLoaderState = {
    periods: Period[];
    setPeriods: (periods: Period[]) => void;
    addPeriod: (period: PeriodFromApi) => void;
    removePeriod: (periodId: string) => void;
    updatePeriod: (updatedPeriod: PeriodFromApi) => void;
    clearPeriods: () => void;
}

export const usePeriodsStore = create<PeriodsLoaderState>((set) => ({
    periods: [],
    setPeriods: (periods) => {
        set({ periods })
    },
    addPeriod: (period) => {
        set((state) => {
            const newPeriod: Period = { ...period, start: new SimpleDate(period.start_date), end: new SimpleDate(period.end_date) };
            const updatedPeriods = [...state.periods, newPeriod];
            return { periods: updatedPeriods };
        });
    },
    removePeriod: (periodId) => {
        set((state) => {
            const updatedPeriods = state.periods.filter(period => period.id !== periodId);
            return { periods: updatedPeriods };
        });
    },
    updatePeriod: (updatedPeriod) => {
        set((state) => {
            const newUpdatedPeriod: Period = { ...updatedPeriod, start: new SimpleDate(updatedPeriod.start_date), end: new SimpleDate(updatedPeriod.end_date) };
            const updatedPeriods = state.periods.map(period =>
                period.id === newUpdatedPeriod.id ? newUpdatedPeriod : period
            );
            return { periods: updatedPeriods };
        });
    },
    clearPeriods: () => set({ periods: [] }),
}));