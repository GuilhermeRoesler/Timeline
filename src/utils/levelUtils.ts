import type { Period } from "../types/period";

export const calculateLevel = (start: number, end: number, periods: Period[]) => {
    let level = 1;

    while (true) {
        const filteredPeriods = periods.filter(period => period.level === level);
        if (filteredPeriods.length === 0) {
            return level; // No periods at this level, return it
        }
        const conflict = filteredPeriods.some(period => {
            if (period.start.getYear() < end && period.end.getYear() > start) {
                return true; // Overlapping period found
            };
        });

        if (!conflict) {
            return level; // No conflict, return the current level
        } else {
            if (level > 0) {
                level = -level; // Switch to negative levels if conflicts exist
            } else if (level < 0) {
                level = -level + 1; // Increment negative level}
            }
        }
    }
}

export const adjustLayer = (periods: Period[]) => {
    // Ordena os períodos por início (opcional, mas recomendado)
    const sorted = [...periods].sort((a, b) => a.start.getYear() - b.start.getYear());
    const placed: Period[] = [];
    const adjusted = sorted.map(period => {
        const level = calculateLevel(period.start.getYear(), period.end.getYear(), placed);
        const newPeriod = { ...period, level };
        placed.push(newPeriod);
        return newPeriod;
    });
    // Retorna os períodos na ordem original, mas com os níveis ajustados
    return periods.map(p => adjusted.find(a => a.id === p.id) || p);
};