import { useState } from 'react';
import { type Period as PeriodType } from '../../types/period';
import { Rect } from 'react-konva';
import { useStageControlsStore } from '../../store/stageControlsStore';
import { useDetailsBalloonStore } from '../../store/detailsBalloonStore';
import { useSidePanelStore } from '../../store/sidePanelStore';
import { TIMELINE_Y, useSettingsStore } from '../../store/settingsStore';

const Period = ({ period }: { period: PeriodType }) => {
    const [hovered, setHovered] = useState(false);
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const setPeriod = useDetailsBalloonStore((state) => state.setPeriod);
    const isSelected = useSidePanelStore((state) => state.editPeriod?.id === period.id);
    const { YEAR_SPACING, BASE_YEAR, PERIOD_HEIGHT, LEVEL_SPACING } = useSettingsStore(
        (state) => state,
    );

    const xStart = (period.start.getYear() - BASE_YEAR) * YEAR_SPACING;
    const xEnd = (period.end.getYear() - BASE_YEAR) * YEAR_SPACING;
    const width = xEnd - xStart;
    const active = hovered || isSelected;

    const y = TIMELINE_Y - (PERIOD_HEIGHT + LEVEL_SPACING) * period.level - 10;

    return (
        <Rect
            x={xStart}
            y={y}
            width={width}
            height={PERIOD_HEIGHT}
            fill={period.color || '#8ecae6'}
            opacity={active ? 0.98 : 0.78}
            cornerRadius={12 / stageScale}
            stroke={isSelected ? '#fff' : hovered ? 'rgba(255,255,255,0.65)' : undefined}
            strokeWidth={(isSelected ? 3 : hovered ? 1.5 : 0) / stageScale}
            shadowEnabled
            shadowColor="rgba(15, 23, 42, 0.3)"
            shadowBlur={(active ? 22 : 8) / stageScale}
            shadowOffsetY={(active ? 8 : 3) / stageScale}
            shadowOpacity={active ? 0.5 : 0.22}
            onMouseEnter={() => {
                setHovered(true);
                document.body.style.cursor = 'pointer';
                if (!useDetailsBalloonStore.getState().pinned) {
                    setPeriod(period);
                }
            }}
            onMouseLeave={() => {
                setHovered(false);
                document.body.style.cursor = 'default';
                if (!useDetailsBalloonStore.getState().pinned) {
                    setPeriod(null);
                }
            }}
            onClick={() => useSidePanelStore.setState({ editPeriod: period })}
        />
    );
};

export default Period;
