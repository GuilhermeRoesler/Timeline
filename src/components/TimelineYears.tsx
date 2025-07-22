import React from 'react';
import { Line, Text } from 'react-konva';
import { useStageZoom } from '../hooks/useStageControls';
import { timelineY, baseYear, yearSpacing } from '../constants';

const TimelineYears = () => {
    const { visibleYears } = useStageZoom();

    return (
        <>
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
                            offsetX={16} // Centralizar o texto
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
        </>
    )
}

export default TimelineYears