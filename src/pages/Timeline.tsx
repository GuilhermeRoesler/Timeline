import { useEffect } from 'react';
import type { UserData } from '../types/userData';
import { usePeriodsStore } from '../store/periodsStore';
import { useEventsStore } from '../store/eventsStore';
import { useSettingsStore } from '../store/settingsStore';
import Header from '../components/header/Header';
import Main from '../components/main/Main';
import SidePanel from '../components/panels/side-panel/SidePanel';
import InfoCard from '../components/infocard/InfoCard';
import SettingsPanel from '../components/panels/settings-panel/SettingsPanel';
import { colorize } from '../utils/colorUtils';

interface TimelineProps {
    data: UserData;
    onLogout: () => void;
}

const Timeline = ({ data, onLogout }: TimelineProps) => {
    const { periods, events, settings } = data;
    const setPeriods = usePeriodsStore(state => state.setPeriods);
    const setEvents = useEventsStore(state => state.setEvents);
    const setSettings = useSettingsStore(state => state.setSettings);

    useEffect(() => {
        setPeriods(periods);
        setEvents(events);
        if (settings) {
            setSettings(settings);
        }
        if (settings?.COLORIZE_ON_LOAD) {
            colorize();
        }
    }, [periods, events, settings, setPeriods, setEvents, setSettings]);

    return (
        <>
            <Header onLogout={onLogout} />
            <Main />
            <SidePanel />
            <InfoCard />
            <SettingsPanel />
        </>
    );
};

export default Timeline;