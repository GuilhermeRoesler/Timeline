import { useEffect } from "react";
import { useDetailsBalloonStore } from "../store/detailsBalloonStore"
import { useStageControlsStore } from "../store/stageControlsStore";
import { timelineY, baseYear, yearSpacing } from "../constants";

const DetailsBalloon = () => {
    // const [isHovered, setIsHovered] = useState(false)
    const event = useDetailsBalloonStore((state) => state.event);
    const period = useDetailsBalloonStore((state) => state.period);
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const stagePos = useStageControlsStore((state) => state.stagePos);

    useEffect(() => {
        if (event) {
            console.log(stagePos.y + timelineY)
            console.log((timelineY + stagePos.y) * stageScale)
        }
    }, [event]);

    if (event) return (
        <div className="details-balloon"
            style={{
                left: `${(((event.year) - baseYear) * yearSpacing + stagePos.x / stageScale + 20) * stageScale}px`,
                top: `${(timelineY + stagePos.y / stageScale) * stageScale - 140}px`,
                translate: '0 -50%',
            }}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
        </div>
    )

    if (period) return (
        <div className="details-balloon"
            style={{
                left: `${((period.end - baseYear) * yearSpacing + stagePos.x / stageScale) * stageScale}px`,
                top: `${(timelineY + stagePos.y / stageScale) * stageScale - 140}px`,
                translate: `0 calc(-50% - 110px * ${stageScale})`,
            }}>
            <h3>{period.title}</h3>
            <p>{period.description}</p>
        </div>
    )
}

export default DetailsBalloon