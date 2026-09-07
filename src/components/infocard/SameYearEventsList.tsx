import { hexToRgba } from '../../utils/colorUtils';
import type { Event } from '../../types/event';
import { cn } from '@/lib/utils';

const SameYearEventsList = ({
    sameYearEvents,
    sameYearEventsIndex,
    setSameYearEventsIndex,
}: {
    sameYearEvents: Event[];
    sameYearEventsIndex: number;
    setSameYearEventsIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
    if (sameYearEvents.length <= 1) return null;

    return (
        <div className="same-year-events-list">
            <p className="px-2 pb-1 text-[0.65rem] font-semibold tracking-wide text-muted-foreground uppercase">
                No mesmo ano
            </p>
            {sameYearEvents.map((event, index) => (
                <div
                    key={event.id}
                    className={cn('item', index === sameYearEventsIndex && 'is-active')}
                    onClick={() => setSameYearEventsIndex(index)}
                    style={{
                        backgroundColor: hexToRgba(
                            event.color,
                            index === sameYearEventsIndex ? 0.22 : 0.1,
                        ),
                        opacity: index === sameYearEventsIndex ? 1 : 0.75,
                    }}
                >
                    <h3 className="title">{event.title}</h3>
                    <p className="description">
                        {event.description === '' ? 'Sem descrição' : event.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default SameYearEventsList;
