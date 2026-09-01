import React, { useEffect } from 'react';
import { useStageControlsStore } from '../../store/stageControlsStore';
import { getYearStep, getMarkerStep } from '../../utils/timelineYearsUtils';
import { useSettingsStore } from '../../store/settingsStore';

import YearMarker from './YearMarker';
import SubYearMarkerLoader from './SubYearMarkerLoader';

const TimelineYears = () => {
    const { stageScale, stagePos, visibleYears, setVisibleYears } = useStageControlsStore((state) => state);
    const { BASE_YEAR, YEAR_SPACING } = useSettingsStore((state) => state);

    // Calcular quais anos mostrar baseado na posição e zoom atual
    useEffect(() => {
        const stageWidth = window.innerWidth;

        // Calcular a área visível considerando posição e zoom
        const leftBound = (-stagePos.x) / stageScale;
        const rightBound = (stageWidth - stagePos.x) / stageScale;

        // Calcular quais anos estão visíveis
        const startYear = Math.floor(leftBound / YEAR_SPACING) + BASE_YEAR;
        const endYear = Math.ceil(rightBound / YEAR_SPACING) + BASE_YEAR;

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
                const x = (year - BASE_YEAR) * YEAR_SPACING;
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