import { type Period as PeriodType } from "../types/period"
import { Rect } from "react-konva";
import { useStageControlsStore } from "../store/stageControlsStore";
import { useDetailsBalloonStore } from "../store/detailsBalloonStore";
import { TIMELINE_Y, BASE_YEAR, YEAR_SPACING, PERIOD_HEIGHT, LEVEL_SPACING } from "../constants";

const Period = ({ period }: { period: PeriodType }) => {
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const setPeriod = useDetailsBalloonStore((state) => state.setPeriod);

    const xStart = (period.start - BASE_YEAR) * YEAR_SPACING;
    const xEnd = (period.end - BASE_YEAR) * YEAR_SPACING;
    const width = xEnd - xStart;
    const y = TIMELINE_Y - (PERIOD_HEIGHT + LEVEL_SPACING) * (period.level + 1);

    return (
        <>
            <Rect
                x={xStart}
                y={y}
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