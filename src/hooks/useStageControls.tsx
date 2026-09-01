import { useCallback } from "react";
import { useStageControlsStore } from "../store/stageControlsStore";

export const useStageZoom = () => {
    const setStageScale = useStageControlsStore((state) => state.setStageScale);
    const setStagePos = useStageControlsStore((state) => state.setStagePos);
    const setCursor = useStageControlsStore((state) => state.setCursor);

    const handleWheel = useCallback((e: any) => {
        e.evt.preventDefault();
        const scaleBy = 1.2;
        const stage = e.target.getStage();
        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();

        const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
        };

        const direction = e.evt.deltaY > 0 ? -1 : 1;
        const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

        if (newScale > .75 || newScale < .007) {
            return;
        }

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        setStageScale(newScale);
        setStagePos(newPos);
    }, []);

    const handleDragEnd = useCallback((e: any) => {
        const newPos = {
            x: e.target.x(),
            y: e.target.y()
        };
        setStagePos(newPos);
    }, []);

    const handleMouseDown = useCallback(() => setCursor('grabbing'), []);
    const handleMouseUp = useCallback(() => setCursor('grab'), []);

    return {
        handleDragEnd,
        handleWheel,
        handleMouseDown,
        handleMouseUp
    };
}
