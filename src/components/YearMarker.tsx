import { Line, Text } from "react-konva"
import { timelineY, baseYear, yearSpacing } from "../constants";
import { useStageControlsStore } from "../store/stageControlsStore";

const YearMarker = ({ year }: { year: number }) => {
    const x = (year - baseYear) * yearSpacing;
    const stageScale = useStageControlsStore((state) => state.stageScale);

    return (
        <>
            <Line
                points={[
                    x,
                    timelineY - (20 / stageScale * .7),
                    x,
                    timelineY + (20 / stageScale * .7)]}
                stroke="#666"
                strokeWidth={1 / stageScale * 2}
            />

            <Text
                x={x}
                y={timelineY + 25 / stageScale}
                text={year.toString()}
                fontSize={14 / stageScale}
                fill="#333"
                align="center"
                offsetX={16 / stageScale} // Centralizar o texto
                fontStyle={year % 10 === 0 ? 'bold' : 'normal'}
            />
        </>
    )
}

export default YearMarker