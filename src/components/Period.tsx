import { type Period as PeriodType } from "../types/period"
import { Rect } from "react-konva";
import { useStageControlsStore } from "../store/stageControlsStore";
import { useDetailsBalloonStore } from "../store/detailsBalloonStore";
import { timelineY, baseYear, yearSpacing } from "../constants";

const Period = ({ period }: { period: PeriodType }) => {
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const setPeriod = useDetailsBalloonStore((state) => state.setPeriod);

    const xStart = (period.start - baseYear) * yearSpacing;
    const xEnd = (period.end - baseYear) * yearSpacing;
    const width = xEnd - xStart;

    return (
        <>
            <Rect
                x={xStart}
                y={timelineY - 110}
                width={width}
                height={80}
                fill={period.color || "#8ecae6"}
                opacity={0.7}
                cornerRadius={12 / stageScale}
                onMouseEnter={() => setPeriod(period)}
                onMouseLeave={() => setPeriod(null)}
            />
            {/* <Text
                x={xStart + 8 / stageScale}
                y={timelineY - 90}
                text={period.title}
                fontSize={18}
                fill="#222"
                width={width - 16}
                align="left"
            /> */}
        </>
    )
}

export default Period