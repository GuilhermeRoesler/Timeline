import { create } from "zustand";

type StageControlsState = {
    stageScale: number;
    stagePos: { x: number, y: number };
    cursor: 'grab' | 'grabbing' | 'default';
    visibleYears: number[];
    setStageScale: (scale: number) => void;
    setStagePos: (pos: { x: number, y: number }) => void;
    setCursor: (cursor: 'grab' | 'grabbing' | 'default') => void;
    setVisibleYears: (years: number[]) => void;
};

export const useStageControlsStore = create<StageControlsState>((set) => ({
    stageScale: .75,
    stagePos: { x: 0, y: 0 },
    cursor: 'grab',
    visibleYears: [],
    setStageScale: (scale: number) => set({ stageScale: scale }),
    setStagePos: (pos: { x: number, y: number }) => set({ stagePos: pos }),
    setCursor: (cursor: 'grab' | 'grabbing' | 'default') => set({ cursor }),
    setVisibleYears: (years: number[]) => set({ visibleYears: years }),
}));
