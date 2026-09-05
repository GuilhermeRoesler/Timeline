import { Stage, Layer } from 'react-konva';
import { useStageZoom } from '../../hooks/useStageControls';
import { useStageControlsStore } from '../../store/stageControlsStore';
import { useEffect } from 'react';

const TimelineStage = ({ children }: { children: React.ReactNode }) => {
    const { stageScale, stagePos, cursor, setStagePos, setStageScale } = useStageControlsStore(
        (state) => state,
    );
    const { handleDragEnd, handleWheel, handleMouseDown, handleMouseUp } = useStageZoom();

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const prevStagePos = useStageControlsStore.getState().stagePos;
            const prevStageScale = useStageControlsStore.getState().stageScale;

            const newPos = { ...prevStagePos };
            let newScale = prevStageScale;
            switch (event.key) {
                case 'ArrowUp':
                    newPos.y -= 10;
                    break;
                case 'ArrowDown':
                    newPos.y += 10;
                    break;
                case 'ArrowLeft':
                    newPos.x -= 10;
                    break;
                case 'ArrowRight':
                    newPos.x += 10;
                    break;
                case '+':
                    event.preventDefault();
                    newScale = newScale * 1.1;
                    break;
                case '-':
                    event.preventDefault();
                    newScale = newScale / 1.1;
                    break;
                default:
                    return;
            }
            if (!(newScale > 0.75 || newScale < 0.007)) setStageScale(newScale);
            setStagePos(newPos);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setStagePos, setStageScale]);

    return (
        <div className="timeline-canvas-surface">
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
                    backgroundColor: 'transparent',
                    cursor: cursor,
                }}
            >
                <Layer>{children}</Layer>
            </Stage>
        </div>
    );
};

export default TimelineStage;
