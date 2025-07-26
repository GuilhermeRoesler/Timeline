import { exportTimeline, importTimeline } from "../../utils/fileOperations"
import { useSidePanelStore } from "../../store/sidePanelStore"

const Toolbar = () => {
    const setIsSidePanelOpen = useSidePanelStore(state => state.setIsSidePanelOpen)

    return (
        <div className="toolbar">
            <span style={{ fontWeight: "bold", fontSize: 24, color: "#333" }}>Timeline</span>
            <button onClick={() => setIsSidePanelOpen(true)}>Criar</button>
            <span className="material-symbols-outlined" title="Download" onClick={exportTimeline}>download</span>
            <span className="material-symbols-outlined" title="Upload" onClick={importTimeline}>upload</span>
        </div>
    )
}

export default Toolbar