import { create } from "zustand";
import { useGlobalConfigStore } from "./globalConfigStore";

export const settings = [
    "General",
    "Events",
    "Periods",
    "Color",
]

export const TIMELINE_Y = window.innerHeight; // Meio da tela verticalmente

const api = useGlobalConfigStore.getState().api

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
    loadSettingsFromLocalStorage: () => void,
    saveSettingsToLocalStorage: () => void,
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
            console.log('erro1')
            return; // Proteção contra valores nulos/indefinidos
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
    saveSettings: () => {
        set(() => {
            const settings = {
                settingsIndex: get().settingsIndex,
                YEAR_SPACING: get().YEAR_SPACING,
                BASE_YEAR: get().BASE_YEAR,
                PERIOD_HEIGHT: get().PERIOD_HEIGHT,
                LEVEL_SPACING: get().LEVEL_SPACING,
                EVENT_RADIUS: get().EVENT_RADIUS,
                COLORIZE_ON_CREATE: get().COLORIZE_ON_CREATE,
                THEME_INDEX: get().THEME_INDEX,
                NEGATIVE_LEVEL: get().NEGATIVE_LEVEL,
            };
            api.post('/update_settings.php', settings)
            return { ...settings }
        })
    },
    loadSettingsFromLocalStorage: () => {
        try {
            const savedSettings = localStorage.getItem("settings");
            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings);
                set({
                    settingsIndex: parsedSettings.settingsIndex,
                    YEAR_SPACING: parsedSettings.YEAR_SPACING,
                    BASE_YEAR: parsedSettings.BASE_YEAR,
                    PERIOD_HEIGHT: parsedSettings.PERIOD_HEIGHT,
                    LEVEL_SPACING: parsedSettings.LEVEL_SPACING,
                    EVENT_RADIUS: parsedSettings.EVENT_RADIUS,
                    COLORIZE_ON_CREATE: parsedSettings.COLORIZE_ON_CREATE,
                    THEME_INDEX: parsedSettings.THEME_INDEX,
                    NEGATIVE_LEVEL: parsedSettings.NEGATIVE_LEVEL,
                })
            }
        } catch (error) {
            console.error("Error loading settings from local storage:", error);
        }
    },
    saveSettingsToLocalStorage: () => {
        const settings = {
            settingsIndex: get().settingsIndex,
            YEAR_SPACING: get().YEAR_SPACING,
            BASE_YEAR: get().BASE_YEAR,
            PERIOD_HEIGHT: get().PERIOD_HEIGHT,
            LEVEL_SPACING: get().LEVEL_SPACING,
            EVENT_RADIUS: get().EVENT_RADIUS,
            COLORIZE_ON_CREATE: get().COLORIZE_ON_CREATE,
            THEME_INDEX: get().THEME_INDEX,
            NEGATIVE_LEVEL: get().NEGATIVE_LEVEL,
        };
        try {
            localStorage.setItem("settings", JSON.stringify(settings));
        } catch (error) {
            console.error("Error saving settings to local storage:", error);
        }
    },
    resetSettings: () => {
        localStorage.removeItem("settings");
        set({
            YEAR_SPACING: 100,
            BASE_YEAR: 2010,
            PERIOD_HEIGHT: 80,
            LEVEL_SPACING: 30,
            EVENT_RADIUS: 10,
            COLORIZE_ON_CREATE: false,
            THEME_INDEX: 0,
            NEGATIVE_LEVEL: true,
        })
    },
}))