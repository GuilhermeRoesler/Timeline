import { useEffect, useState } from 'react';
import InfoCard from '../components/infocard/InfoCard';
import SidePanel from '../components/panels/side-panel/SidePanel';
import Toolbar from '../components/panels/toolbar/Toolbar';
import OnboardingOverlay from '../components/onboarding/OnboardingOverlay';
import { SimpleDate } from '../lib/SimpleDate';
import TimelineAxis from '../components/timeline/TimelineAxis';
import { usePeriodsStore } from '../store/periodsStore';
import { useEventsStore } from '../store/eventsStore';
import { useSettingsStore } from '../store/settingsStore';
import type { ApiUserData } from '../types/userData';
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
        return () => document.body.classList.remove('timeline-view');
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
    }, [data, setPeriods, setEvents, setSettings]);

    return (
        <>
            {isDemo && bannerVisible && (
                <div className="fixed top-0 right-0 left-0 z-[1100] flex items-center justify-center gap-3 bg-amber-500 px-4 py-2 text-sm text-white">
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>
                        Projeto demo — <strong>{projectName}</strong>. Volte ao dashboard para criar
                        o seu.
                    </span>
                    <Link
                        to="/dashboard"
                        className={cn(
                            buttonVariants({ variant: 'secondary', size: 'sm' }),
                            'bg-white/20 text-xs text-white hover:bg-white/30',
                        )}
                    >
                        Meus projetos
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setBannerVisible(false)}
                        className="text-white hover:bg-white/20"
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
