import React from "react";
import { Rect, Text } from "react-konva";
import { useStageZoom } from "../hooks/useStageControls";
import { timelineY, baseYear, yearSpacing } from "../constants";
import { type Period } from "../models/period";

const TimelinePeriods = ({ periods }: { periods: Period[] }) => {
    const { stageScale } = useStageZoom();

    return (
        <>
            {periods.map((period, idx) => {
                const xStart = (period.start - baseYear) * yearSpacing;
                const xEnd = (period.end - baseYear) * yearSpacing;
                const width = xEnd - xStart;

                return (
                    <React.Fragment key={idx}>
                        <Rect
                            x={xStart}
                            y={timelineY - 40 / stageScale}
                            width={width}
                            height={80 / stageScale}
                            fill={period.color || "#8ecae6"}
                            opacity={0.7}
                            cornerRadius={12 / stageScale}
                        />
                        <Text
                            x={xStart + 8 / stageScale}
                            y={timelineY - 30 / stageScale}
                            text={period.title}
                            fontSize={18 / stageScale}
                            fill="#222"
                            width={width - 16 / stageScale}
                            align="left"
                        />
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default TimelinePeriods;