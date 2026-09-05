import { Link } from 'react-router-dom';
import { ArrowRight, FolderKanban, Hand, Layers, Sparkles, ZoomIn } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PortfolioFooter from '@/components/layout/PortfolioFooter';
import HeroTimelineVisual from '@/components/landing/HeroTimelineVisual';
import ProductFrame from '@/components/landing/ProductFrame';
import { DEMO_PROJECT_ID } from '@/services/projectStorageService';
import { PORTFOLIO_TAGLINE } from '@/constants/portfolio';

const FEATURES = [
    {
        icon: Hand,
        title: 'Pan e zoom fluidos',
        body: 'Navegue séculos com o mesmo gesto de um mapa — o canvas responde na hora.',
    },
    {
        icon: Layers,
        title: 'Camadas que contam',
        body: 'Períodos coloridos, eventos e cartões de detalhe com imagem.',
    },
    {
        icon: ZoomIn,
        title: '100% no navegador',
        body: `${PORTFOLIO_TAGLINE}. Sem conta, sem servidor.`,
    },
] as const;

const LandingPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <header className="absolute top-0 right-0 left-0 z-20">
                <div className="mx-auto flex max-w-6xl items-center justify-end px-6 py-5">
                    <Link
                        to="/dashboard"
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                        Meus projetos
                    </Link>
                </div>
            </header>

            <main className="flex flex-1 flex-col">
                <section className="relative flex min-h-screen flex-col justify-end overflow-hidden pb-10 sm:justify-center sm:pb-0">
                    <HeroTimelineVisual />

                    <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16 sm:pt-0">
                        <p className="animate-hero-rise font-heading text-5xl leading-none tracking-tight text-ink sm:text-7xl md:text-8xl">
                            Timeline
                        </p>
                        <h1 className="animate-hero-rise-delay-1 mt-4 max-w-xl font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                            Conte séculos. Explore com o dedo.
                        </h1>
                        <p className="animate-hero-rise-delay-2 mt-3 max-w-md text-base text-muted-foreground sm:text-lg">
                            Pan, zoom e camadas em um canvas vivo — {PORTFOLIO_TAGLINE}.
                        </p>

                        <div className="animate-hero-rise-delay-3 mt-8 flex flex-wrap gap-3">
                            <Link
                                to={`/project/${DEMO_PROJECT_ID}`}
                                className={cn(
                                    buttonVariants({ size: 'lg' }),
                                    'gap-2 shadow-lg shadow-primary/20',
                                )}
                            >
                                Explorar demo
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                to="/dashboard"
                                className={cn(
                                    buttonVariants({ variant: 'outline', size: 'lg' }),
                                    'gap-2 bg-background/70 backdrop-blur',
                                )}
                            >
                                <FolderKanban className="h-4 w-4" />
                                Meus projetos
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="relative border-t border-border/70 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,oklch(0.72_0.08_185/0.1),transparent_70%)]">
                    <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="font-heading text-3xl tracking-tight text-ink sm:text-4xl">
                                    O produto é o canvas
                                </h2>
                                <p className="mt-3 max-w-lg text-muted-foreground">
                                    Arraste, dê zoom e passe o mouse — a demo abre no melhor
                                    fotograma, com a história já em cena.
                                </p>
                            </div>
                            <Link
                                to={`/project/${DEMO_PROJECT_ID}`}
                                className={cn(
                                    buttonVariants({ variant: 'outline' }),
                                    'shrink-0 gap-2 self-start sm:self-auto',
                                )}
                            >
                                <Sparkles className="h-4 w-4" />
                                Abrir demo
                            </Link>
                        </div>

                        <div className="animate-hero-rise mt-12">
                            <ProductFrame />
                        </div>

                        <ul className="mt-16 grid gap-10 sm:grid-cols-3">
                            {FEATURES.map(({ icon: Icon, title, body }) => (
                                <li key={title}>
                                    <Icon className="mb-3 h-5 w-5 text-primary" aria-hidden />
                                    <p className="font-medium text-foreground">{title}</p>
                                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                        {body}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>

            <PortfolioFooter />
        </div>
    );
};

export default LandingPage;
