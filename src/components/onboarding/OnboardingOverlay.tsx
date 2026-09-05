import { useState } from 'react';
import { MousePointerClick, Plus, Settings, X } from 'lucide-react';
import { dismissOnboarding } from '@/utils/visitTracking';
import { Button } from '@/components/ui/button';

const steps = [
    {
        icon: MousePointerClick,
        title: 'Explore a linha do tempo',
        description: 'Arraste, dê zoom e passe o mouse sobre períodos e eventos para ver detalhes.',
    },
    {
        icon: Plus,
        title: 'Crie conteúdo',
        description: 'Use o botão "Criar" na barra superior para adicionar períodos ou eventos.',
    },
    {
        icon: Settings,
        title: 'Personalize',
        description: 'Ajuste temas, camadas e espaçamentos no menu de configurações.',
    },
];

type OnboardingOverlayProps = {
    onDismiss: () => void;
};

const OnboardingOverlay = ({ onDismiss }: OnboardingOverlayProps) => {
    const [step, setStep] = useState(0);
    const current = steps[step];
    const Icon = current.icon;
    const isLast = step === steps.length - 1;

    const handleNext = () => {
        if (isLast) {
            dismissOnboarding();
            onDismiss();
            return;
        }
        setStep((value) => value + 1);
    };

    const handleSkip = () => {
        dismissOnboarding();
        onDismiss();
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-[2000] flex items-end justify-center p-4 sm:p-6">
            <div className="product-chrome animate-hero-rise pointer-events-auto w-full max-w-md rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                        <Icon className="h-5 w-5" />
                    </div>
                    <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={handleSkip}
                        aria-label="Fechar onboarding"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <p className="mt-4 text-xs font-medium tracking-wide text-primary uppercase">
                    Passo {step + 1} de {steps.length}
                </p>
                <h3 className="font-heading mt-1 text-lg tracking-tight text-ink">
                    {current.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {current.description}
                </p>

                <div className="mt-4 flex gap-1">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 flex-1 rounded-full ${
                                index <= step ? 'bg-primary' : 'bg-muted'
                            }`}
                        />
                    ))}
                </div>

                <div className="mt-5 flex items-center justify-between gap-2">
                    <Button variant="ghost" onClick={handleSkip}>
                        Pular
                    </Button>
                    <Button onClick={handleNext}>{isLast ? 'Começar' : 'Próximo'}</Button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingOverlay;
