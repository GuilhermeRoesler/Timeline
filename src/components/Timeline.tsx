import TimelineAxis from "./timeline/TimelineAxis"
import Toolbar from "./panels/Toolbar"
import DetailsBalloon from "./DetailsBalloon"
import SidePanel from "./panels/SidePanel"

const Timeline = () => {

    return (
        <>
            <Toolbar />
            <TimelineAxis />
            <DetailsBalloon />
            <SidePanel />
        </>
    )
}

export default Timeline