import { Line } from 'react-konva';
import { useStageControlsStore } from '../store/stageControlsStore';
import { timelineY } from '../constants';

const TimelineMainLine = () => {
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const stagePos = useStageControlsStore((state) => state.stagePos);

    return (
        <Line
            points={[
                -10000 / stageScale - stagePos.x / stageScale,
                timelineY,
                10000 / stageScale - stagePos.x / stageScale,
                timelineY]}
            stroke="#333"
            strokeWidth={2 / stageScale * 2}
        />
    )
}

export default TimelineMainLine