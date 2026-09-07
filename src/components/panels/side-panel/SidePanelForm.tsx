import { usePeriodEventHandler } from '@/hooks/usePeriodEventHandler';
import { useSidePanelStore } from '@/store/sidePanelStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

import SidePanelFormType from './SidePanelFormType';
import SidePanelImageType from './SidePanelImageType';
import Title from './form-elements/Title';
import Description from './form-elements/Description';
import Start from './form-elements/Start';
import End from './form-elements/End';
import Date from './form-elements/Date';
import Color from './form-elements/Color';
import ImageSection from './ImageSection';
import { colorize } from '@/utils/colorUtils';
import { useSettingsStore } from '@/store/settingsStore';

const SidePanelForm = () => {
    const selectedType = useSidePanelStore((state) => state.selectedType);
    const { addPeriod, addEvent } = usePeriodEventHandler();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedType === 'period') {
            addPeriod(e);
        } else if (selectedType === 'event') {
            addEvent(e);
        }

        useSidePanelStore.getState().resetFields();
        if (useSettingsStore.getState().COLORIZE_ON_CREATE) colorize();
    };

    return (
        <form onSubmit={handleSubmit} className="side-panel-form">
            <div className="side-panel-scroll">
                <div className="side-panel-header">
                    <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            Novo
                        </Badge>
                    </div>
                    <h2>Adicionar</h2>
                    <p className="side-panel-kicker">
                        {selectedType === 'period'
                            ? 'Crie um período com início, fim e contexto.'
                            : 'Marque um evento em um momento específico.'}
                    </p>
                </div>

                <div className="side-panel-section">
                    <p className="side-panel-section-label">Tipo</p>
                    <SidePanelFormType />
                </div>

                <div className="side-panel-section">
                    <p className="side-panel-section-label">Conteúdo</p>
                    <Title />
                    <Description />
                    {selectedType === 'period' ? (
                        <div className="grid grid-cols-2 gap-3">
                            <Start />
                            <End />
                        </div>
                    ) : (
                        <Date />
                    )}
                    <Color />
                </div>

                <div className="side-panel-section">
                    <p className="side-panel-section-label">Imagem</p>
                    <SidePanelImageType />
                    <ImageSection />
                </div>
            </div>

            <div className="side-panel-actions">
                <Button type="submit" className="w-full gap-1.5">
                    <Plus className="size-4" />
                    Criar {selectedType === 'period' ? 'período' : 'evento'}
                </Button>
            </div>
        </form>
    );
};

export default SidePanelForm;
