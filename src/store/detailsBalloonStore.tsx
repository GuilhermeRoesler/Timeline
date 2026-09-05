import { create } from 'zustand';
import { type Event } from '../types/event';
import { type Period } from '../types/period';

type DetailsBalloonState = {
    event: Event | null;
    period: Period | null;
    pinned: boolean;
    setEvent: (event: Event | null) => void;
    setPeriod: (period: Period | null) => void;
    pinPeriod: (period: Period) => void;
    clearDetails: () => void;
};

export const useDetailsBalloonStore = create<DetailsBalloonState>((set) => ({
    event: null,
    period: null,
    pinned: false,
    setEvent: (event) => set({ event, period: null, pinned: false }),
    setPeriod: (period) => set({ period, event: null, pinned: false }),
    pinPeriod: (period) => set({ period, event: null, pinned: true }),
    clearDetails: () => set({ event: null, period: null, pinned: false }),
}));
