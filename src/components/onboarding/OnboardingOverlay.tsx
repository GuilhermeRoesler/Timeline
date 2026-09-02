import { useState } from 'react';
import { MousePointerClick, Plus, Settings, X } from 'lucide-react';
import { dismissOnboarding } from '@/utils/visitTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

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
        <div className="fixed inset-0 z-[2000] flex items-end justify-center bg-black/30 p-4 sm:items-center">
            <Card className="w-full max-w-md shadow-2xl">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
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
                </CardHeader>
                <CardContent>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-primary">
                        Passo {step + 1} de {steps.length}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground">{current.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{current.description}</p>

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
                </CardContent>
                <CardFooter className="justify-between gap-2 border-t-0 bg-transparent">
                    <Button variant="ghost" onClick={handleSkip}>
                        Pular
                    </Button>
                    <Button onClick={handleNext}>{isLast ? 'Começar' : 'Próximo'}</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default OnboardingOverlay;
