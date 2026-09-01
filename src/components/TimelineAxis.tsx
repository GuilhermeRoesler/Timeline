import TimelineStage from './TimelineStage';
import TimelineYears from './TimelineYears';
import TimelineMainLine from './TimelineMainLine';
import PeriodsLoader from './PeriodsLoader';
import EventsLoader from './EventsLoader';

const TimelineAxis = () => {
    return (
        <TimelineStage>
            <TimelineMainLine />
            <TimelineYears />
            <PeriodsLoader />
            <EventsLoader />
        </TimelineStage>
    );
}

export default TimelineAxis