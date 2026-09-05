import { Link } from 'react-router-dom';
import { ArrowRight, FolderKanban } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PortfolioFooter from '@/components/layout/PortfolioFooter';
import HeroTimelineVisual from '@/components/landing/HeroTimelineVisual';
import { DEMO_PROJECT_ID } from '@/services/projectStorageService';

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

            <main className="relative flex min-h-screen flex-1 flex-col justify-end overflow-hidden pb-10 sm:justify-center sm:pb-0">
                <HeroTimelineVisual />

                <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16 sm:pt-0">
                    <p className="animate-hero-rise font-heading text-5xl leading-none tracking-tight text-ink sm:text-7xl md:text-8xl">
                        Timeline
                    </p>
                    <h1 className="animate-hero-rise-delay-1 mt-4 max-w-xl text-xl font-medium text-foreground sm:text-2xl">
                        Linhas do tempo interativas com estilo
                    </h1>
                    <p className="animate-hero-rise-delay-2 mt-3 max-w-md text-base text-muted-foreground sm:text-lg">
                        Arraste, dê zoom e conte histórias em um canvas vivo — tudo no navegador,
                        sem backend.
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
            </main>

            <PortfolioFooter />
        </div>
    );
};

export default LandingPage;
