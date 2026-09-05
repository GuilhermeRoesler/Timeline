import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Rect, Line, Circle, Text, Group } from 'react-konva';
import type Konva from 'konva';
import { lightenHex } from '@/utils/colorUtils';

type Size = { width: number; height: number };

const PERIODS = [
    { x: 40, y: 0, w: 220, color: '#8ecae6', label: 'Era Mecânica', dark: true },
    { x: 180, y: -70, w: 240, color: '#219ebc', label: 'Mainframes', dark: false },
    { x: 360, y: 0, w: 180, color: '#ffb703', label: 'Era Pessoal', dark: true },
    { x: 500, y: -85, w: 200, color: '#fb8500', label: 'Internet', dark: false },
    { x: 680, y: 0, w: 210, color: '#e63946', label: 'Mobile & Cloud', dark: false },
] as const;

const EVENTS = [
    { x: 120, color: '#023047' },
    { x: 280, color: '#126782' },
    { x: 430, color: '#ffb703' },
    { x: 580, color: '#fb8500' },
    { x: 760, color: '#e63946' },
] as const;

const YEARS = [
    [80, '1945'],
    [220, '1960'],
    [380, '1975'],
    [540, '1990'],
    [700, '2005'],
    [860, '2020'],
] as const;

/**
 * Self-contained Konva preview for the landing hero — slow pan, no app stores.
 */
const HeroLiveCanvas = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<Konva.Stage>(null);
    const [size, setSize] = useState<Size>({ width: 1200, height: 700 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const update = () => {
            setSize({ width: el.clientWidth, height: el.clientHeight });
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        let frame = 0;
        let raf = 0;
        const tick = () => {
            frame += 1;
            const drift = Math.sin(frame / 360) * 70;
            stage.x(drift - 30);
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [size.width]);

    const axisY = size.height * 0.48;
    const scale = Math.max(0.85, Math.min(1.25, size.width / 1100));
    const offsetX = (size.width - 960 * scale) / 2;

    return (
        <div ref={containerRef} className="absolute inset-0" aria-hidden>
            <Stage
                ref={stageRef}
                width={size.width}
                height={size.height}
                listening={false}
                className="pointer-events-none"
            >
                <Layer x={offsetX} y={0} scaleX={scale} scaleY={scale}>
                    <Line
                        points={[0, axisY / scale, 960, axisY / scale]}
                        stroke="oklch(0.28 0.03 250 / 0.45)"
                        strokeWidth={2.5}
                        lineCap="round"
                    />

                    {YEARS.map(([x, label]) => (
                        <Group key={label} x={x} y={axisY / scale}>
                            <Line
                                points={[0, -10, 0, 10]}
                                stroke="oklch(0.4 0.02 250 / 0.4)"
                                strokeWidth={1.5}
                            />
                            <Text
                                y={22}
                                text={label}
                                fontSize={13}
                                fill="oklch(0.45 0.02 250 / 0.75)"
                                fontFamily="var(--font-sans), system-ui, sans-serif"
                                offsetX={14}
                            />
                        </Group>
                    ))}

                    {PERIODS.map((period, index) => (
                        <Group
                            key={period.label}
                            x={period.x}
                            y={axisY / scale + period.y - 48}
                            opacity={index % 2 === 0 ? 0.92 : 0.88}
                        >
                            <Rect
                                width={period.w}
                                height={48}
                                cornerRadius={12}
                                fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                                fillLinearGradientEndPoint={{ x: 0, y: 48 }}
                                fillLinearGradientColorStops={[
                                    0,
                                    lightenHex(period.color, 0.2),
                                    1,
                                    period.color,
                                ]}
                                shadowColor="rgba(15,23,42,0.25)"
                                shadowBlur={14}
                                shadowOffsetY={6}
                                shadowOpacity={0.35}
                            />
                            <Text
                                x={16}
                                y={15}
                                text={period.label}
                                fontSize={15}
                                fontStyle="bold"
                                fill={period.dark ? 'oklch(0.22 0.03 250 / 0.88)' : '#fff'}
                                fontFamily="var(--font-sans), system-ui, sans-serif"
                            />
                        </Group>
                    ))}

                    {EVENTS.map((event) => (
                        <Circle
                            key={event.x}
                            x={event.x}
                            y={axisY / scale}
                            radius={event.x === 430 ? 11 : 8}
                            fill={event.color}
                            stroke="#fff"
                            strokeWidth={2.5}
                        />
                    ))}

                    <Group x={300} y={axisY / scale + 48}>
                        <Rect
                            width={280}
                            height={132}
                            cornerRadius={16}
                            fill="rgba(255,255,255,0.96)"
                            shadowColor="rgba(15,23,42,0.28)"
                            shadowBlur={28}
                            shadowOffsetY={14}
                            shadowOpacity={0.35}
                        />
                        <Text
                            x={20}
                            y={22}
                            text="Era dos Mainframes"
                            fontSize={17}
                            fontStyle="600"
                            fill="oklch(0.18 0.03 250)"
                            fontFamily="var(--font-heading), Georgia, serif"
                        />
                        <Text
                            x={20}
                            y={48}
                            text="1945 — 1975"
                            fontSize={12}
                            fontStyle="italic"
                            fill="oklch(0.48 0.02 250)"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        />
                        <Text
                            x={20}
                            y={72}
                            text="Computadores de sala e a base"
                            fontSize={11}
                            fill="oklch(0.4 0.02 250)"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        />
                        <Text
                            x={20}
                            y={88}
                            text="da computação moderna."
                            fontSize={11}
                            fill="oklch(0.4 0.02 250)"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        />
                        <Rect
                            x={20}
                            y={108}
                            width={240}
                            height={10}
                            cornerRadius={4}
                            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                            fillLinearGradientEndPoint={{ x: 240, y: 0 }}
                            fillLinearGradientColorStops={[
                                0,
                                '#126782',
                                0.55,
                                '#219ebc',
                                1,
                                '#8ecae6',
                            ]}
                        />
                    </Group>
                </Layer>
            </Stage>
        </div>
    );
};

export default HeroLiveCanvas;
