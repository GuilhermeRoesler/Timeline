import { useState } from 'react';
import { MousePointerClick, Plus, Settings, X } from 'lucide-react';
import { dismissOnboarding } from '../../utils/visitTracking';

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
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <Icon className="h-5 w-5" />
                    </div>
                    <button
                        onClick={handleSkip}
                        className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        aria-label="Fechar onboarding"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-600">
                    Passo {step + 1} de {steps.length}
                </p>
                <h3 className="text-lg font-semibold text-gray-900">{current.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{current.description}</p>

                <div className="mt-4 flex gap-1">
                    {steps.map((_, index) => (
                        <div
                            key={index}
                            className={`h-1.5 flex-1 rounded-full ${
                                index <= step ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                        />
                    ))}
                </div>

                <div className="mt-6 flex justify-between gap-2">
                    <button
                        onClick={handleSkip}
                        className="rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100"
                    >
                        Pular
                    </button>
                    <button
                        onClick={handleNext}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        {isLast ? 'Começar' : 'Próximo'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OnboardingOverlay;
