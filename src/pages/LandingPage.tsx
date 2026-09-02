import { Link } from 'react-router-dom';
import { ArrowRight, FolderKanban, Sparkles } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import PortfolioFooter from '@/components/layout/PortfolioFooter';
import { DEMO_PROJECT_ID } from '@/services/projectStorageService';

const features = [
    'Períodos e eventos interativos com zoom e arraste',
    'Camadas automáticas e temas de cores',
    'Integração com Unsplash e Google Gemini',
    'Projetos salvos localmente no navegador',
];

const LandingPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <header className="border-b border-border/80 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <span className="flex items-center gap-2 text-xl font-bold text-foreground">
                        <img
                            src={`${import.meta.env.BASE_URL}icon.png`}
                            alt=""
                            className="h-8 w-8 rounded-lg"
                            aria-hidden
                        />
                        Timeline
                    </span>
                    <Link
                        to="/dashboard"
                        className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                    >
                        Meus projetos
                    </Link>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center lg:py-16">
                <div className="flex-1">
                    <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-800">
                        <Sparkles className="h-3.5 w-3.5" />
                        Projeto de portfólio
                    </Badge>
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                        Construa linhas do tempo interativas com estilo
                    </h1>
                    <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                        Visualize histórias, projetos e cronologias em um canvas interativo. Sem
                        backend — tudo roda no navegador e fica salvo localmente.
                    </p>

                    <ul className="mt-6 space-y-2">
                        {features.map((feature) => (
                            <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            to={`/project/${DEMO_PROJECT_ID}`}
                            className={cn(buttonVariants({ size: 'lg' }), 'gap-2')}
                        >
                            Ver demo
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            to="/dashboard"
                            className={cn(
                                buttonVariants({ variant: 'outline', size: 'lg' }),
                                'gap-2',
                            )}
                        >
                            <FolderKanban className="h-4 w-4" />
                            Meus projetos
                        </Link>
                    </div>
                </div>

                <div className="flex-1">
                    <Card className="overflow-hidden shadow-xl shadow-blue-100/50">
                        <img
                            src={`${import.meta.env.BASE_URL}demo.png`}
                            alt="Preview da timeline interativa"
                            className="w-full object-cover"
                        />
                    </Card>
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                        Demo: História da Computação · 5 períodos · 8 eventos
                    </p>
                </div>
            </main>

            <PortfolioFooter />
        </div>
    );
};

export default LandingPage;
