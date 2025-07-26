import { exportTimeline, importTimeline } from "../../utils/fileOperations"

const Toolbar = ({ setIsSidePanelOpen }: { setIsSidePanelOpen: (isSidePanelOpen: boolean) => void }) => {
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