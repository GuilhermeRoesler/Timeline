import { Line } from "react-konva"
import { timelineY, yearSpacing } from "../constants"

const SubYearMarkerLoader = ({ x, year, i, yearStep, markerStep, stageScale }: { x: number, year: number, i: number, yearStep: number, markerStep: number, stageScale: number }) => {
    return (
        <Line
            key={`${year}-${i}`}
            points={[
                x + (i + 1) * yearSpacing * (yearStep / markerStep),
                timelineY - 10 / stageScale * .8,
                x + (i + 1) * yearSpacing * (yearStep / markerStep),
                timelineY + 10 / stageScale * .8
            ]}
            stroke="#666"
            strokeWidth={0.5 / stageScale}
        />
    )
}

export default SubYearMarkerLoader