/** Curated first impression for the computing demo (mainframes → early internet). */
export const DEMO_INITIAL_VIEW = {
    startYear: 1940,
    endYear: 2008,
    featuredPeriodId: 'demo-p2',
    /** Delay before pinning the featured InfoCard — keeps the first beat canvas-first. */
    featuredPinDelayMs: 1400,
} as const;

/** First impression for the space-race showcase. */
export const SPACE_DEMO_INITIAL_VIEW = {
    startYear: 1955,
    endYear: 2020,
    featuredPeriodId: 'space-p2',
    featuredPinDelayMs: 1400,
} as const;
