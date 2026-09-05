export type FitTimelineViewInput = {
    startYear: number;
    endYear: number;
    baseYear: number;
    yearSpacing: number;
    viewportWidth: number;
    viewportHeight: number;
    timelineY: number;
    /** Extra space around the range (0–0.4). Default 0.12 */
    paddingRatio?: number;
    /** Max zoom (matches stage zoom ceiling). Default 0.75 */
    maxScale?: number;
    /** Min zoom (matches stage zoom floor). Default 0.007 */
    minScale?: number;
};

export type FitTimelineViewResult = {
    scale: number;
    pos: { x: number; y: number };
};

/**
 * Computes stage scale/position so a year range sits centered in the viewport.
 */
export const computeFitTimelineView = ({
    startYear,
    endYear,
    baseYear,
    yearSpacing,
    viewportWidth,
    viewportHeight,
    timelineY,
    paddingRatio = 0.12,
    maxScale = 0.75,
    minScale = 0.007,
}: FitTimelineViewInput): FitTimelineViewResult => {
    const safeStart = Math.min(startYear, endYear);
    const safeEnd = Math.max(startYear, endYear);
    const spanYears = Math.max(safeEnd - safeStart, 1);
    const worldWidth = spanYears * yearSpacing;
    const paddedWidth = worldWidth * (1 + paddingRatio * 2);

    const scale = Math.min(maxScale, Math.max(minScale, viewportWidth / paddedWidth));

    const midYear = (safeStart + safeEnd) / 2;
    const midX = (midYear - baseYear) * yearSpacing;

    return {
        scale,
        pos: {
            x: viewportWidth / 2 - midX * scale,
            y: viewportHeight / 2 - timelineY * scale,
        },
    };
};

export type ContentYearBounds = {
    startYear: number;
    endYear: number;
};

export const getContentYearBounds = (
    periods: { startYear: number; endYear: number }[],
    eventYears: number[],
    fallbackBaseYear: number,
): ContentYearBounds => {
    const years: number[] = [];
    for (const period of periods) {
        years.push(period.startYear, period.endYear);
    }
    years.push(...eventYears);

    if (years.length === 0) {
        return { startYear: fallbackBaseYear, endYear: fallbackBaseYear + 20 };
    }

    return {
        startYear: Math.min(...years),
        endYear: Math.max(...years),
    };
};
