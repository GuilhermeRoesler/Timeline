import { Link } from 'react-router-dom';
import { ArrowRight, FolderKanban, Sparkles } from 'lucide-react';
import PortfolioFooter from '../components/layout/PortfolioFooter';
import { DEMO_PROJECT_ID } from '../services/projectStorageService';

const features = [
    'Períodos e eventos interativos com zoom e arraste',
    'Camadas automáticas e temas de cores',
    'Integração com Unsplash e Google Gemini',
    'Projetos salvos localmente no navegador',
];

const LandingPage = () => {
    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <header className="border-b border-gray-200/80 bg-white/70 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <span className="text-xl font-bold text-gray-900">Timeline</span>
                    <Link
                        to="/dashboard"
                        className="text-sm font-medium text-gray-600 hover:text-blue-600"
                    >
                        Meus projetos
                    </Link>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center lg:py-16">
                <div className="flex-1">
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        <Sparkles className="h-3.5 w-3.5" />
                        Projeto de portfólio
                    </span>
                    <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Construa linhas do tempo interativas com estilo
                    </h1>
                    <p className="mt-4 max-w-xl text-lg text-gray-600">
                        Visualize histórias, projetos e cronologias em um canvas interativo. Sem
                        backend — tudo roda no navegador e fica salvo localmente.
                    </p>

                    <ul className="mt-6 space-y-2">
                        {features.map((feature) => (
                            <li
                                key={feature}
                                className="flex items-start gap-2 text-sm text-gray-600"
                            >
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                {feature}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            to={`/project/${DEMO_PROJECT_ID}`}
                            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                        >
                            Ver demo
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            <FolderKanban className="h-4 w-4" />
                            Meus projetos
                        </Link>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-blue-100/50">
                        <img
                            src={`${import.meta.env.BASE_URL}demo.png`}
                            alt="Preview da timeline interativa"
                            className="w-full object-cover"
                        />
                    </div>
                    <p className="mt-3 text-center text-xs text-gray-400">
                        Demo: História da Computação · 5 períodos · 8 eventos
                    </p>
                </div>
            </main>

            <PortfolioFooter />
        </div>
    );
};

export default LandingPage;
