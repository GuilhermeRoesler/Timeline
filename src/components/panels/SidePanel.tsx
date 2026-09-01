import { useSidePanelStore } from "../../store/sidePanelStore";
import SidePanelForm from "./SidePanelForm";

const SidePanel = () => {
    const isSidePanelOpen = useSidePanelStore(state => state.isSidePanelOpen)
    const setIsSidePanelOpen = useSidePanelStore(state => state.setIsSidePanelOpen)

    return (
        <div className="side-panel" style={{ translate: isSidePanelOpen ? "0 -50%" : "100% -50%" }}>
            <div className="open-close-area" onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
                <i className={`fa-solid fa-chevron-${isSidePanelOpen ? 'right' : 'left'}`}></i>
            </div>
            <i className="fa-solid fa-xmark" onClick={() => setIsSidePanelOpen(false)}></i>
            <SidePanelForm />
        </div>
    )
}

export default SidePanel