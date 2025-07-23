import React, { useMemo } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import { useStageZoom } from '../hooks/useStageControls';
import PeriodsLoader from './PeriodsLoader';
import EventsLoader from './EventsLoader';
import { timelineY, baseYear, yearSpacing } from '../constants';

const TimelineAxis = () => {
    const { stageScale, stagePos, cursor, handleDragEnd, handleWheel, handleMouseDown, handleMouseUp } = useStageZoom();

    function getYearStep(scale: number) {
        if (scale >= .6) return 1;
        if (scale >= .4) return 2;
        if (scale >= .15) return 5;
        if (scale >= .08) return 10;
        if (scale >= .04) return 20;
        if (scale >= .03) return 25;
        if (scale >= .016) return 50;
        if (scale >= .007) return 100;
        if (scale >= .003) return 200;
        if (scale >= .0015) return 500;
        if (scale >= 0) return 1000;
        return 1;
    }

    function getMarkerStep(yearStep: number) {
        if (yearStep <= 10) return yearStep;
        if (yearStep === 20) return 10;
        if (yearStep === 25) return 5;
        if (yearStep === 50) return 5;
        if (yearStep === 100) return 10;
        return 1;
    }

    // Calcular quais anos mostrar baseado na posição e zoom atual
    const visibleYears = useMemo(() => {
        const stageWidth = window.innerWidth;

        // Calcular a área visível considerando posição e zoom
        const leftBound = (-stagePos.x) / stageScale;
        const rightBound = (stageWidth - stagePos.x) / stageScale;

        // Calcular quais anos estão visíveis
        const startYear = Math.floor(leftBound / yearSpacing) + baseYear;
        const endYear = Math.ceil(rightBound / yearSpacing) + baseYear;

        const yearStep = getYearStep(stageScale);

        // Gera anos visíveis com o step dinâmico
        const years = [];
        // Ajusta para o múltiplo mais próximo do step
        let firstYear = startYear - 5 - ((startYear - 5) % yearStep);
        let lastYear = endYear + 5;

        // let firstYear2 = startYear - (Math.floor(5 / stageScale * 4) - (Math.floor(5 / stageScale * 4)) % 10) - ((startYear - 5) % yearStep);
        // let lastYear2 = endYear + (Math.floor(5 / stageScale * 4) - (Math.floor(5 / stageScale * 4)) % getYearStep(stageScale));

        for (let year = firstYear; year <= lastYear; year += yearStep) {
            years.push(year);
        }

        // console.log(yearSpacing / getYearStep(stageScale) * getYearStep(stageScale));

        return years;
    }, [stagePos.x, stageScale]);

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
                {/* Linha principal da timeline */}
                <Line
                    points={[-10000 / stageScale - stagePos.x / stageScale, timelineY, 10000 / stageScale - stagePos.x / stageScale, timelineY]}
                    stroke="#333"
                    strokeWidth={2 / stageScale * 2}
                />

                <PeriodsLoader />
                <EventsLoader />

                {/* Anos e marcadores */}
                {visibleYears.map((year) => {
                    const x = (year - baseYear) * yearSpacing;

                    return (
                        <React.Fragment key={year}>
                            {/* Marcador vertical para cada ano */}
                            <Line
                                points={[x, timelineY - (20 / stageScale * .7), x, timelineY + (20 / stageScale * .7)]}
                                stroke="#666"
                                strokeWidth={1 / stageScale * 2}
                            />

                            {/* Texto do ano */}
                            <Text
                                x={x}
                                y={timelineY + 25 / stageScale}
                                text={year.toString()}
                                fontSize={14 / stageScale}
                                fill="#333"
                                align="center"
                                offsetX={16 / stageScale} // Centralizar o texto
                                fontStyle={year % 10 === 0 ? 'bold' : 'normal'}
                            />

                            {/* Marcadores menores para subdivisões (opcional) */}
                            {Array.from({ length: getMarkerStep(getYearStep(stageScale)) - 1 }, (_, i) => (
                                <Line
                                    key={`${year}-${i}`}
                                    points={[
                                        x + (i + 1) * yearSpacing * (getYearStep(stageScale) / getMarkerStep(getYearStep(stageScale))),
                                        timelineY - 10 / stageScale * .8,
                                        x + (i + 1) * yearSpacing * (getYearStep(stageScale) / getMarkerStep(getYearStep(stageScale))),
                                        timelineY + 10 / stageScale * .8
                                    ]}
                                    // stroke="red"
                                    stroke="#666"
                                    strokeWidth={0.5 / stageScale}
                                />
                            ))}
                        </React.Fragment>
                    );
                })}
            </Layer>
        </Stage>
    );
}

export default TimelineAxis