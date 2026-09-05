/**
 * Browser-chrome product frame — static composition mirroring the real editor.
 */
const ProductFrame = () => {
    return (
        <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-[0_24px_60px_oklch(0.2_0.03_250/0.12)]">
            <div className="flex items-center gap-2 border-b border-border/70 bg-muted/40 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
                <span className="ml-3 truncate text-xs text-muted-foreground">
                    timeline.app / demo — História da Computação
                </span>
            </div>

            <div
                className="relative aspect-[16/9]"
                style={{
                    backgroundColor: 'oklch(0.955 0.01 210)',
                    backgroundImage:
                        'radial-gradient(ellipse 80% 50% at 50% 42%, oklch(0.72 0.06 185 / 0.12), transparent 70%), linear-gradient(oklch(0.22 0.025 250 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.22 0.025 250 / 0.04) 1px, transparent 1px)',
                    backgroundSize: 'auto, 48px 48px, 48px 48px',
                }}
            >
                <div className="product-chrome absolute top-4 left-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
                    <span className="font-semibold text-foreground">História da Computação</span>
                    <span className="rounded-md bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        + Criar
                    </span>
                </div>

                <svg
                    viewBox="0 0 960 420"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden
                >
                    <line
                        x1="40"
                        y1="200"
                        x2="920"
                        y2="200"
                        stroke="oklch(0.28 0.03 250 / 0.5)"
                        strokeWidth="2.5"
                    />
                    {(
                        [
                            [120, '1945'],
                            [280, '1965'],
                            [460, '1985'],
                            [640, '2005'],
                            [820, '2020'],
                        ] as const
                    ).map(([x, label]) => (
                        <g key={label}>
                            <line
                                x1={x}
                                y1="188"
                                x2={x}
                                y2="212"
                                stroke="oklch(0.4 0.02 250 / 0.35)"
                                strokeWidth="1.5"
                            />
                            <text
                                x={x}
                                y="236"
                                textAnchor="middle"
                                fill="oklch(0.45 0.02 250 / 0.7)"
                                fontSize="12"
                                fontFamily="var(--font-sans), system-ui, sans-serif"
                            >
                                {label}
                            </text>
                        </g>
                    ))}

                    <rect
                        x="60"
                        y="118"
                        width="240"
                        height="44"
                        rx="11"
                        fill="#8ecae6"
                        opacity="0.9"
                    />
                    <text
                        x="78"
                        y="146"
                        fill="oklch(0.22 0.03 250 / 0.85)"
                        fontSize="14"
                        fontWeight="600"
                        fontFamily="var(--font-sans), system-ui, sans-serif"
                    >
                        Era Mecânica
                    </text>

                    <rect
                        x="220"
                        y="58"
                        width="260"
                        height="44"
                        rx="11"
                        fill="#219ebc"
                        opacity="0.95"
                    />
                    <text
                        x="238"
                        y="86"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                        fontFamily="var(--font-sans), system-ui, sans-serif"
                    >
                        Era dos Mainframes
                    </text>

                    <rect
                        x="430"
                        y="118"
                        width="200"
                        height="44"
                        rx="11"
                        fill="#ffb703"
                        opacity="0.92"
                    />
                    <text
                        x="448"
                        y="146"
                        fill="oklch(0.22 0.03 250 / 0.85)"
                        fontSize="14"
                        fontWeight="600"
                        fontFamily="var(--font-sans), system-ui, sans-serif"
                    >
                        Era Pessoal
                    </text>

                    <rect
                        x="580"
                        y="48"
                        width="220"
                        height="44"
                        rx="11"
                        fill="#fb8500"
                        opacity="0.92"
                    />
                    <text
                        x="598"
                        y="76"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                        fontFamily="var(--font-sans), system-ui, sans-serif"
                    >
                        Era da Internet
                    </text>

                    <rect
                        x="760"
                        y="118"
                        width="160"
                        height="44"
                        rx="11"
                        fill="#e63946"
                        opacity="0.9"
                    />
                    <text
                        x="776"
                        y="146"
                        fill="white"
                        fontSize="13"
                        fontWeight="600"
                        fontFamily="var(--font-sans), system-ui, sans-serif"
                    >
                        Mobile
                    </text>

                    {([160, 320, 500, 680, 820] as const).map((x, i) => (
                        <circle
                            key={x}
                            cx={x}
                            cy="200"
                            r={i === 1 ? 10 : 7}
                            fill={['#023047', '#126782', '#ffb703', '#fb8500', '#e63946'][i]}
                            stroke="#fff"
                            strokeWidth="2.5"
                        />
                    ))}

                    <g>
                        <rect
                            x="340"
                            y="258"
                            width="260"
                            height="130"
                            rx="14"
                            fill="white"
                            opacity="0.97"
                            filter="drop-shadow(0 14px 28px rgba(15,23,42,0.18))"
                        />
                        <text
                            x="360"
                            y="290"
                            fill="oklch(0.18 0.03 250)"
                            fontSize="16"
                            fontWeight="600"
                            fontFamily="var(--font-heading), Georgia, serif"
                        >
                            Era dos Mainframes
                        </text>
                        <text
                            x="360"
                            y="312"
                            fill="oklch(0.48 0.02 250)"
                            fontSize="11"
                            fontStyle="italic"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            1945 — 1975
                        </text>
                        <text
                            x="360"
                            y="338"
                            fill="oklch(0.4 0.02 250)"
                            fontSize="11"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            Computadores de sala e a base
                        </text>
                        <text
                            x="360"
                            y="354"
                            fill="oklch(0.4 0.02 250)"
                            fontSize="11"
                            fontFamily="var(--font-sans), system-ui, sans-serif"
                        >
                            da computação moderna.
                        </text>
                    </g>
                </svg>
            </div>
        </div>
    );
};

export default ProductFrame;
