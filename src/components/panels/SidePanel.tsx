import { useSidePanelStore } from "../../store/sidePanelStore";
import SidePanelForm from "./SidePanelForm";
import SidePanelEditForm from "./SidePanelEditForm";

const SidePanel = () => {
    const editPeriod = useSidePanelStore(state => state.editPeriod)
    const editEvent = useSidePanelStore(state => state.editEvent)
    const isSidePanelOpen = useSidePanelStore(state => state.isSidePanelOpen)
    const setIsSidePanelOpen = useSidePanelStore(state => state.setIsSidePanelOpen)

    return (
        <div className="side-panel" style={{ translate: (isSidePanelOpen || editPeriod || editEvent) ? "0 -50%" : "100% -50%" }}>
            <div className="open-close-area" onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
                <i className={`fa-solid fa-chevron-${isSidePanelOpen ? 'right' : 'left'}`}></i>
            </div>
            <i className="fa-solid fa-xmark" onClick={() => setIsSidePanelOpen(false)}></i>
            {(editPeriod || editEvent) ? <SidePanelEditForm /> : <SidePanelForm />}
        </div>
    )
}

export default SidePanel