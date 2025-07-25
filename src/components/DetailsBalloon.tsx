import { useState, useEffect } from "react";
import { useDetailsBalloonStore } from "../store/detailsBalloonStore"
import { useStageControlsStore } from "../store/stageControlsStore";
import { timelineY, baseYear, yearSpacing } from "../constants";
import { type Event } from "../types/event";
import { type Period } from "../types/period";

const DetailsBalloon = () => {
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const stagePos = useStageControlsStore((state) => state.stagePos);
    const event = useDetailsBalloonStore((state) => state.event);
    const period = useDetailsBalloonStore((state) => state.period);
    const [localEvent, setLocalEvent] = useState<Event | null>(null);
    const [localPeriod, setLocalPeriod] = useState<Period | null>(null);
    const [isHovered, setIsHovered] = useState(false)
    const [animation, setAnimation] = useState('');

    useEffect(() => {
        if (event) {
            setLocalEvent(event);
            setAnimation('detailsBalloonFadeIn 0.3s ease-in-out');
            setLocalPeriod(null);
        }
        if (period) {
            setLocalPeriod(period);
            setAnimation('detailsBalloonFadeIn 0.3s ease-in-out');
            setLocalEvent(null);
        }
    }, [event, period]);

    useEffect(() => {
        if (!isHovered && !(event || period)) {
            setAnimation('detailsBalloonFadeOut 0.3s ease-in-out');
            setTimeout(() => {
                setLocalEvent(null);
                setLocalPeriod(null);
            }, 300);
        }
    }, [event, period, isHovered]);

    if (localEvent) return (
        <div className="details-balloon"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                left: `${(((localEvent.year) - baseYear) * yearSpacing + stagePos.x / stageScale + 10) * stageScale}px`,
                top: `${(timelineY + stagePos.y / stageScale) * stageScale - 130}px`,
                translate: '0 -50%',
                animation: animation,
            }}>
            <h3>{localEvent.title}</h3>
            <p>{localEvent.description}</p>
        </div>
    )

    if (localPeriod) return (
        <div className="details-balloon"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                left: `${((localPeriod.end - baseYear) * yearSpacing + stagePos.x / stageScale) * stageScale}px`,
                top: `${(timelineY + stagePos.y / stageScale) * stageScale - 120}px`,
                translate: `-20px calc(-50% - 100px * ${stageScale})`,
                animation: animation,
            }}>
            <h3>{localPeriod.title}</h3>
            <p>{localPeriod.description}</p>
        </div>
    )
}

export default DetailsBalloon