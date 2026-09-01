import { create } from "zustand";
import { type Period } from "../types/period";
import { type Event } from "../types/event";

type SidePanelState = {
    isSidePanelOpen: boolean;
    selectedType: "period" | "event";
    imageSelectedType: "search" | "link" | "upload";
    titleValue: string;
    descriptionValue: string;
    startValue: string;
    endValue: string;
    dateValue: string;
    colorValue: string;
    linkValue: string;
    resetFields: () => void;
    links: string[];
    linkIndex: number;
    editPeriod: Period | null;
    editEvent: Event | null;
}

export const useSidePanelStore = create<SidePanelState>(set => ({
    isSidePanelOpen: false,
    selectedType: "period",
    imageSelectedType: "search",
    titleValue: "",
    descriptionValue: "",
    startValue: "2010-01-01",
    endValue: "2010-01-01",
    dateValue: "2010-01-01",
    colorValue: "#000000",
    linkValue: "",
    resetFields: () => set({ isSidePanelOpen: false, imageSelectedType: "search", titleValue: "", descriptionValue: "", startValue: "2010-01-01", endValue: "2010-01-01", dateValue: "2010-01-01", colorValue: "#000000", linkValue: "", editPeriod: null, editEvent: null }),
    links: [""],
    linkIndex: 0,
    editPeriod: null,
    editEvent: null,
}))