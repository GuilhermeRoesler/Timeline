import { type Period as PeriodType } from "../../types/period"
import { Rect } from "react-konva";
import { useStageControlsStore } from "../../store/stageControlsStore";
import { useDetailsBalloonStore } from "../../store/detailsBalloonStore";
import { useSidePanelStore } from "../../store/sidePanelStore";
import { TIMELINE_Y, useSettingsStore } from "../../store/settingsStore";

const Period = ({ period }: { period: PeriodType }) => {
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const setPeriod = useDetailsBalloonStore((state) => state.setPeriod);
    const { YEAR_SPACING, BASE_YEAR, PERIOD_HEIGHT, LEVEL_SPACING } = useSettingsStore((state) => state);

    const xStart = (period.start.getYear() - BASE_YEAR) * YEAR_SPACING;
    const xEnd = (period.end.getYear() - BASE_YEAR) * YEAR_SPACING;
    const width = xEnd - xStart;

    const y = TIMELINE_Y - (PERIOD_HEIGHT + LEVEL_SPACING) * period.level - 10


    return (
        <>
            <Rect
                x={xStart}
                y={y}
                width={width}
                height={PERIOD_HEIGHT}
                fill={period.color || "#8ecae6"}
                opacity={0.7}
                cornerRadius={12 / stageScale}
                onMouseEnter={() => setPeriod(period)}
                onMouseLeave={() => setPeriod(null)}
                onClick={() => useSidePanelStore.setState({ editPeriod: period })} // Abre o painel de edição(period)}
            />
        </>
    )
}

export default Period