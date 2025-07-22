import { useState } from "react"
import TimelineAxis from "./TimelineAxis"
import Toolbar from "./Toolbar"
import SidePanel from "./SidePanel"

const Timeline = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    return (
        <>
            <Toolbar setIsSidePanelOpen={setIsSidePanelOpen} />
            <TimelineAxis />
            <SidePanel isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen} />
        </>
    )
}

export default Timeline