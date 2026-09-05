import { describe, expect, it } from 'vitest';
import { computeFitTimelineView, getContentYearBounds } from './fitTimelineView';

describe('computeFitTimelineView', () => {
    it('centers the year range in the viewport', () => {
        const view = computeFitTimelineView({
            startYear: 1940,
            endYear: 2000,
            baseYear: 1820,
            yearSpacing: 80,
            viewportWidth: 1200,
            viewportHeight: 800,
            timelineY: 400,
            paddingRatio: 0,
            maxScale: 1,
        });

        const midYear = 1970;
        const midX = (midYear - 1820) * 80;
        expect(view.pos.x).toBeCloseTo(1200 / 2 - midX * view.scale, 5);
        expect(view.pos.y).toBeCloseTo(800 / 2 - 400 * view.scale, 5);
        expect(view.scale).toBeCloseTo(1200 / (60 * 80), 5);
    });

    it('clamps scale to maxScale', () => {
        const view = computeFitTimelineView({
            startYear: 2000,
            endYear: 2001,
            baseYear: 2000,
            yearSpacing: 10,
            viewportWidth: 2000,
            viewportHeight: 800,
            timelineY: 400,
            maxScale: 0.5,
            paddingRatio: 0,
        });

        expect(view.scale).toBe(0.5);
    });
});

describe('getContentYearBounds', () => {
    it('uses period and event years', () => {
        expect(
            getContentYearBounds(
                [
                    { startYear: 1830, endYear: 1945 },
                    { startYear: 1990, endYear: 2010 },
                ],
                [1977, 2022],
                1800,
            ),
        ).toEqual({ startYear: 1830, endYear: 2022 });
    });

    it('falls back when empty', () => {
        expect(getContentYearBounds([], [], 2010)).toEqual({
            startYear: 2010,
            endYear: 2030,
        });
    });
});
