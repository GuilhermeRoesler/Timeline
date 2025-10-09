import { create } from "zustand";
import { type Event } from "../types/event";
import { type Period } from "../types/period";

type DetailsBalloonState = {
    event: Event | null;
    setEvent: (event: Event | null) => void;
    period: Period | null;
    setPeriod: (period: Period | null) => void;
}

export const useDetailsBalloonStore = create<DetailsBalloonState>((set) => ({
    event: null,
    setEvent: (event) => set({ event }),
    period: null,
    setPeriod: (period) => set({ period }),
}));