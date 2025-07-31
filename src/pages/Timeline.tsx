import InfoCard from "../components/infocard/InfoCard"
import SidePanel from "../components/panels/side panel/SidePanel"
import Toolbar from "../components/panels/toolbar/Toolbar"
import TimelineAxis from "../components/timeline/TimelineAxis"

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