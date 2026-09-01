import { Stage, Layer } from "react-konva";
import { useStageZoom } from '../hooks/useStageControls';
import { useStageControlsStore } from '../store/stageControlsStore';

const TimelineStage = ({ children }: { children: React.ReactNode }) => {
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const stagePos = useStageControlsStore((state) => state.stagePos);
    const cursor = useStageControlsStore((state) => state.cursor);

    const { handleDragEnd, handleWheel, handleMouseDown, handleMouseUp } = useStageZoom();

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