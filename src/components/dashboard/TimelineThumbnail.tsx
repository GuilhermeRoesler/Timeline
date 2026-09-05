type ThumbnailPeriod = {
    color: string;
    startYear: number;
    endYear: number;
    level: number;
};

type ThumbnailEvent = {
    color: string;
    year: number;
};

type TimelineThumbnailProps = {
    periods: ThumbnailPeriod[];
    events: ThumbnailEvent[];
    className?: string;
};

const TimelineThumbnail = ({ periods, events, className = '' }: TimelineThumbnailProps) => {
    const years = [
        ...periods.flatMap((p) => [p.startYear, p.endYear]),
        ...events.map((e) => e.year),
    ];
    const minYear = years.length ? Math.min(...years) : 2000;
    const maxYear = years.length ? Math.max(...years) : 2020;
    const span = Math.max(maxYear - minYear, 1);
    const pad = span * 0.06;
    const viewStart = minYear - pad;
    const viewEnd = maxYear + pad;
    const viewSpan = viewEnd - viewStart;

    const xOf = (year: number) => ((year - viewStart) / viewSpan) * 100;
    const maxLevel = Math.max(1, ...periods.map((p) => Math.abs(p.level) || 1));

    return (
        <div
            className={`relative overflow-hidden rounded-t-xl bg-[oklch(0.955_0.01_210)] ${className}`}
            aria-hidden
        >
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    backgroundImage:
                        'linear-gradient(oklch(0.22 0.025 250 / 4%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.22 0.025 250 / 4%) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                }}
            />
            <svg viewBox="0 0 100 48" className="relative h-28 w-full" preserveAspectRatio="none">
                <line
                    x1="0"
                    y1="30"
                    x2="100"
                    y2="30"
                    stroke="oklch(0.28 0.03 250 / 0.45)"
                    strokeWidth="0.6"
                />
                {periods.map((period, index) => {
                    const x = xOf(period.startYear);
                    const width = Math.max(xOf(period.endYear) - x, 1.2);
                    const level = Math.abs(period.level) || 1;
                    const y = 30 - (level / maxLevel) * 18 - 6;
                    return (
                        <rect
                            key={`${period.color}-${index}`}
                            x={x}
                            y={y}
                            width={width}
                            height="5.5"
                            rx="1.4"
                            fill={period.color || '#8ecae6'}
                            opacity="0.9"
                        />
                    );
                })}
                {events.map((event, index) => (
                    <circle
                        key={`${event.year}-${index}`}
                        cx={xOf(event.year)}
                        cy="30"
                        r="1.35"
                        fill={event.color || '#ffb703'}
                        stroke="#fff"
                        strokeWidth="0.35"
                    />
                ))}
            </svg>
        </div>
    );
};

export default TimelineThumbnail;
export type { ThumbnailPeriod, ThumbnailEvent };
