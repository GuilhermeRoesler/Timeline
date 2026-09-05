import { useState } from 'react';
import { useSidePanelStore } from '@/store/sidePanelStore';
import { colorize } from '@/utils/colorUtils';
import { adjustLayer } from '@/utils/levelUtils';
import { syncPeriods } from '@/services/projectStorageService';
import SettingsModal from './SettingsModal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ArrowLeft, MoreVertical, Layers, Palette, Settings, Plus } from 'lucide-react';

type ToolbarProps = {
    onBack: () => void;
    projectName: string;
};

const Toolbar = ({ onBack, projectName }: ToolbarProps) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
    };

    const applyColorize = () => {
        colorize();
    };

    return (
        <>
            <div className="product-chrome fixed top-4 left-4 z-[1000] flex items-center gap-2 rounded-xl px-3 py-2">
                <Button variant="ghost" size="icon" onClick={onBack} title="Voltar ao dashboard">
                    <ArrowLeft className="h-5 w-5" />
                </Button>

                <Separator orientation="vertical" className="hidden h-6 sm:block" />

                <div className="hidden min-w-0 sm:block">
                    <p className="truncate text-sm font-semibold text-foreground">{projectName}</p>
                    <p className="text-xs text-muted-foreground">Linha do tempo</p>
                </div>

                <Separator orientation="vertical" className="hidden h-6 sm:block" />

                <Button onClick={handleOpen} size="sm" className="gap-1.5">
                    <Plus className="h-4 w-4" />
                    Criar
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <Button variant="ghost" size="icon" title="Mais opções">
                                <MoreVertical className="h-5 w-5" />
                            </Button>
                        }
                    />
                    <DropdownMenuContent align="end" className="w-52">
                        <DropdownMenuItem onClick={adjustLayers}>
                            <Layers className="h-4 w-4" />
                            Ajustar camadas
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={applyColorize}>
                            <Palette className="h-4 w-4" />
                            Colorir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsSettingsOpen(true)}>
                            <Settings className="h-4 w-4" />
                            Configurações
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
};

export default Toolbar;
