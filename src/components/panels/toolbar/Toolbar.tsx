import { useState } from "react"
import { exportTimeline, importTimeline } from "../../../utils/fileOperations"
import { useSidePanelStore } from "../../../store/sidePanelStore"
import { colorize } from "../../../utils/colorUtils"
import { usePeriodsLoaderStore } from "../../../store/periodsEventsLoaderStore"
import { adjustLayer } from "../../../utils/levelUtils"
import SettingsModal from "./SettingsModal"

const Toolbar = ({ onLogout }: { onLogout: () => void }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleOpen = () => {
        useSidePanelStore.setState({ imageSelectedType: "search", isSidePanelOpen: true, editPeriod: null, editEvent: null });
    }

    const adjustLayers = () => {
        const adjustedLayers = adjustLayer();
        usePeriodsLoaderStore.getState().setPeriods(adjustedLayers);
    }

    const applyColorize = () => {
        colorize();
    }

    return (
        <div className="toolbar">
            <span style={{ fontWeight: "bold", fontSize: 24, color: "#333" }}>Timeline</span>
            <button onClick={handleOpen}>Criar</button>
            <span className="material-symbols-outlined" title="Download" onClick={exportTimeline}>download</span>
            <span className="material-symbols-outlined" title="Upload" onClick={importTimeline}>upload</span>
            <span className="material-symbols-outlined" title="Logout" onClick={onLogout}>logout</span>
            <span className="material-symbols-outlined" title="More" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>more_vert
                {isSettingsOpen && (
                    <div className="more-container">
                        <div className="more-item" title="Adjust Layers" onClick={adjustLayers}>
                            <span className="material-symbols-outlined">stacks</span>
                            <p>Adjust Layers</p>
                        </div>
                        <div className="more-item" title="Colorize" onClick={applyColorize}>
                            <span className="material-symbols-outlined">palette</span>
                            <p>Colorize</p>
                        </div>
                        <div className="more-item" title="Settings" onClick={() => setIsDialogOpen(true)}>
                            <span className="material-symbols-outlined">settings</span>
                            <p>Settings</p>
                        </div>
                    </div>
                )}
            </span>
            {isDialogOpen && <SettingsModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />}
        </div>
    )
}

export default Toolbar