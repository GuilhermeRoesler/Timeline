import { describe, expect, it } from 'vitest';
import { getMarkerStep, getYearStep } from './timelineYearsUtils';

describe('getYearStep', () => {
    it('retorna passos menores para zoom alto', () => {
        expect(getYearStep(0.8)).toBe(1);
        expect(getYearStep(0.5)).toBe(2);
        expect(getYearStep(0.2)).toBe(5);
    });

    it('retorna passos maiores para zoom baixo', () => {
        expect(getYearStep(0.05)).toBe(20);
        expect(getYearStep(0.01)).toBe(100);
        expect(getYearStep(0.002)).toBe(500);
        expect(getYearStep(0)).toBe(1000);
    });
});

describe('getMarkerStep', () => {
    it('espelha yearStep quando <= 10', () => {
        expect(getMarkerStep(1)).toBe(1);
        expect(getMarkerStep(5)).toBe(5);
        expect(getMarkerStep(10)).toBe(10);
    });

    it('subdivide marcadores para passos maiores', () => {
        expect(getMarkerStep(20)).toBe(10);
        expect(getMarkerStep(25)).toBe(5);
        expect(getMarkerStep(50)).toBe(5);
        expect(getMarkerStep(100)).toBe(10);
    });

    it('retorna 1 para passos não mapeados', () => {
        expect(getMarkerStep(200)).toBe(1);
    });
});
