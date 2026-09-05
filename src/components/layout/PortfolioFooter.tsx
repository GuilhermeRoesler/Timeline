import { Code2 } from 'lucide-react';
import { PORTFOLIO_LINKS } from '../../constants/portfolio';

const PortfolioFooter = ({ className = '' }: { className?: string }) => {
    return (
        <footer className={`border-t border-border/80 bg-background/80 backdrop-blur ${className}`}>
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row">
                <p>
                    Desenvolvido por{' '}
                    <a
                        href={PORTFOLIO_LINKS.githubProfile}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-foreground transition-colors hover:text-primary"
                    >
                        {PORTFOLIO_LINKS.authorName}
                    </a>
                </p>
                <div className="flex items-center gap-4">
                    <a
                        href={PORTFOLIO_LINKS.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
                    >
                        <Code2 className="h-4 w-4" />
                        Código-fonte
                    </a>
                    <span className="text-border">|</span>
                    <span>Desktop-first · Dados locais</span>
                </div>
            </div>
        </footer>
    );
};

export default PortfolioFooter;
