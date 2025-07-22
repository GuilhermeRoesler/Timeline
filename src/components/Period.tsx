import { type Period as PeriodType } from "../models/period"
import { Rect, Text } from "react-konva";
import { useStageZoom } from "../hooks/useStageControls";
import { timelineY, baseYear, yearSpacing } from "../constants";

const Period = ({ period }: { period: PeriodType }) => {
    const { stageScale } = useStageZoom();

    const xStart = (period.start - baseYear) * yearSpacing;
    const xEnd = (period.end - baseYear) * yearSpacing;
    const width = xEnd - xStart;

    return (
        <>
            <Rect
                x={xStart}
                y={timelineY - 110 / stageScale}
                width={width}
                height={80 / stageScale}
                fill={period.color || "#8ecae6"}
                opacity={0.7}
                cornerRadius={12 / stageScale}
            />
            <Text
                x={xStart + 8 / stageScale}
                y={timelineY - 90 / stageScale}
                text={period.title}
                fontSize={18 / stageScale}
                fill="#222"
                width={width - 16 / stageScale}
                align="left"
            />
        </>
    )
}

export default Period