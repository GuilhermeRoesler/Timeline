import type { FitTimelineViewResult } from './fitTimelineView';

const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

type AnimateStageViewOptions = {
    from: FitTimelineViewResult;
    to: FitTimelineViewResult;
    durationMs?: number;
    onUpdate: (view: FitTimelineViewResult) => void;
    onComplete?: () => void;
};

/** Tweens stage scale/position for a cinematic camera move. Returns a cancel fn. */
export const animateStageView = ({
    from,
    to,
    durationMs = 1200,
    onUpdate,
    onComplete,
}: AnimateStageViewOptions): (() => void) => {
    const start = performance.now();
    let raf = 0;
    let cancelled = false;

    const tick = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - start) / durationMs);
        const e = easeOutCubic(t);
        onUpdate({
            scale: from.scale + (to.scale - from.scale) * e,
            pos: {
                x: from.pos.x + (to.pos.x - from.pos.x) * e,
                y: from.pos.y + (to.pos.y - from.pos.y) * e,
            },
        });
        if (t < 1) {
            raf = requestAnimationFrame(tick);
        } else {
            onComplete?.();
        }
    };

    raf = requestAnimationFrame(tick);
    return () => {
        cancelled = true;
        cancelAnimationFrame(raf);
    };
};
