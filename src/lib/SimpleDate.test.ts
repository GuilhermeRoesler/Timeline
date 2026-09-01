import { describe, expect, it } from 'vitest';
import { SimpleDate } from './SimpleDate';

describe('SimpleDate', () => {
    it('cria uma data válida no formato YYYY-MM-DD', () => {
        const date = new SimpleDate('2024-06-15');
        expect(date.toString()).toBe('2024-06-15');
    });

    it('rejeita formatos inválidos', () => {
        expect(() => new SimpleDate('15-06-2024')).toThrow('Formato 15-06-2024 inválido');
        expect(() => new SimpleDate('2024/06/15')).toThrow();
        expect(() => new SimpleDate('invalid')).toThrow();
    });

    it('extrai ano, mês e dia corretamente', () => {
        const date = new SimpleDate('1999-01-31');
        expect(date.getYear()).toBe(1999);
        expect(date.getMonth()).toBe(1);
        expect(date.getDay()).toBe(31);
    });

    it('converte para Date local', () => {
        const date = new SimpleDate('2020-03-10');
        const native = date.toDate();
        expect(native.getFullYear()).toBe(2020);
        expect(native.getMonth()).toBe(2);
        expect(native.getDate()).toBe(10);
    });
});
