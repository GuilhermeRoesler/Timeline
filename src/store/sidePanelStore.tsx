import { create } from "zustand";

type SidePanelState = {
    isSidePanelOpen: boolean;
    setIsSidePanelOpen: (value: boolean) => void;
    selectedType: "period" | "event";
    setSelectedType: (type: "period" | "event") => void;
    imageSelectedType: "search" | "link" | "upload";
    setImageSelectedType: (type: "search" | "link" | "upload") => void;
    titleValue: string;
    linkValue: string;
    linkIndex: number;
    setLinkIndex: (index: number) => void;
}

export const useSidePanelStore = create<SidePanelState>(set => ({
    isSidePanelOpen: false,
    setIsSidePanelOpen: (value: boolean) => set({ isSidePanelOpen: value }),
    selectedType: "period",
    setSelectedType: (type: "period" | "event") => set({ selectedType: type }),
    imageSelectedType: "search",
    setImageSelectedType: (type: "search" | "link" | "upload") => set({ imageSelectedType: type }),
    titleValue: "",
    linkValue: "",
    linkIndex: 0,
    setLinkIndex: (index: number) => set({ linkIndex: index }),
}))