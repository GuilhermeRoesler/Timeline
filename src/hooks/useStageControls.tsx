import { useState, useCallback, useEffect } from "react";
import { baseYear, yearSpacing } from '../constants';

export const useStageZoom = () => {
    const [stageScale, setStageScale] = useState(.75);
    const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
    const [cursor, setCursor] = useState('grab');
    const [visibleYears, setVisibleYears] = useState<number[]>([]);

    // Função para calcular anos visíveis
    const calculateVisibleYears = useCallback(() => {
        const stageWidth = window.innerWidth;
        const leftBound = (-stagePos.x) / stageScale;
        const rightBound = (stageWidth - stagePos.x) / stageScale;

        const startYear = Math.floor(leftBound / yearSpacing) + baseYear;
        const endYear = Math.ceil(rightBound / yearSpacing) + baseYear;

        const years = [];
        for (let year = startYear - 5; year <= endYear + 5; year++) {
            years.push(year);
        }

        return years;
    }, [stagePos.x, stageScale]);

    // Atualizar anos visíveis quando posição ou zoom mudarem
    useEffect(() => {
        const newVisibleYears = calculateVisibleYears();
        setVisibleYears(newVisibleYears);
    }, [calculateVisibleYears]);

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
        stageScale,
        stagePos,
        cursor,
        visibleYears,
        handleDragEnd,
        handleWheel,
        handleMouseDown,
        handleMouseUp
    };
}
