import { describe, expect, it } from 'vitest';
import { getContainSize } from './compressImage';

describe('getContainSize', () => {
    it('mantém dimensões quando já cabem no limite', () => {
        expect(getContainSize(800, 600, 1200)).toEqual({ width: 800, height: 600 });
    });

    it('reduz o lado maior para o limite', () => {
        expect(getContainSize(2400, 1200, 1200)).toEqual({ width: 1200, height: 600 });
        expect(getContainSize(900, 1800, 1200)).toEqual({ width: 600, height: 1200 });
    });

    it('trata dimensões inválidas', () => {
        expect(getContainSize(0, 100, 1200)).toEqual({ width: 0, height: 0 });
        expect(getContainSize(-1, 50, 1200)).toEqual({ width: 0, height: 0 });
    });
});
