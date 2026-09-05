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
import { DEMO_INITIAL_VIEW } from '../constants/demoView';
import { computeFitTimelineView, getContentYearBounds } from '../utils/fitTimelineView';
import { Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TimelineProps = {
    data: ApiUserData;
    projectName: string;
    isDemo: boolean;
    showOnboarding: boolean;
    onDismissOnboarding: () => void;
    onBack: () => void;
};

const Timeline = ({
    data,
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

        const settings = data.settings;
        if (!settings) {
            return;
        }

        const baseYear = settings.base_year;
        const yearSpacing = settings.year_spacing;
        const bounds = isDemo
            ? {
                  startYear: DEMO_INITIAL_VIEW.startYear,
                  endYear: DEMO_INITIAL_VIEW.endYear,
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
            paddingRatio: isDemo ? 0.08 : 0.16,
        });

        useStageControlsStore.getState().setStageScale(view.scale);
        useStageControlsStore.getState().setStagePos(view.pos);

        if (isDemo) {
            const featured = formattedPeriods.find(
                (p) => p.id === DEMO_INITIAL_VIEW.featuredPeriodId,
            );
            if (featured) {
                window.setTimeout(() => {
                    useDetailsBalloonStore.getState().pinPeriod(featured);
                }, 450);
            }
        } else {
            useDetailsBalloonStore.getState().clearDetails();
        }
    }, [data, isDemo, setPeriods, setEvents, setSettings]);

    return (
        <>
            {isDemo && bannerVisible && (
                <div className="fixed top-0 right-0 left-0 z-[1100] flex items-center justify-center gap-3 border-b border-primary/20 bg-ink/90 px-4 py-2.5 text-sm text-primary-foreground backdrop-blur">
                    <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                    <span>
                        Demo interativa — <strong>{projectName}</strong>. Explore e depois crie a
                        sua.
                    </span>
                    <Link
                        to="/dashboard"
                        className={cn(
                            buttonVariants({ variant: 'secondary', size: 'sm' }),
                            'bg-white/10 text-xs text-white hover:bg-white/20',
                        )}
                    >
                        Meus projetos
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setBannerVisible(false)}
                        className="text-white hover:bg-white/15"
                        aria-label="Fechar aviso"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}

            <Toolbar
                onBack={onBack}
                projectName={projectName}
                hasDemoBanner={isDemo && bannerVisible}
            />
            <TimelineAxis />
            <InfoCard />
            <SidePanel />

            {showOnboarding && <OnboardingOverlay onDismiss={onDismissOnboarding} />}
        </>
    );
};

export default Timeline;
