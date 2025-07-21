import React, { useMemo } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import { useStageZoom } from '../hooks/useStageControls';

const TimelineAxis = () => {
    const { stageScale, stagePos, cursor, handleDragEnd, handleWheel, handleMouseDown, handleMouseUp } = useStageZoom();

    // Configurações da timeline
    const timelineY = window.innerHeight / 2; // Meio da tela verticalmente
    const yearSpacing = 100; // Espaçamento entre anos em pixels
    const baseYear = 2010; // Ano de referência

    // Calcular quais anos mostrar baseado na posição e zoom atual
    const visibleYears = useMemo(() => {
        const stageWidth = window.innerWidth;

        // Calcular a área visível considerando posição e zoom
        const leftBound = (-stagePos.x) / stageScale;
        const rightBound = (stageWidth - stagePos.x) / stageScale;

        // Calcular quais anos estão visíveis
        const startYear = Math.floor(leftBound / yearSpacing) + baseYear;
        const endYear = Math.ceil(rightBound / yearSpacing) + baseYear;

        // const idealCalculation = Math.floor(5 / stageScale * 4);
        const years = [];
        for (let year = startYear - 5; year <= endYear + 5; year++) {
            years.push(year);
        }

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
                    points={[-10000, timelineY, 10000, timelineY]}
                    stroke="#333"
                    strokeWidth={2}
                />

                {/* Anos e marcadores */}
                {visibleYears.map((year) => {
                    const x = (year - baseYear) * yearSpacing;

                    return (
                        <React.Fragment key={year}>
                            {/* Marcador vertical para cada ano */}
                            <Line
                                points={[x, timelineY - 20, x, timelineY + 20]}
                                stroke="#666"
                                strokeWidth={1}
                            />

                            {/* Texto do ano */}
                            <Text
                                x={x}
                                y={timelineY + 30}
                                text={year.toString()}
                                fontSize={14}
                                fill="#333"
                                align="center"
                                offsetX={15} // Centralizar o texto
                            />

                            {/* Marcadores menores para subdivisões (opcional) */}
                            {Array.from({ length: 9 }, (_, i) => (
                                <Line
                                    key={`${year}-${i}`}
                                    points={[
                                        x + (i + 1) * (yearSpacing / 10),
                                        timelineY - 10,
                                        x + (i + 1) * (yearSpacing / 10),
                                        timelineY + 10
                                    ]}
                                    stroke="#666"
                                    strokeWidth={0.5}
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