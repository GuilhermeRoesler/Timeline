import { useSettingsStore } from '../../../store/settingsStore';
import { confirmAction } from '../../../store/uiStore';

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
                    <button
                        key={label}
                        onClick={() => useSettingsStore.setState({ settingsIndex: index })}
                        className={`rounded-lg px-3 py-2 text-left text-sm transition ${
                            settingsIndex === index
                                ? 'bg-white/10 text-white'
                                : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </nav>
            <button
                onClick={() => void handleReset()}
                className="mt-auto rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
                Restaurar padrão
            </button>
        </aside>
    );
};

export default SettingsSidebar;
