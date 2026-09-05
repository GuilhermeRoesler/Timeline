/**
 * Full-bleed product-shot for the landing hero — live Konva canvas + atmosphere.
 */
import { Spotlight } from '@/components/ui/spotlight';
import HeroLiveCanvas from './HeroLiveCanvas';

const HeroTimelineVisual = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_60%_45%,oklch(0.72_0.08_185/0.18),transparent_65%),linear-gradient(160deg,oklch(0.97_0.015_200),oklch(0.93_0.02_210)_45%,oklch(0.9_0.03_185/0.5))]" />

            <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" />

            <div className="absolute inset-y-[8%] inset-x-0 sm:inset-y-[10%]">
                <HeroLiveCanvas />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/40 to-transparent sm:from-background/85" />
        </div>
    );
};

export default HeroTimelineVisual;
