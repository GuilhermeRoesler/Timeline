import type { Period } from "../types/period";
import type { Event } from "../types/event";

export const DEFAULT_COLORS = [
    '#6F34DC',
    '#A645E0',
    '#DD59C9',
    '#D11A6A',
    '#E36E4B',
    '#EFAE2C',
    '#F3DD31',
    '#C5E24C',
    '#68C74F',
    '#83DFCA',
    '#31B4DE',
    '#426DCC',
];

// Função pura para obter a próxima cor padrão
export function getDefaultColor(periods: Period[], events: Event[]) {
    // const DEFAULT_COLORS = [
    //     '#6F34DC', '#A645E0', '#DD59C9', '#D11A6A', '#E36E4B', '#EFAE2C',
    //     '#F3DD31', '#C5E24C', '#68C74F', '#83DFCA', '#31B4DE', '#426DCC',
    // ];
    const usedColors = [
        ...periods.map(p => (p.color || "").toUpperCase()),
        ...events.map(e => (e.color || "").toUpperCase())
    ].filter(c => c && DEFAULT_COLORS.includes(c));
    const lastColor = usedColors.length > 0
        ? usedColors[usedColors.length - 1]
        : DEFAULT_COLORS[0];
    const idx = DEFAULT_COLORS.indexOf(lastColor);
    return DEFAULT_COLORS[(idx + 1) % DEFAULT_COLORS.length];
}

export function colorize(periods: Period[], events: Event[]) {
    const sortedPeriods = periods.sort((a: any, b: any) => new Date(a.start).getTime() - new Date(b.start).getTime());
    const colorizedPeriods = sortedPeriods.map((period: any, index: number) => ({ ...period, color: DEFAULT_COLORS[index % DEFAULT_COLORS.length] }));
    return colorizedPeriods;
}