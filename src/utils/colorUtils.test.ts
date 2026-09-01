import { describe, expect, it, vi } from 'vitest';

vi.mock('../store/periodsStore', () => ({
    usePeriodsStore: { getState: () => ({ periods: [] }) },
}));

vi.mock('../store/eventsStore', () => ({
    useEventsStore: { getState: () => ({ events: [] }) },
}));

vi.mock('../store/settingsStore', () => ({
    useSettingsStore: { getState: () => ({ THEME_INDEX: 0 }) },
    TIMELINE_Y: 800,
}));

vi.mock('../services/timelineService', () => ({
    colorizeTimeline: vi.fn(),
}));

import { hexToRgba } from './colorUtils';

describe('hexToRgba', () => {
    it('converte hex completo para rgba', () => {
        expect(hexToRgba('#FF5733', 0.5)).toBe('rgba(255, 87, 51, 0.5)');
    });

    it('aceita hex sem #', () => {
        expect(hexToRgba('00FF00', 1)).toBe('rgba(0, 255, 0, 1)');
    });

    it('expande hex curto de 3 caracteres', () => {
        expect(hexToRgba('#F00', 0.8)).toBe('rgba(255, 0, 0, 0.8)');
    });
});
