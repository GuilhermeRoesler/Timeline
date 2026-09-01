import { create } from "zustand";
import { updateSettings, resetSettings as resetSettingsService } from "../services/settingsService";

export const settings = [
    "General",
    "Events",
    "Periods",
    "Color",
]

export const TIMELINE_Y = window.innerHeight; // Meio da tela verticalmente

type SettingsState = {
    settings: string[],
    settingsIndex: number,
    YEAR_SPACING: number,
    BASE_YEAR: number,
    PERIOD_HEIGHT: number,
    LEVEL_SPACING: number,
    EVENT_RADIUS: number,
    COLORIZE_ON_CREATE: boolean,
    THEME_INDEX: number,
    NEGATIVE_LEVEL: boolean,
    setSettings: (settings: any) => void,
    saveSettings: () => void,
    resetSettings: () => void,
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
    settings,
    settingsIndex: 0,
    YEAR_SPACING: 100,
    BASE_YEAR: 2010,
    PERIOD_HEIGHT: 80,
    LEVEL_SPACING: 30,
    EVENT_RADIUS: 10,
    COLORIZE_ON_CREATE: false,
    THEME_INDEX: 0,
    NEGATIVE_LEVEL: true,
    setSettings: (newSettings: any) => {
        if (!newSettings) {
            return;
        }
        set({
            YEAR_SPACING: newSettings.year_spacing,
            BASE_YEAR: newSettings.base_year,
            PERIOD_HEIGHT: newSettings.period_height,
            LEVEL_SPACING: newSettings.level_spacing,
            EVENT_RADIUS: newSettings.event_radius,
            COLORIZE_ON_CREATE: newSettings.colorize_on_create,
            THEME_INDEX: newSettings.theme_index,
            NEGATIVE_LEVEL: newSettings.negative_level,
        })
    },
    saveSettings: async () => {
        const settingsToSave = {
            year_spacing: get().YEAR_SPACING,
            base_year: get().BASE_YEAR,
            period_height: get().PERIOD_HEIGHT,
            level_spacing: get().LEVEL_SPACING,
            event_radius: get().EVENT_RADIUS,
            colorize_on_create: get().COLORIZE_ON_CREATE,
            theme_index: get().THEME_INDEX,
            negative_level: get().NEGATIVE_LEVEL,
        };
        try {
            await updateSettings(settingsToSave);
        } catch (error) {
            console.error("Error saving settings:", error);
        }
    },
    resetSettings: () => {
        const defaultSettings = {
            YEAR_SPACING: 100,
            BASE_YEAR: 2010,
            PERIOD_HEIGHT: 80,
            LEVEL_SPACING: 30,
            EVENT_RADIUS: 10,
            COLORIZE_ON_CREATE: false,
            THEME_INDEX: 0,
            NEGATIVE_LEVEL: true,
        };
        set(defaultSettings);

        const defaultSettingsForApi = {
            year_spacing: 100,
            base_year: 2010,
            period_height: 80,
            level_spacing: 30,
            event_radius: 10,
            colorize_on_create: false,
            theme_index: 0,
            negative_level: true,
        };
        resetSettingsService(defaultSettingsForApi).catch(err => console.error("Failed to reset settings on server", err));
    },
}))