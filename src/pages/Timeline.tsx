import InfoCard from "../components/infocard/InfoCard"
import SidePanel from "../components/panels/side panel/SidePanel"
import Toolbar from "../components/panels/toolbar/Toolbar"
import { SimpleDate } from "../lib/SimpleDate"
import TimelineAxis from "../components/timeline/TimelineAxis"
import { usePeriodsStore } from "../store/periodsStore"
import { useEventsStore } from "../store/eventsStore"
import { useSettingsStore } from "../store/settingsStore"

const Timeline = ({ data, onLogout }: { data: any, onLogout: () => void }) => {
    const setPeriods = usePeriodsStore(state => state.setPeriods)
    const setEvents = useEventsStore(state => state.setEvents)
    const setSettings = useSettingsStore(state => state.setSettings)

    const formattedPeriods = data.periods.map((period: any) => ({
        ...period,
        start: new SimpleDate(period.start_date),
        end: new SimpleDate(period.end_date)
    }))

    const formattedEvents = data.events.map((event: any) => ({
        ...event,
        date: new SimpleDate(event.event_date)
    }))

    setPeriods(formattedPeriods)
    setEvents(formattedEvents)
    setSettings(data.settings)

    return (
        <>
            <Toolbar onLogout={onLogout} />
            <TimelineAxis />
            <InfoCard />
            <SidePanel />
        </>
    )
}

export default Timeline