import { useRef, useEffect } from "react";
import { useSidePanelStore } from "../../../store/sidePanelStore";
import SidePanelForm from "./SidePanelForm";
import SidePanelEditForm from "./SidePanelEditForm";
import { getDefaultColor } from "../../../utils/colorUtils";
import { useEventsStore } from "../../../store/eventsStore";
import { usePeriodsStore } from "../../../store/periodsStore";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const SidePanel = () => {
    const { editPeriod, editEvent, isSidePanelOpen } = useSidePanelStore(state => state)
    const sidePanelRef = useRef<HTMLDivElement>(null)
    const periods = usePeriodsStore(state => state.periods);
    const events = useEventsStore(state => state.events);
    // const colorValue = useSidePanelStore(state => state.colorValue)

    // Atualize colorValue sempre que periods ou events mudarem
    useEffect(() => {
        // if (colorValue === "")
        useSidePanelStore.setState({ colorValue: getDefaultColor() });
    }, [periods, events]);

    // Scrolla para o começo quando abre o painel
    useEffect(() => {
        sidePanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [isSidePanelOpen]);

    useEffect(() => {
        // Caso entre em modo de edição, abre o painel
        if (editPeriod || editEvent)
            useSidePanelStore.setState({ isSidePanelOpen: true, imageSelectedType: "link" })

        // Caso haja um período selecionado, ajusta os valores dos campos
        if (editPeriod)
            useSidePanelStore.setState({
                titleValue: editPeriod.title,
                descriptionValue: editPeriod.description,
                startValue: editPeriod.start.toString(),
                endValue: editPeriod.end.toString(),
                colorValue: editPeriod.color,
                linkValue: editPeriod.image
            });

        // Caso haja um evento selecionado, ajusta os valores dos campos
        if (editEvent)
            useSidePanelStore.setState({
                titleValue: editEvent.title,
                descriptionValue: editEvent.description,
                dateValue: editEvent.date.toString(),
                colorValue: editEvent.color,
                linkValue: editEvent.image
            });

        // Caso não haja ninguém do modo de edição, limpa os campos
        if (!editPeriod && !editEvent) {
            useSidePanelStore.setState({
                imageSelectedType: "search",
                titleValue: "",
                descriptionValue: "",
                startValue: "2010-01-01",
                endValue: "2010-01-01",
                dateValue: "2010-01-01",
                colorValue: getDefaultColor(),
                linkValue: "",
            })
        }
    }, [editPeriod, editEvent])

    // Clear editPeriod when editEvent is set
    useEffect(() => {
        if (editEvent) {
            useSidePanelStore.setState({ editPeriod: null })
        }
    }, [editEvent])

    // Clear editEvent when editPeriod is set
    useEffect(() => {
        if (editPeriod) {
            useSidePanelStore.setState({ editEvent: null })
        }
    }, [editPeriod])

    const handleClose = () => {
        useSidePanelStore.setState({ imageSelectedType: "search", isSidePanelOpen: false, editPeriod: null, editEvent: null })
    }

    const handleSwitch = () => {
        useSidePanelStore.setState({ imageSelectedType: "search", isSidePanelOpen: !isSidePanelOpen, editPeriod: null, editEvent: null })
    }

    return (
        <div ref={sidePanelRef} className="side-panel" style={{ translate: (isSidePanelOpen) ? "0 -50%" : "100% -50%" }}>
            <div className="open-close-area" onClick={handleSwitch}>
                {isSidePanelOpen ? <ChevronRight /> : <ChevronLeft />}
            </div>
            <button onClick={handleClose} className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center rounded-tr-lg hover:bg-gray-200 transition-colors">
                <X className="w-5 h-5" />
            </button>
            {(editPeriod || editEvent) ? <SidePanelEditForm /> : <SidePanelForm />}
        </div>
    )
}

export default SidePanel