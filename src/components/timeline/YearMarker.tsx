import { Line, Text } from "react-konva"
import { useStageControlsStore } from "../../store/stageControlsStore";
import { TIMELINE_Y, useSettingsStore } from "../../store/settingsStore";

const YearMarker = ({ year }: { year: number }) => {
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const { BASE_YEAR, YEAR_SPACING } = useSettingsStore((state) => state);
    const x = (year - BASE_YEAR) * YEAR_SPACING;

    let offsetX = 16 / stageScale;
    switch (year.toString().length) {
        case 3:
            offsetX = 11 / stageScale;
            break;
        case 2:
            offsetX = 7 / stageScale;
            break;
        case 1:
            offsetX = 4 / stageScale;
            break;
    }

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
                offsetX={offsetX} // Centralizar o texto
                fontStyle={year % 10 === 0 ? 'bold' : 'normal'}
            />
        </>
    )
}

export default YearMarker