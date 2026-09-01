import { useCallback } from 'react';
import type { KonvaEventObject } from 'konva/lib/Node';
import { useStageControlsStore } from '../store/stageControlsStore';

export const useStageZoom = () => {
    const setStageScale = useStageControlsStore((state) => state.setStageScale);
    const setStagePos = useStageControlsStore((state) => state.setStagePos);
    const setCursor = useStageControlsStore((state) => state.setCursor);

    const handleWheel = useCallback(
        (e: KonvaEventObject<WheelEvent>) => {
            e.evt.preventDefault();
            const scaleBy = 1.2;
            const stage = e.target.getStage();
            if (!stage) return;

            const oldScale = stage.scaleX();
            const pointer = stage.getPointerPosition();
            if (!pointer) return;

            const mousePointTo = {
                x: (pointer.x - stage.x()) / oldScale,
                y: (pointer.y - stage.y()) / oldScale,
            };

            const direction = e.evt.deltaY > 0 ? -1 : 1;
            const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

            if (newScale > 0.75 || newScale < 0.007) {
                return;
            }

            const newPos = {
                x: pointer.x - mousePointTo.x * newScale,
                y: pointer.y - mousePointTo.y * newScale,
            };

            setStageScale(newScale);
            setStagePos(newPos);
        },
        [setStageScale, setStagePos],
    );

    const handleDragEnd = useCallback(
        (e: KonvaEventObject<DragEvent>) => {
            const newPos = {
                x: e.target.x(),
                y: e.target.y(),
            };
            setStagePos(newPos);
        },
        [setStagePos],
    );

    const handleMouseDown = useCallback(() => setCursor('grabbing'), [setCursor]);
    const handleMouseUp = useCallback(() => setCursor('grab'), [setCursor]);

    return {
        handleDragEnd,
        handleWheel,
        handleMouseDown,
        handleMouseUp,
    };
};
