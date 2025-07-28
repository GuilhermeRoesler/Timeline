import TimelineAxis from "./timeline/TimelineAxis"
import Toolbar from "./panels/Toolbar"
import InfoCard from "./InfoCard"
import SidePanel from "./panels/SidePanel"

const Timeline = () => {

    return (
        <>
            <Toolbar />
            <TimelineAxis />
            <InfoCard />
            <SidePanel />
        </>
    )
}

export default Timeline