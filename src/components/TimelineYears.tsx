import React, { useEffect } from 'react';
import { Line } from 'react-konva';
import { useStageControlsStore } from '../store/stageControlsStore';
import { timelineY, baseYear, yearSpacing } from '../constants';
import { getYearStep, getMarkerStep } from '../utils/timelineYearsUtils';

import YearMarker from './YearMarker';
import SubYearMarkerLoader from './SubYearMarkerLoader';

const TimelineYears = () => {
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const stagePos = useStageControlsStore((state) => state.stagePos);
    const visibleYears = useStageControlsStore((state) => state.visibleYears);
    const setVisibleYears = useStageControlsStore((state) => state.setVisibleYears);

    // Calcular quais anos mostrar baseado na posição e zoom atual
    useEffect(() => {
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
        setVisibleYears(years);
    }, [stagePos.x, stageScale]);

    return (
        <>
            {visibleYears.map((year) => {
                const x = (year - baseYear) * yearSpacing;
                const yearStep = getYearStep(stageScale);
                const markerStep = getMarkerStep(yearStep);

                return (
                    <React.Fragment key={year}>
                        <YearMarker year={year} />

                        {/* Marcadores menores para subdivisões (opcional) */}
                        {Array.from({ length: markerStep - 1 }, (_, i) => (
                            <SubYearMarkerLoader
                                key={`${year}-${i}`}
                                x={x}
                                year={year}
                                i={i}
                                yearStep={yearStep}
                                markerStep={markerStep}
                                stageScale={stageScale}
                            />
                        ))}
                    </React.Fragment>
                );
            })}
        </>
    )
}

export default TimelineYears