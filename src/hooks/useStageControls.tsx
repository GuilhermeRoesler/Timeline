import { useState, useCallback } from "react";

export const useStageZoom = () => {
    const [stageScale, setStageScale] = useState(.75);
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
    const [cursor, setCursor] = useState('grab');

    const handleWheel = (e: any) => {
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

        if (newScale > .75) {
            return;
        }

        const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
        };

        setStageScale(newScale);
        setStagePos(newPos);
    };

    const handleDragEnd = (e: any) => {
        const newPos = {
            x: e.target.x(),
            y: e.target.y()
        };
        setStagePos(newPos);
    }

    const handleMouseDown = useCallback(() => setCursor('grabbing'), []);
    const handleMouseUp = useCallback(() => setCursor('grab'), []);

    return { stageScale, stagePos, cursor, handleDragEnd, handleWheel, handleMouseDown, handleMouseUp };
}

