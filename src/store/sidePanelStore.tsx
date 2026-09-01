import { create } from "zustand";

type SidePanelState = {
    isSidePanelOpen: boolean;
    setIsSidePanelOpen: (value: boolean) => void;
    selectedType: "period" | "event";
    setSelectedType: (type: "period" | "event") => void;
}

export const useSidePanelStore = create<SidePanelState>(set => ({
    isSidePanelOpen: false,
    setIsSidePanelOpen: (value: boolean) => set({ isSidePanelOpen: value }),
    selectedType: "period",
    setSelectedType: (type: "period" | "event") => set({ selectedType: type }),
}))