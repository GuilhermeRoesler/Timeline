import { Line } from 'react-konva';
import { useStageControlsStore } from '../../store/stageControlsStore';
import { TIMELINE_Y } from '../../store/settingsStore';

const TimelineMainLine = () => {
    const { stageScale, stagePos } = useStageControlsStore((state) => state);

    return (
        <Line
            points={[
                -10000 / stageScale - stagePos.x / stageScale,
                TIMELINE_Y,
                10000 / stageScale - stagePos.x / stageScale,
                TIMELINE_Y,
            ]}
            stroke="#1e293b"
            strokeWidth={(2.5 / stageScale) * 2}
            opacity={0.85}
        />
    );
};

export default TimelineMainLine;
