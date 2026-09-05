/** Curated first impression for the computing demo (mainframes → early internet). */
export const DEMO_INITIAL_VIEW = {
    startYear: 1940,
    endYear: 2008,
    featuredPeriodId: 'demo-p2',
    /** Overview → target camera tween. */
    cinematicZoomMs: 1400,
    /** Extra years on each side for the opening wide shot. */
    overviewPadYears: 28,
    /** Delay after camera settles before pinning the featured InfoCard. */
    featuredPinDelayMs: 380,
    /** Onboarding tip waits for the signature beat to finish. */
    onboardingDelayMs: 2200,
} as const;

/** First impression for the space-race showcase. */
export const SPACE_DEMO_INITIAL_VIEW = {
    startYear: 1955,
    endYear: 2020,
    featuredPeriodId: 'space-p2',
    cinematicZoomMs: 1400,
    overviewPadYears: 30,
    featuredPinDelayMs: 380,
    onboardingDelayMs: 2200,
} as const;
