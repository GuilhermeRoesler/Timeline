import { useSettingsStore } from '@/store/settingsStore';
import { confirmAction } from '@/store/uiStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SettingsSidebarProps = {
    onClose: () => void;
};

const SettingsSidebar = ({ onClose }: SettingsSidebarProps) => {
    const settings = useSettingsStore((state) => state.settings);
    const settingsIndex = useSettingsStore((state) => state.settingsIndex);

    const handleReset = async () => {
        const confirmed = await confirmAction({
            title: 'Restaurar configurações',
            message: 'Deseja restaurar todas as configurações para os valores padrão?',
            confirmLabel: 'Restaurar',
            destructive: true,
        });
        if (confirmed) {
            useSettingsStore.getState().resetSettings();
            onClose();
        }
    };

    return (
        <aside className="flex w-44 shrink-0 flex-col bg-gray-900 p-4 sm:w-52">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Configurações
            </p>
            <nav className="flex flex-col gap-1">
                {settings.map((label, index) => (
                    <Button
                        key={label}
                        variant="ghost"
                        onClick={() => useSettingsStore.setState({ settingsIndex: index })}
                        className={cn(
                            'justify-start px-3 py-2 text-sm',
                            settingsIndex === index
                                ? 'bg-white/10 text-white hover:bg-white/10 hover:text-white'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white',
                        )}
                    >
                        {label}
                    </Button>
                ))}
            </nav>
            <Button
                variant="destructive"
                onClick={() => void handleReset()}
                className="mt-auto bg-red-600 hover:bg-red-700"
            >
                Restaurar padrão
            </Button>
        </aside>
    );
};

export default SettingsSidebar;
