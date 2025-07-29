import { useRef, useEffect } from "react";
import { useSidePanelStore } from "../../store/sidePanelStore";
import SidePanelForm from "./SidePanelForm";
import SidePanelEditForm from "./SidePanelEditForm";

const SidePanel = () => {
    const editPeriod = useSidePanelStore(state => state.editPeriod)
    const editEvent = useSidePanelStore(state => state.editEvent)
    const setEditPeriod = useSidePanelStore(state => state.setEditPeriod)
    const setEditEvent = useSidePanelStore(state => state.setEditEvent)
    const isSidePanelOpen = useSidePanelStore(state => state.isSidePanelOpen)
    const sidePanelRef = useRef<HTMLDivElement>(null)
    const setIsSidePanelOpen = useSidePanelStore(state => state.setIsSidePanelOpen)

    useEffect(() => {
        if (isSidePanelOpen || editPeriod || editEvent)
            sidePanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [isSidePanelOpen, editPeriod, editEvent])

    useEffect(() => {
        if (editPeriod || editEvent) {
            setIsSidePanelOpen(true)
            useSidePanelStore.setState({ imageSelectedType: "link" })
            if (editPeriod)
                useSidePanelStore.setState({ linkValue: editPeriod.image });
            else if (editEvent)
                useSidePanelStore.setState({ linkValue: editEvent.image });
        } else if (!editPeriod && !editEvent) {
            useSidePanelStore.setState({ imageSelectedType: "search", titleValue: "" })
        }
    }, [editPeriod, editEvent])

    const handleClose = () => {
        setIsSidePanelOpen(false)
        setEditPeriod(null)
        setEditEvent(null)
    }

    const handleSwitch = () => {
        setIsSidePanelOpen(!isSidePanelOpen)
        setEditPeriod(null)
        setEditEvent(null)
    }

    return (
        <div ref={sidePanelRef} className="side-panel" style={{ translate: (isSidePanelOpen || editPeriod || editEvent) ? "0 -50%" : "100% -50%" }}>
            <div className="open-close-area" onClick={handleSwitch}>
                <i className={`fa-solid fa-chevron-${isSidePanelOpen ? 'right' : 'left'}`}></i>
            </div>
            <i className="fa-solid fa-xmark" onClick={handleClose}></i>
            {(editPeriod || editEvent) ? <SidePanelEditForm /> : <SidePanelForm />}
        </div>
    )
}

export default SidePanel