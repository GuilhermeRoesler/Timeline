import { Stage } from "react-konva"
import { useStageZoom } from '../hooks/useStageControls';

const TimelineStage = ({ children }: any) => {
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
            {children}
        </Stage>
    )
}

export default TimelineStage