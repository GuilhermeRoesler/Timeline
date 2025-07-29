import { useState } from "react"
import { exportTimeline, importTimeline } from "../../utils/fileOperations"
import { useSidePanelStore } from "../../store/sidePanelStore"

const Toolbar = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleClick = () => {
        useSidePanelStore.setState({ imageSelectedType: "search", isSidePanelOpen: true, editPeriod: null, editEvent: null });
    }

    return (
        <div className="toolbar">
            <span style={{ fontWeight: "bold", fontSize: 24, color: "#333" }}>Timeline</span>
            <button onClick={handleClick}>Criar</button>
            <span className="material-symbols-outlined" title="Download" onClick={exportTimeline}>download</span>
            <span className="material-symbols-outlined" title="Upload" onClick={importTimeline}>upload</span>
            <span className="material-symbols-outlined" title="More" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>more_vert
                {isSettingsOpen && (
                    <div className="more-container">
                        <div className="more-item" title="Adjust Layers">
                            <span className="material-symbols-outlined">stacks</span>
                            <p>Adjust Layers</p>
                        </div>
                        <div className="more-item" title="Colorize">
                            <span className="material-symbols-outlined">palette</span>
                            <p>Colorize</p>
                        </div>
                        <div className="more-item" title="Settings">
                            <span className="material-symbols-outlined">settings</span>
                            <p>Settings</p>
                        </div>
                    </div>
                )}
            </span>
        </div>
    )
}

export default Toolbar