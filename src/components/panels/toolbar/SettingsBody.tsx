import { useSettingsStore } from '../../../store/settingsStore';
import { themeNames } from '../../../data/theme';
import { colorize } from '../../../utils/colorUtils';
import { useEffect } from 'react';
import { adjustLayer } from '../../../utils/levelUtils';
import { syncPeriods } from '../../../services/projectStorageService';
import ToggleSwitch from './ToggleSwitch';

const SettingRow = ({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) => (
    <div className="flex items-center justify-between gap-4 border-b border-gray-200 py-4 last:border-0">
        <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-0.5 text-xs text-gray-500">{description}</p>
        </div>
        <div className="shrink-0">{children}</div>
    </div>
);

const SettingsBody = () => {
    const {
        settingsIndex,
        BASE_YEAR,
        YEAR_SPACING,
        EVENT_RADIUS,
        PERIOD_HEIGHT,
        LEVEL_SPACING,
        COLORIZE_ON_CREATE,
        NEGATIVE_LEVEL,
        THEME_INDEX,
    } = useSettingsStore((state) => state);

    const switchTheme = (index: number) => {
        useSettingsStore.setState({ THEME_INDEX: index });
        colorize();
    };

    useEffect(() => {
        const adjusted = adjustLayer();
        syncPeriods(adjusted);
    }, [NEGATIVE_LEVEL]);

    const sectionTitle =
        settingsIndex === 0
            ? 'Geral'
            : settingsIndex === 1
              ? 'Eventos'
              : settingsIndex === 2
                ? 'Períodos'
                : 'Cores';

    return (
        <div className="flex h-full flex-col overflow-y-auto p-6 pt-12">
            <h3 className="mb-2 text-lg font-semibold text-gray-900">{sectionTitle}</h3>

            {settingsIndex === 0 && (
                <>
                    <SettingRow
                        title="Ano base"
                        description="Ano inicial exibido na linha do tempo"
                    >
                        <input
                            type="number"
                            value={BASE_YEAR}
                            onChange={(e) =>
                                useSettingsStore.setState({ BASE_YEAR: Number(e.target.value) })
                            }
                            className="w-24 rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
                        />
                    </SettingRow>
                    <SettingRow
                        title="Espaçamento entre anos"
                        description="Distância horizontal entre os marcadores de ano"
                    >
                        <input
                            type="range"
                            min={50}
                            max={200}
                            step={10}
                            value={YEAR_SPACING}
                            onChange={(e) =>
                                useSettingsStore.setState({ YEAR_SPACING: Number(e.target.value) })
                            }
                            className="w-32"
                        />
                    </SettingRow>
                </>
            )}

            {settingsIndex === 1 && (
                <SettingRow title="Raio do evento" description="Tamanho visual dos eventos">
                    <input
                        type="range"
                        min={5}
                        max={40}
                        step={5}
                        value={EVENT_RADIUS}
                        onChange={(e) =>
                            useSettingsStore.setState({ EVENT_RADIUS: Number(e.target.value) })
                        }
                        className="w-32"
                    />
                </SettingRow>
            )}

            {settingsIndex === 2 && (
                <>
                    <SettingRow
                        title="Altura do período"
                        description="Altura das barras de período"
                    >
                        <input
                            type="range"
                            min={40}
                            max={140}
                            step={5}
                            value={PERIOD_HEIGHT}
                            onChange={(e) =>
                                useSettingsStore.setState({ PERIOD_HEIGHT: Number(e.target.value) })
                            }
                            className="w-32"
                        />
                    </SettingRow>
                    <SettingRow
                        title="Espaçamento entre camadas"
                        description="Distância vertical entre níveis de períodos"
                    >
                        <input
                            type="range"
                            min={0}
                            max={100}
                            step={1}
                            value={LEVEL_SPACING}
                            onChange={(e) =>
                                useSettingsStore.setState({ LEVEL_SPACING: Number(e.target.value) })
                            }
                            className="w-32"
                        />
                    </SettingRow>
                    <SettingRow
                        title="Camadas negativas"
                        description="Permite renderizar períodos abaixo da linha principal"
                    >
                        <ToggleSwitch
                            id="negative-level"
                            checked={NEGATIVE_LEVEL}
                            onChange={(e) =>
                                useSettingsStore.setState({ NEGATIVE_LEVEL: e.target.checked })
                            }
                        />
                    </SettingRow>
                </>
            )}

            {settingsIndex === 3 && (
                <>
                    <SettingRow
                        title="Colorir ao criar"
                        description="Aplica cor automaticamente em novos itens"
                    >
                        <ToggleSwitch
                            id="colorize-on-create"
                            checked={COLORIZE_ON_CREATE}
                            onChange={(e) =>
                                useSettingsStore.setState({ COLORIZE_ON_CREATE: e.target.checked })
                            }
                        />
                    </SettingRow>
                    <SettingRow
                        title="Tema de cores"
                        description="Paleta aplicada aos períodos e eventos"
                    >
                        <select
                            value={themeNames[THEME_INDEX]}
                            onChange={(e) => switchTheme(e.target.selectedIndex)}
                            className="rounded-lg border border-gray-300 px-2 py-1.5 text-sm"
                        >
                            {themeNames.map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme}
                                </option>
                            ))}
                        </select>
                    </SettingRow>
                </>
            )}
        </div>
    );
};

export default SettingsBody;
