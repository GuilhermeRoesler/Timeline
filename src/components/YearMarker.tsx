import { Line, Text } from "react-konva"
import { TIMELINE_Y, BASE_YEAR, YEAR_SPACING } from "../constants";
import { useStageControlsStore } from "../store/stageControlsStore";

const YearMarker = ({ year }: { year: number }) => {
    const x = (year - BASE_YEAR) * YEAR_SPACING;
    const stageScale = useStageControlsStore((state) => state.stageScale);

    return (
        <>
            <Line
                points={[
                    x,
                    TIMELINE_Y - (20 / stageScale * .7),
                    x,
                    TIMELINE_Y + (20 / stageScale * .7)]}
                stroke="#666"
                strokeWidth={1 / stageScale * 2}
            />

            <Text
                x={x}
                y={TIMELINE_Y + 25 / stageScale}
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