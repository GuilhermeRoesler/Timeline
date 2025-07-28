import { exportTimeline, importTimeline } from "../../utils/fileOperations"
import { useSidePanelStore } from "../../store/sidePanelStore"

const Toolbar = () => {
    const handleClick = () => {
        useSidePanelStore.getState().setIsSidePanelOpen(true);
        useSidePanelStore.getState().setEditPeriod(null);
        useSidePanelStore.getState().setEditEvent(null);
    }

    return (
        <div className="toolbar">
            <span style={{ fontWeight: "bold", fontSize: 24, color: "#333" }}>Timeline</span>
            <button onClick={handleClick}>Criar</button>
            <span className="material-symbols-outlined" title="Download" onClick={exportTimeline}>download</span>
            <span className="material-symbols-outlined" title="Upload" onClick={importTimeline}>upload</span>
        </div>
    )
}

export default Toolbar