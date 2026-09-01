import { Line } from "react-konva"
import { TIMELINE_Y, useSettingsStore } from "../../store/settingsStore"

const SubYearMarkerLoader = ({ x, year, i, yearStep, markerStep, stageScale }: { x: number, year: number, i: number, yearStep: number, markerStep: number, stageScale: number }) => {
    const { YEAR_SPACING } = useSettingsStore((state) => state);

    return (
        <Line
            key={`${year}-${i}`}
            points={[
                x + (i + 1) * YEAR_SPACING * (yearStep / markerStep),
                TIMELINE_Y - 10 / stageScale * .8,
                x + (i + 1) * YEAR_SPACING * (yearStep / markerStep),
                TIMELINE_Y + 10 / stageScale * .8
            ]}
            stroke="#666"
            strokeWidth={0.5 / stageScale}
        />
    )
}

export default SubYearMarkerLoader