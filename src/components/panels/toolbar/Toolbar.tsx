import { useState } from "react"
import { useSidePanelStore } from "../../../store/sidePanelStore"
import { colorize } from "../../../utils/colorUtils"
import { usePeriodsStore } from "../../../store/periodsStore"
import { adjustLayer } from "../../../utils/levelUtils"
import SettingsModal from "./SettingsModal"
import { LogOut, MoreVertical, Layers, Palette, Settings } from "lucide-react"

const Toolbar = ({ onLogout }: { onLogout: () => void }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleOpen = () => {
        useSidePanelStore.setState({ imageSelectedType: "search", isSidePanelOpen: true, editPeriod: null, editEvent: null });
    }

    const adjustLayers = () => {
        const adjustedLayers = adjustLayer();
        usePeriodsStore.getState().setPeriods(adjustedLayers);
    }

    const applyColorize = async () => {
        await colorize();
    }

    return (
        <div className="toolbar">
            <span style={{ fontWeight: "bold", fontSize: 24, color: "#333" }}>Timeline</span>
            <button onClick={handleOpen}>Criar</button>
            {/* <button className="p-2 bg-transparent hover:bg-gray-100" title="Download" onClick={exportTimeline}><Download className="w-6 h-6 text-gray-700" /></button>
            <button className="p-2 bg-transparent hover:bg-gray-100" title="Upload" onClick={importTimeline}><Upload className="w-6 h-6 text-gray-700" /></button> */}
            <button className="p-2 bg-transparent hover:bg-gray-100" title="Logout" onClick={onLogout}><LogOut className="w-6 h-6 text-gray-700" /></button>
            <div className="relative">
                <button className="p-2 bg-transparent hover:bg-gray-100" title="More" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                    <MoreVertical className="w-6 h-6 text-gray-700" />
                </button>
                {isSettingsOpen && (
                    <div className="more-container">
                        <div className="more-item" title="Adjust Layers" onClick={adjustLayers}>
                            <Layers />
                            <p>Adjust Layers</p>
                        </div>
                        <div className="more-item" title="Colorize" onClick={applyColorize}>
                            <Palette />
                            <p>Colorize</p>
                        </div>
                        <div className="more-item" title="Settings" onClick={() => setIsDialogOpen(true)}>
                            <Settings />
                            <p>Settings</p>
                        </div>
                    </div>
                )}
            </div>
            {isDialogOpen && <SettingsModal isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />}
        </div>
    )
}

export default Toolbar