import { create } from "zustand";
import { SimpleDate } from "../lib/SimpleDate";
import { type Period } from "../types/period";

type PeriodsLoaderState = {
    periods: Period[];
    setPeriods: (periods: Period[]) => void;
    addPeriod: (period: any) => void;
    removePeriod: (periodId: string) => void;
    updatePeriod: (updatedPeriod: any) => void;
    clearPeriods: () => void;
}

export const usePeriodsStore = create<PeriodsLoaderState>((set) => ({
    periods: [],
    setPeriods: (periods) => {
        set({ periods })
    },
    addPeriod: (period) => {
        set((state) => {
            const updatedPeriod = { ...period, start: new SimpleDate(period.start_date), end: new SimpleDate(period.end_date) }
            const updatedPeriods = [...state.periods, updatedPeriod]
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
            const newUpdatedPeriod = { ...updatedPeriod, start: new SimpleDate(updatedPeriod.start_date), end: new SimpleDate(updatedPeriod.end_date) }
            const updatedPeriods = state.periods.map(period =>
                period.id === newUpdatedPeriod.id ? newUpdatedPeriod : period
            )
            return { periods: updatedPeriods };
        });
    },
    clearPeriods: () => set({ periods: [] }),
}));