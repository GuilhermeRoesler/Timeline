/**
 * Cult UI — Shift Card (adapted for feature / empty-state layouts)
 * @see https://www.cult-ui.com/docs/components/shift-card
 */
import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

const cultShadow =
    'shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.35)]';

type ShiftCardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
    topContent?: ReactNode;
    middleContent?: ReactNode;
    topAnimateContent?: ReactNode;
    bottomContent?: ReactNode;
    children?: ReactNode;
};

export const ShiftCard = ({
    className,
    topContent,
    topAnimateContent,
    middleContent,
    bottomContent,
    children,
    ...props
}: ShiftCardProps) => {
    const [isHovered, setHovered] = useState(false);

    return (
        <motion.div
            className={cn(
                'group relative flex min-h-55 w-full flex-col justify-between overflow-hidden rounded-xl bg-card p-4 text-sm',
                cultShadow,
                className,
            )}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-48px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onFocus={() => setHovered(true)}
            onBlur={() => setHovered(false)}
            {...props}
        >
            {children ? (
                children
            ) : (
                <>
                    <div className="relative w-full">
                        {topContent}
                        <AnimatePresence>
                            {isHovered && topAnimateContent ? (
                                <motion.div
                                    key="top-animate"
                                    initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
                                    transition={{ duration: 0.2 }}
                                    className="pointer-events-none absolute inset-0"
                                >
                                    {topAnimateContent}
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>

                    <AnimatePresence mode="wait">
                        {!isHovered && middleContent ? (
                            <motion.div
                                key="middle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex flex-1 items-center justify-center py-3"
                            >
                                {middleContent}
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    <motion.div
                        className="mt-auto w-full"
                        animate={{
                            paddingTop: isHovered ? 8 : 0,
                        }}
                        transition={{ duration: 0.25 }}
                    >
                        {bottomContent}
                    </motion.div>
                </>
            )}
        </motion.div>
    );
};

type FeatureShiftCardProps = {
    icon: ReactNode;
    title: string;
    description: string;
    hint?: string;
    className?: string;
    index?: number;
};

/** Compact Shift Card for landing feature rows. */
export const FeatureShiftCard = ({
    icon,
    title,
    description,
    hint,
    className,
    index = 0,
}: FeatureShiftCardProps) => {
    return (
        <ShiftCard
            className={cn('min-h-0 cursor-default gap-3 p-5', className)}
            style={{ transitionDelay: `${index * 60}ms` }}
            transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            topContent={
                <div className="flex items-start justify-between gap-3">
                    <span className="text-primary [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
                    {hint ? (
                        <span className="rounded-md bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                            {hint}
                        </span>
                    ) : null}
                </div>
            }
            bottomContent={
                <div>
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                </div>
            }
        />
    );
};
