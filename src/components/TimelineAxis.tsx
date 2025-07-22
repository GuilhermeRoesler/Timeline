import { Layer, Line } from 'react-konva';
import { timelineY } from '../constants';

import TimelineStage from './TimelineStage';
import TimelineYears from './TimelineYears';

const TimelineAxis = () => {

    return (
        <TimelineStage>
            <Layer>
                {/* Linha principal da timeline */}
                <Line
                    points={[-10000, timelineY, 10000, timelineY]}
                    stroke="#333"
                    strokeWidth={2}
                />

                {/* Anos e marcadores */}
                <TimelineYears />
            </Layer>
        </TimelineStage>
    );
}

export default TimelineAxis