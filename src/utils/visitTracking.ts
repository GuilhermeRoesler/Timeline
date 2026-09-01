export const FIRST_VISIT_KEY = 'timeline_has_visited';
export const ONBOARDING_DISMISSED_KEY = 'timeline_onboarding_dismissed';

export const hasVisitedBefore = (): boolean => localStorage.getItem(FIRST_VISIT_KEY) === 'true';

export const markAsVisited = (): void => {
    localStorage.setItem(FIRST_VISIT_KEY, 'true');
};

export const isOnboardingDismissed = (): boolean =>
    localStorage.getItem(ONBOARDING_DISMISSED_KEY) === 'true';

export const dismissOnboarding = (): void => {
    localStorage.setItem(ONBOARDING_DISMISSED_KEY, 'true');
};
