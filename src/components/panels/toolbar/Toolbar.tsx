import { useState, useRef, useEffect } from 'react';
import { useSidePanelStore } from '../../../store/sidePanelStore';
import { colorize } from '../../../utils/colorUtils';
import { adjustLayer } from '../../../utils/levelUtils';
import { syncPeriods } from '../../../services/projectStorageService';
import SettingsModal from './SettingsModal';
import { ArrowLeft, MoreVertical, Layers, Palette, Settings, Plus } from 'lucide-react';

type ToolbarProps = {
    onBack: () => void;
    projectName: string;
    hasDemoBanner?: boolean;
};

const Toolbar = ({ onBack, projectName, hasDemoBanner = false }: ToolbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOpen = () => {
        useSidePanelStore.setState({
            imageSelectedType: 'search',
            isSidePanelOpen: true,
            editPeriod: null,
            editEvent: null,
        });
    };

    const adjustLayers = () => {
        const adjustedLayers = adjustLayer();
        syncPeriods(adjustedLayers);
        setIsMenuOpen(false);
    };

    const applyColorize = () => {
        colorize();
        setIsMenuOpen(false);
    };

    return (
        <>
            <div
                className={`fixed left-4 z-[1000] flex items-center gap-2 rounded-xl border border-gray-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur ${
                    hasDemoBanner ? 'top-14' : 'top-4'
                }`}
            >
                <button
                    onClick={onBack}
                    className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                    title="Voltar ao dashboard"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>

                <div className="hidden h-6 w-px bg-gray-200 sm:block" />

                <div className="hidden min-w-0 sm:block">
                    <p className="truncate text-sm font-semibold text-gray-900">{projectName}</p>
                    <p className="text-xs text-gray-400">Linha do tempo</p>
                </div>

                <div className="hidden h-6 w-px bg-gray-200 sm:block" />

                <button
                    onClick={handleOpen}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    <Plus className="h-4 w-4" />
                    Criar
                </button>

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                        title="Mais opções"
                    >
                        <MoreVertical className="h-5 w-5" />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute top-full right-0 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                            <button
                                onClick={adjustLayers}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <Layers className="h-4 w-4" />
                                Ajustar camadas
                            </button>
                            <button
                                onClick={applyColorize}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <Palette className="h-4 w-4" />
                                Colorir
                            </button>
                            <button
                                onClick={() => {
                                    setIsSettingsOpen(true);
                                    setIsMenuOpen(false);
                                }}
                                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                            >
                                <Settings className="h-4 w-4" />
                                Configurações
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {isSettingsOpen && (
                <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            )}
        </>
    );
};

export default Toolbar;
