import { create } from "zustand";

type SidePanelState = {
    isSidePanelOpen: boolean;
    setIsSidePanelOpen: (value: boolean) => void;
    selectedType: "period" | "event";
    setSelectedType: (type: "period" | "event") => void;
    imageSelectedType: "search" | "upload";
    setImageSelectedType: (type: "search" | "upload") => void;
}

export const useSidePanelStore = create<SidePanelState>(set => ({
    isSidePanelOpen: false,
    setIsSidePanelOpen: (value: boolean) => set({ isSidePanelOpen: value }),
    selectedType: "period",
    setSelectedType: (type: "period" | "event") => set({ selectedType: type }),
    imageSelectedType: "search",
    setImageSelectedType: (type: "search" | "upload") => set({ imageSelectedType: type }),
}))