import { useRef, useEffect } from 'react';
import { useSidePanelStore } from '@/store/sidePanelStore';
import SidePanelForm from './SidePanelForm';
import SidePanelEditForm from './SidePanelEditForm';
import { getDefaultColor } from '@/utils/colorUtils';
import { useEventsStore } from '@/store/eventsStore';
import { usePeriodsStore } from '@/store/periodsStore';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const SidePanel = () => {
    const { editPeriod, editEvent, isSidePanelOpen } = useSidePanelStore((state) => state);
    const sidePanelRef = useRef<HTMLDivElement>(null);
    const periods = usePeriodsStore((state) => state.periods);
    const events = useEventsStore((state) => state.events);

    useEffect(() => {
        useSidePanelStore.setState({ colorValue: getDefaultColor() });
    }, [periods, events]);

    useEffect(() => {
        sidePanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [isSidePanelOpen]);

    useEffect(() => {
        if (editPeriod || editEvent)
            useSidePanelStore.setState({ isSidePanelOpen: true, imageSelectedType: 'link' });

        if (editPeriod)
            useSidePanelStore.setState({
                titleValue: editPeriod.title,
                descriptionValue: editPeriod.description,
                startValue: editPeriod.start.toString(),
                endValue: editPeriod.end.toString(),
                colorValue: editPeriod.color,
                linkValue: editPeriod.image,
            });

        if (editEvent)
            useSidePanelStore.setState({
                titleValue: editEvent.title,
                descriptionValue: editEvent.description,
                dateValue: editEvent.date.toString(),
                colorValue: editEvent.color,
                linkValue: editEvent.image,
            });

        if (!editPeriod && !editEvent) {
            useSidePanelStore.setState({
                imageSelectedType: 'search',
                titleValue: '',
                descriptionValue: '',
                startValue: '2010-01-01',
                endValue: '2010-01-01',
                dateValue: '2010-01-01',
                colorValue: getDefaultColor(),
                linkValue: '',
            });
        }
    }, [editPeriod, editEvent]);

    useEffect(() => {
        if (editEvent) {
            useSidePanelStore.setState({ editPeriod: null });
        }
    }, [editEvent]);

    useEffect(() => {
        if (editPeriod) {
            useSidePanelStore.setState({ editEvent: null });
        }
    }, [editPeriod]);

    const handleClose = () => {
        useSidePanelStore.setState({
            imageSelectedType: 'search',
            isSidePanelOpen: false,
            editPeriod: null,
            editEvent: null,
        });
    };

    const handleSwitch = () => {
        useSidePanelStore.setState({
            imageSelectedType: 'search',
            isSidePanelOpen: !isSidePanelOpen,
            editPeriod: null,
            editEvent: null,
        });
    };

    return (
        <div
            ref={sidePanelRef}
            className="side-panel"
            style={{ translate: isSidePanelOpen ? '0 -50%' : '100% -50%' }}
        >
            <div className="open-close-area" onClick={handleSwitch}>
                {isSidePanelOpen ? <ChevronRight /> : <ChevronLeft />}
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="absolute top-0 right-0 h-10 w-10 rounded-tr-lg"
                aria-label="Fechar painel"
            >
                <X className="h-5 w-5" />
            </Button>
            {editPeriod || editEvent ? <SidePanelEditForm /> : <SidePanelForm />}
        </div>
    );
};

export default SidePanel;
