/**
 * Full-bleed decorative timeline for the landing hero — mirrors product shapes without Konva.
 */
const HeroTimelineVisual = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_60%_45%,oklch(0.72_0.08_185/0.18),transparent_65%),linear-gradient(160deg,oklch(0.97_0.015_200),oklch(0.93_0.02_210)_45%,oklch(0.9_0.03_185/0.5))]" />

            <div className="animate-hero-drift absolute inset-y-[12%] left-[28%] w-[100%] sm:inset-y-[16%] sm:left-[36%] lg:left-[42%]">
                <svg
                    viewBox="0 0 1200 420"
                    className="h-full w-full"
                    preserveAspectRatio="xMinYMid slice"
                >
                    <line
                        x1="0"
                        y1="210"
                        x2="1200"
                        y2="210"
                        stroke="oklch(0.28 0.03 250 / 0.55)"
                        strokeWidth="2.5"
                    />
                    {[120, 240, 360, 480, 600, 720, 840, 960, 1080].map((x) => (
                        <g key={x}>
                            <line
                                x1={x}
                                y1="198"
                                x2={x}
                                y2="222"
                                stroke="oklch(0.4 0.02 250 / 0.45)"
                                strokeWidth="1.5"
                            />
                        </g>
                    ))}

                    <rect
                        x="80"
                        y="108"
                        width="340"
                        height="52"
                        rx="14"
                        fill="#8ecae6"
                        opacity="0.85"
                        className="animate-hero-pulse"
                    />
                    <rect
                        x="300"
                        y="48"
                        width="280"
                        height="52"
                        rx="14"
                        fill="#219ebc"
                        opacity="0.9"
                    />
                    <rect
                        x="520"
                        y="108"
                        width="220"
                        height="52"
                        rx="14"
                        fill="#ffb703"
                        opacity="0.88"
                    />
                    <rect
                        x="680"
                        y="28"
                        width="260"
                        height="52"
                        rx="14"
                        fill="#fb8500"
                        opacity="0.88"
                    />
                    <rect
                        x="880"
                        y="108"
                        width="240"
                        height="52"
                        rx="14"
                        fill="#e63946"
                        opacity="0.85"
                        className="animate-hero-pulse"
                        style={{ animationDelay: '1.2s' }}
                    />

                    {[200, 420, 610, 780, 980].map((x, i) => (
                        <circle
                            key={x}
                            cx={x}
                            cy="210"
                            r={i === 2 ? 11 : 8}
                            fill={['#023047', '#126782', '#ffb703', '#fb8500', '#e63946'][i]}
                            stroke="#fff"
                            strokeWidth="2"
                        />
                    ))}

                    <g className="animate-hero-pulse" style={{ animationDelay: '0.6s' }}>
                        <rect
                            x="430"
                            y="250"
                            width="260"
                            height="150"
                            rx="16"
                            fill="white"
                            opacity="0.95"
                            filter="url(#cardShadow)"
                        />
                        <rect
                            x="448"
                            y="268"
                            width="140"
                            height="12"
                            rx="4"
                            fill="oklch(0.28 0.03 250)"
                        />
                        <rect
                            x="448"
                            y="290"
                            width="90"
                            height="8"
                            rx="3"
                            fill="oklch(0.55 0.02 250)"
                        />
                        <rect
                            x="448"
                            y="312"
                            width="224"
                            height="6"
                            rx="2"
                            fill="oklch(0.85 0.01 210)"
                        />
                        <rect
                            x="448"
                            y="326"
                            width="200"
                            height="6"
                            rx="2"
                            fill="oklch(0.85 0.01 210)"
                        />
                        <rect
                            x="448"
                            y="348"
                            width="224"
                            height="36"
                            rx="6"
                            fill="oklch(0.9 0.02 185)"
                        />
                    </g>

                    <defs>
                        <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow
                                dx="0"
                                dy="12"
                                stdDeviation="16"
                                floodColor="oklch(0.2 0.03 250)"
                                floodOpacity="0.18"
                            />
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background from-25% via-background/85 via-45% to-transparent to-75%" />
        </div>
    );
};

export default HeroTimelineVisual;
