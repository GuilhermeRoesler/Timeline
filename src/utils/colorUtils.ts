import { usePeriodsStore } from '../store/periodsStore';
import { useEventsStore } from '../store/eventsStore';
import { useSettingsStore } from '../store/settingsStore';
import { themeColors } from '../data/theme';
import { colorizeTimeline } from '../services/timelineService';
import type { Period } from '../types/period';
import type { Event } from '../types/event';

// Função pura para obter a próxima cor padrão
export function getDefaultColor() {
    const { periods } = usePeriodsStore.getState();
    const { events } = useEventsStore.getState();
    const THEME_INDEX = useSettingsStore.getState().THEME_INDEX;
    const color = themeColors[THEME_INDEX];

    const palette = color.map((c) => c.toUpperCase());
    const usedColors = [
        ...periods.map((p) => (p.color || '').toUpperCase()),
        ...events.map((e) => (e.color || '').toUpperCase()),
    ].filter((c) => c && palette.includes(c));
    const lastColor = usedColors.length > 0 ? usedColors[usedColors.length - 1] : palette[0];
    const idx = palette.indexOf(lastColor);
    return color[(idx + 1) % color.length];
}

export function colorize() {
    const { periods } = usePeriodsStore.getState();
    const { events } = useEventsStore.getState();
    const THEME_INDEX = useSettingsStore.getState().THEME_INDEX;
    const color = themeColors[THEME_INDEX];

    const sortedPeriods = [...periods].sort(
        (a: Period, b: Period) =>
            new Date(a.start.toString()).getTime() - new Date(b.start.toString()).getTime(),
    );
    const colorizedPeriods = sortedPeriods.map((period: Period, index: number) => ({
        ...period,
        color: color[index % color.length],
    }));

    const sortedEvents = [...events].sort(
        (a: Event, b: Event) =>
            new Date(a.date.toString()).getTime() - new Date(b.date.toString()).getTime(),
    );
    const colorizedEvents = sortedEvents.map((event: Event, index: number) => ({
        ...event,
        color: color[index % color.length],
    }));

    const periodsForApi = colorizedPeriods.map((p) => ({
        ...p,
        start_date: p.start.toString(),
        end_date: p.end.toString(),
    }));
    const eventsForApi = colorizedEvents.map((e) => ({
        ...e,
        event_date: e.date.toString(),
    }));

    colorizeTimeline(periodsForApi, eventsForApi);
    usePeriodsStore.getState().setPeriods(colorizedPeriods);
    useEventsStore.getState().setEvents(colorizedEvents);
}

const expandHex = (hex: string): string => {
    const cleaned = hex.replace('#', '');
    if (cleaned.length === 3) {
        return cleaned
            .split('')
            .map((char) => char + char)
            .join('');
    }
    return cleaned;
};

export function hexToRgba(hex: string, alpha: number): string {
    const fullHex = expandHex(hex);
    const r = parseInt(fullHex.substring(0, 2), 16);
    const g = parseInt(fullHex.substring(2, 4), 16);
    const b = parseInt(fullHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Mix hex toward white (amount 0–1). */
export function lightenHex(hex: string, amount = 0.22): string {
    const fullHex = expandHex(hex);
    const mix = (channel: number) =>
        Math.round(channel + (255 - channel) * Math.min(1, Math.max(0, amount)));
    const r = mix(parseInt(fullHex.substring(0, 2), 16));
    const g = mix(parseInt(fullHex.substring(2, 4), 16));
    const b = mix(parseInt(fullHex.substring(4, 6), 16));
    return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

/** Mix hex toward black (amount 0–1). */
export function darkenHex(hex: string, amount = 0.14): string {
    const fullHex = expandHex(hex);
    const mix = (channel: number) => Math.round(channel * (1 - Math.min(1, Math.max(0, amount))));
    const r = mix(parseInt(fullHex.substring(0, 2), 16));
    const g = mix(parseInt(fullHex.substring(2, 4), 16));
    const b = mix(parseInt(fullHex.substring(4, 6), 16));
    return `#${[r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}
