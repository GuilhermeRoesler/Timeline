import { Stage, Layer } from "react-konva";
import { useStageZoom } from '../hooks/useStageControls';

const TimelineStage = ({ children }: { children: React.ReactNode }) => {
    const { stageScale, stagePos, cursor, handleDragEnd, handleWheel, handleMouseDown, handleMouseUp } = useStageZoom();
    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            draggable
            onWheel={handleWheel}
            onDragEnd={handleDragEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            scaleX={stageScale}
            scaleY={stageScale}
            x={stagePos.x}
            y={stagePos.y}
            style={{
                backgroundColor: '#f2f2f2',
                cursor: cursor,
            }}
        >
            <Layer>
                {children}
            </Layer>
        </Stage>
    );
};

export default TimelineStage;