import { usePeriodsLoaderStore, useEventsLoaderStore } from "../store/periodsEventsLoaderStore";
import { useSettingsStore } from "../store/settingsStore";
import { themeColors } from "../components/data/theme";

// Função pura para obter a próxima cor padrão
export function getDefaultColor() {
    const { periods } = usePeriodsLoaderStore.getState();
    const { events } = useEventsLoaderStore.getState();
    const THEME_INDEX = useSettingsStore.getState().THEME_INDEX;
    const color = themeColors[THEME_INDEX];

    const usedColors = [
        ...periods.map(p => (p.color || "").toUpperCase()),
        ...events.map(e => (e.color || "").toUpperCase())
    ].filter(c => c && color.includes(c));
    const lastColor = usedColors.length > 0
        ? usedColors[usedColors.length - 1]
        : color[0];
    const idx = color.indexOf(lastColor);
    return color[(idx + 1) % color.length];
}

export function colorize() {
    const { periods } = usePeriodsLoaderStore.getState();
    const { events } = useEventsLoaderStore.getState();
    const THEME_INDEX = useSettingsStore.getState().THEME_INDEX;
    const color = themeColors[THEME_INDEX];

    const sortedPeriods = periods.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());
    const colorizedPeriods = sortedPeriods.map((period: any, index: number) => ({ ...period, color: color[index % color.length] }));

    const sortedEvents = events.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const colorizedEvents = sortedEvents.map((event: any, index: number) => ({ ...event, color: color[index % color.length] }));

    usePeriodsLoaderStore.getState().setPeriods(colorizedPeriods);
    useEventsLoaderStore.getState().setEvents(colorizedEvents);

    return { colorizedPeriods, colorizedEvents };
}

export function hexToRgba(hex: string, alpha: number): string {
    // Remove o sinal de "#" se estiver presente
    const cleanedHex = hex.replace('#', '');

    // Converte valores curtos como "F00" para "FF0000"
    const fullHex = cleanedHex.length === 3
        ? cleanedHex.split('').map(char => char + char).join('')
        : cleanedHex;

    const r = parseInt(fullHex.substring(0, 2), 16);
    const g = parseInt(fullHex.substring(2, 4), 16);
    const b = parseInt(fullHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}