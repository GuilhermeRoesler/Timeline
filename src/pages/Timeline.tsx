import { useEffect, useState } from 'react';
import InfoCard from '../components/infocard/InfoCard';
import SidePanel from '../components/panels/side-panel/SidePanel';
import Toolbar from '../components/panels/toolbar/Toolbar';
import OnboardingOverlay from '../components/onboarding/OnboardingOverlay';
import { SimpleDate } from '../lib/SimpleDate';
import TimelineAxis from '../components/timeline/TimelineAxis';
import { usePeriodsStore } from '../store/periodsStore';
import { useEventsStore } from '../store/eventsStore';
import { TIMELINE_Y, useSettingsStore } from '../store/settingsStore';
import { useStageControlsStore } from '../store/stageControlsStore';
import { useDetailsBalloonStore } from '../store/detailsBalloonStore';
import { useSidePanelStore } from '../store/sidePanelStore';
import type { ApiUserData } from '../types/userData';
import { DEMO_INITIAL_VIEW, SPACE_DEMO_INITIAL_VIEW } from '../constants/demoView';
import { computeFitTimelineView, getContentYearBounds } from '../utils/fitTimelineView';
import { DEMO_SPACE_PROJECT_ID } from '../services/projectStorageService';
import { Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TimelineProps = {
    data: ApiUserData;
    projectId: string;
    projectName: string;
    isDemo: boolean;
    showOnboarding: boolean;
    onDismissOnboarding: () => void;
    onBack: () => void;
};

const getDemoView = (projectId: string) => {
    if (projectId === DEMO_SPACE_PROJECT_ID) return SPACE_DEMO_INITIAL_VIEW;
    return DEMO_INITIAL_VIEW;
};

const Timeline = ({
    data,
    projectId,
    projectName,
    isDemo,
    showOnboarding,
    onDismissOnboarding,
    onBack,
}: TimelineProps) => {
    const [bannerVisible, setBannerVisible] = useState(isDemo);
    const setPeriods = usePeriodsStore((state) => state.setPeriods);
    const setEvents = useEventsStore((state) => state.setEvents);
    const setSettings = useSettingsStore((state) => state.setSettings);

    useEffect(() => {
        document.body.classList.add('timeline-view');
        return () => {
            document.body.classList.remove('timeline-view');
            useDetailsBalloonStore.getState().clearDetails();
        };
    }, []);

    useEffect(() => {
        const formattedPeriods = data.periods.map((period) => ({
            ...period,
            start: new SimpleDate(period.start_date),
            end: new SimpleDate(period.end_date),
        }));

        const formattedEvents = data.events.map((event) => ({
            ...event,
            date: new SimpleDate(event.event_date),
        }));

        setPeriods(formattedPeriods);
        setEvents(formattedEvents);
        setSettings(data.settings);

        useSidePanelStore.setState({
            isSidePanelOpen: false,
            editPeriod: null,
            editEvent: null,
        });
        useDetailsBalloonStore.getState().clearDetails();

        const settings = data.settings;
        if (!settings) {
            return;
        }

        const baseYear = settings.base_year;
        const yearSpacing = settings.year_spacing;
        const demoView = getDemoView(projectId);
        const bounds = isDemo
            ? {
                  startYear: demoView.startYear,
                  endYear: demoView.endYear,
              }
            : getContentYearBounds(
                  formattedPeriods.map((p) => ({
                      startYear: p.start.getYear(),
                      endYear: p.end.getYear(),
                  })),
                  formattedEvents.map((e) => e.date.getYear()),
                  baseYear,
              );

        const view = computeFitTimelineView({
            startYear: bounds.startYear,
            endYear: bounds.endYear,
            baseYear,
            yearSpacing,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            timelineY: TIMELINE_Y,
            paddingRatio: isDemo ? 0.1 : 0.16,
        });

        useStageControlsStore.getState().setStageScale(view.scale);
        useStageControlsStore.getState().setStagePos(view.pos);

        if (!isDemo) {
            return;
        }

        const featured = formattedPeriods.find((p) => p.id === demoView.featuredPeriodId);
        if (!featured) {
            return;
        }

        const pinTimeout = window.setTimeout(() => {
            useDetailsBalloonStore.getState().pinPeriod(featured);
        }, demoView.featuredPinDelayMs);

        return () => window.clearTimeout(pinTimeout);
    }, [data, isDemo, projectId, setPeriods, setEvents, setSettings]);

    return (
        <>
            {isDemo && bannerVisible && (
                <div className="animate-hero-rise fixed bottom-6 left-1/2 z-[1100] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-3 rounded-full border border-border/80 bg-background/95 px-4 py-2.5 text-sm text-foreground shadow-lg shadow-ink/10 backdrop-blur">
                    <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                    <span className="min-w-0 truncate">
                        Demo — <strong className="font-medium">{projectName}</strong>
                    </span>
                    <Link
                        to="/dashboard"
                        className={cn(
                            buttonVariants({ variant: 'secondary', size: 'sm' }),
                            'text-xs',
                        )}
                    >
                        Meus projetos
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setBannerVisible(false)}
                        aria-label="Fechar aviso"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <Toolbar onBack={onBack} projectName={projectName} />
            <TimelineAxis />
            <InfoCard />
            <SidePanel />

            {showOnboarding && <OnboardingOverlay onDismiss={onDismissOnboarding} />}
        </>
    );
};

export default Timeline;
