/**
 * Full-bleed product-shot for the landing hero — mirrors real timeline shapes with labels.
 */
const HeroTimelineVisual = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_60%_45%,oklch(0.72_0.08_185/0.18),transparent_65%),linear-gradient(160deg,oklch(0.97_0.015_200),oklch(0.93_0.02_210)_45%,oklch(0.9_0.03_185/0.5))]" />

            <div className="animate-hero-drift absolute inset-y-[14%] -left-[6%] w-[118%] sm:inset-y-[18%]">
                <svg
                    viewBox="0 0 1200 440"
                    className="h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                >
                    <defs>
                        <filter id="cardShadow" x="-25%" y="-25%" width="150%" height="150%">
                            <feDropShadow
                                dx="0"
                                dy="14"
                                stdDeviation="18"
                                floodColor="oklch(0.2 0.03 250)"
                                floodOpacity="0.2"
                            />
                        </filter>
                        <linearGradient id="cardImage" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#126782" />
                            <stop offset="55%" stopColor="#219ebc" />
                            <stop offset="100%" stopColor="#8ecae6" />
                        </linearGradient>
                    </defs>

                    <line
                        x1="40"
                        y1="220"
                        x2="1160"
                        y2="220"
                        stroke="oklch(0.28 0.03 250 / 0.5)"
                        strokeWidth="2.5"
                    />

                    {(
                        [
                            [140, '1945'],
                            [320, '1960'],
                            [500, '1975'],
                            [700, '1990'],
                            [900, '2005'],
                            [1060, '2020'],
                        ] as const
                    ).map(([x, label]) => (
                        <g key={label}>
                            <line
                                x1={x}
                                y1="208"
                                x2={x}
                                y2="232"
                                stroke="oklch(0.4 0.02 250 / 0.4)"
                                strokeWidth="1.5"
                            />
                            <text
                                x={x}
                                y="258"
                                textAnchor="middle"
                                fill="oklch(0.45 0.02 250 / 0.75)"
                                fontSize="13"
                                fontFamily="var(--font-sans), system-ui, sans-serif"
                            >
                                {label}
                            </text>
                        </g>
                    ))}

                    <g className="animate-hero-pulse">
                        <rect
                            x="70"
                            y="118"
                            width="300"
                            height="48"
                            rx="12"
                            fill="#8ecae6"
                            opacity="0.88"
                        />
                        <text
                            x="90"
                            y="148"
                            fill="oklch(0.22 0.03 250 / 0.85)"
                            fontSize="15"
                            fontWeight="600"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            Era Mecânica
                        </text>
                    </g>

                    <g>
                        <rect
                            x="280"
                            y="52"
                            width="300"
                            height="48"
                            rx="12"
                            fill="#219ebc"
                            opacity="0.92"
                        />
                        <text
                            x="300"
                            y="82"
                            fill="white"
                            fontSize="15"
                            fontWeight="600"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            Era dos Mainframes
                        </text>
                    </g>

                    <g>
                        <rect
                            x="520"
                            y="118"
                            width="220"
                            height="48"
                            rx="12"
                            fill="#ffb703"
                            opacity="0.9"
                        />
                        <text
                            x="540"
                            y="148"
                            fill="oklch(0.22 0.03 250 / 0.85)"
                            fontSize="15"
                            fontWeight="600"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            Era Pessoal
                        </text>
                    </g>

                    <g>
                        <rect
                            x="680"
                            y="34"
                            width="250"
                            height="48"
                            rx="12"
                            fill="#fb8500"
                            opacity="0.9"
                        />
                        <text
                            x="700"
                            y="64"
                            fill="white"
                            fontSize="15"
                            fontWeight="600"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            Era da Internet
                        </text>
                    </g>

                    <g className="animate-hero-pulse" style={{ animationDelay: '1.1s' }}>
                        <rect
                            x="880"
                            y="118"
                            width="250"
                            height="48"
                            rx="12"
                            fill="#e63946"
                            opacity="0.88"
                        />
                        <text
                            x="900"
                            y="148"
                            fill="white"
                            fontSize="15"
                            fontWeight="600"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            Mobile & Cloud
                        </text>
                    </g>

                    {(
                        [
                            [200, '#023047', 8],
                            [420, '#126782', 8],
                            [610, '#ffb703', 11],
                            [780, '#fb8500', 8],
                            [980, '#e63946', 8],
                        ] as const
                    ).map(([x, fill, r]) => (
                        <circle
                            key={x}
                            cx={x}
                            cy="220"
                            r={r}
                            fill={fill}
                            stroke="#fff"
                            strokeWidth="2.5"
                        />
                    ))}

                    <g className="animate-hero-pulse" style={{ animationDelay: '0.55s' }}>
                        <rect
                            x="400"
                            y="278"
                            width="290"
                            height="148"
                            rx="16"
                            fill="white"
                            opacity="0.97"
                            filter="url(#cardShadow)"
                        />
                        <text
                            x="422"
                            y="310"
                            fill="oklch(0.18 0.03 250)"
                            fontSize="18"
                            fontWeight="600"
                            fontFamily="var(--font-heading), Georgia, serif"
                        >
                            Era dos Mainframes
                        </text>
                        <text
                            x="422"
                            y="332"
                            fill="oklch(0.48 0.02 250)"
                            fontSize="12"
                            fontStyle="italic"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            1945 — 1975
                        </text>
                        <text
                            x="422"
                            y="356"
                            fill="oklch(0.4 0.02 250)"
                            fontSize="11"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            Computadores de sala e a base
                        </text>
                        <text
                            x="422"
                            y="372"
                            fill="oklch(0.4 0.02 250)"
                            fontSize="11"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            da computação moderna.
                        </text>
                        <rect
                            x="422"
                            y="386"
                            width="246"
                            height="28"
                            rx="6"
                            fill="url(#cardImage)"
                        />
                    </g>
                </svg>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/35 to-transparent sm:from-background/80" />
        </div>
    );
};

export default HeroTimelineVisual;
