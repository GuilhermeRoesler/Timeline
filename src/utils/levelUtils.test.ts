import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SimpleDate } from '../lib/SimpleDate';
import type { Period } from '../types/period';
import { calculateLevel } from './levelUtils';

const mockSettings = vi.hoisted(() => ({
    NEGATIVE_LEVEL: false,
}));

vi.mock('../store/settingsStore', () => ({
    useSettingsStore: {
        getState: () => mockSettings,
    },
}));

const createPeriod = (id: string, start: string, end: string, level: number): Period => ({
    id,
    title: id,
    description: '',
    image: '',
    color: '#000000',
    start: new SimpleDate(start),
    end: new SimpleDate(end),
    level,
});

describe('calculateLevel', () => {
    beforeEach(() => {
        mockSettings.NEGATIVE_LEVEL = false;
    });

    it('retorna nível 1 quando não há períodos existentes', () => {
        expect(calculateLevel(2000, 2010, [])).toBe(1);
    });

    it('retorna o mesmo nível quando não há conflito', () => {
        const periods = [createPeriod('a', '2000-01-01', '2005-12-31', 1)];
        expect(calculateLevel(2010, 2015, periods)).toBe(1);
    });

    it('incrementa o nível quando há sobreposição', () => {
        const periods = [createPeriod('a', '2000-01-01', '2010-12-31', 1)];
        expect(calculateLevel(2005, 2015, periods)).toBe(2);
    });

    it('usa nível negativo quando NEGATIVE_LEVEL está ativo', () => {
        mockSettings.NEGATIVE_LEVEL = true;
        const periods = [createPeriod('a', '2000-01-01', '2010-12-31', 1)];
        expect(calculateLevel(2005, 2015, periods)).toBe(-1);
    });
});
