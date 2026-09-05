import { useEffect, useRef, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import Konva from 'konva';
import { type Period as PeriodType } from '../../types/period';
import { useStageControlsStore } from '../../store/stageControlsStore';
import { useDetailsBalloonStore } from '../../store/detailsBalloonStore';
import { useSidePanelStore } from '../../store/sidePanelStore';
import { TIMELINE_Y, useSettingsStore } from '../../store/settingsStore';
import { darkenHex, lightenHex } from '../../utils/colorUtils';

type PeriodProps = {
    period: PeriodType;
    entranceIndex?: number;
};

const Period = ({ period, entranceIndex = 0 }: PeriodProps) => {
    const [hovered, setHovered] = useState(false);
    const groupRef = useRef<Konva.Group>(null);
    const enteredRef = useRef(false);
    const stageScale = useStageControlsStore((state) => state.stageScale);
    const setPeriod = useDetailsBalloonStore((state) => state.setPeriod);
    const focusedPeriod = useDetailsBalloonStore((state) => state.period);
    const pinned = useDetailsBalloonStore((state) => state.pinned);
    const isSelected = useSidePanelStore((state) => state.editPeriod?.id === period.id);
    const { YEAR_SPACING, BASE_YEAR, PERIOD_HEIGHT, LEVEL_SPACING } = useSettingsStore(
        (state) => state,
    );

    const xStart = (period.start.getYear() - BASE_YEAR) * YEAR_SPACING;
    const xEnd = (period.end.getYear() - BASE_YEAR) * YEAR_SPACING;
    const width = Math.max(xEnd - xStart, 4);
    const y = TIMELINE_Y - (PERIOD_HEIGHT + LEVEL_SPACING) * period.level - 10;
    const active = hovered || isSelected;
    const dimmed =
        !pinned && focusedPeriod !== null && focusedPeriod.id !== period.id && !isSelected;
    const baseColor = period.color || '#8ecae6';
    const topColor = lightenHex(baseColor, active ? 0.28 : 0.18);
    const bottomColor = darkenHex(baseColor, active ? 0.06 : 0.12);
    const showLabel = width * stageScale > 88;
    const fontSize = Math.max(11, Math.min(16, 14 / stageScale));
    const corner = 12 / stageScale;

    useEffect(() => {
        const node = groupRef.current;
        if (!node || enteredRef.current) return;
        enteredRef.current = true;

        node.opacity(0);
        node.offsetY(16);
        node.to({
            opacity: 1,
            offsetY: 0,
            duration: 0.55,
            delay: Math.min(entranceIndex, 12) * 0.07,
            easing: Konva.Easings.EaseOut,
        });
    }, [entranceIndex]);

    return (
        <Group
            ref={groupRef}
            x={xStart}
            y={y}
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
        >
            <Rect
                width={width}
                height={PERIOD_HEIGHT}
                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                fillLinearGradientEndPoint={{ x: 0, y: PERIOD_HEIGHT }}
                fillLinearGradientColorStops={[0, topColor, 1, bottomColor]}
                opacity={dimmed ? 0.32 : active ? 0.98 : 0.86}
                cornerRadius={corner}
                stroke={
                    isSelected
                        ? '#fff'
                        : hovered
                          ? 'rgba(255,255,255,0.75)'
                          : 'rgba(255,255,255,0.22)'
                }
                strokeWidth={(isSelected ? 3 : hovered ? 1.75 : 1) / stageScale}
                shadowEnabled
                shadowColor="rgba(15, 23, 42, 0.35)"
                shadowBlur={(active ? 26 : dimmed ? 4 : 10) / stageScale}
                shadowOffsetY={(active ? 10 : 3) / stageScale}
                shadowOpacity={active ? 0.55 : dimmed ? 0.1 : 0.28}
            />
            {showLabel && (
                <Text
                    text={period.title}
                    x={14 / stageScale}
                    y={(PERIOD_HEIGHT - fontSize) / 2}
                    width={width - 28 / stageScale}
                    fontSize={fontSize}
                    fontFamily="var(--font-sans), system-ui, sans-serif"
                    fontStyle="bold"
                    fill={getLabelFill(bottomColor)}
                    ellipsis
                    wrap="none"
                    listening={false}
                />
            )}
        </Group>
    );
};

const getLabelFill = (hex: string): string => {
    const cleaned = hex.replace('#', '');
    const full =
        cleaned.length === 3
            ? cleaned
                  .split('')
                  .map((c) => c + c)
                  .join('')
            : cleaned;
    const r = parseInt(full.substring(0, 2), 16);
    const g = parseInt(full.substring(2, 4), 16);
    const b = parseInt(full.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.55 ? 'rgba(15, 23, 42, 0.88)' : 'rgba(255, 255, 255, 0.95)';
};

export default Period;
