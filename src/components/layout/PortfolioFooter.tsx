import { Code2 } from 'lucide-react';
import { PORTFOLIO_LINKS } from '../../constants/portfolio';

const PortfolioFooter = ({ className = '' }: { className?: string }) => {
    return (
        <footer className={`border-t border-gray-200 bg-white/80 ${className}`}>
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-500 sm:flex-row">
                <p>
                    Desenvolvido por{' '}
                    <a
                        href={PORTFOLIO_LINKS.githubProfile}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-gray-800 hover:text-blue-600"
                    >
                        {PORTFOLIO_LINKS.authorName}
                    </a>
                </p>
                <div className="flex items-center gap-4">
                    <a
                        href={PORTFOLIO_LINKS.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-blue-600"
                    >
                        <Code2 className="h-4 w-4" />
                        Código-fonte
                    </a>
                    <span className="text-gray-300">|</span>
                    <span>Desktop-first · Dados locais</span>
                </div>
            </div>
        </footer>
    );
};

export default PortfolioFooter;
