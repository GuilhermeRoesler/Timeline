import { useState } from "react"
import TimelineAxis from "./timeline/TimelineAxis"
import Toolbar from "./panels/Toolbar"
import DetailsBalloon from "./DetailsBalloon"
import SidePanel from "./panels/SidePanel"

const Timeline = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

    return (
        <>
            <Toolbar setIsSidePanelOpen={setIsSidePanelOpen} />
            <TimelineAxis />
            <DetailsBalloon />
            <SidePanel isSidePanelOpen={isSidePanelOpen} setIsSidePanelOpen={setIsSidePanelOpen} />
        </>
    )
}

export default Timeline