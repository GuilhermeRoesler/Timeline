import { usePeriodEventHandler } from '@/hooks/usePeriodEventHandler';
import { useSidePanelStore } from '@/store/sidePanelStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

import SidePanelImageType from './SidePanelImageType';
import Title from './form-elements/Title';
import Description from './form-elements/Description';
import Start from './form-elements/Start';
import End from './form-elements/End';
import Date from './form-elements/Date';
import Color from './form-elements/Color';
import ImageSection from './ImageSection';

const SidePanelEditForm = () => {
    const { editPeriod, editEvent } = useSidePanelStore((state) => state);
    const { updatePeriod, updateEvent } = usePeriodEventHandler();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editPeriod) {
            updatePeriod(e);
        } else if (editEvent) {
            updateEvent(e);
        }

        e.currentTarget.reset();
        useSidePanelStore.getState().resetFields();
    };

    const itemTitle = editPeriod?.title || editEvent?.title || 'item';
    const itemKind = editPeriod ? 'Período' : 'Evento';

    return (
        <form onSubmit={handleSubmit} className="side-panel-form">
            <div className="side-panel-scroll">
                <div className="side-panel-header">
                    <div className="mb-2 flex items-center gap-2">
                        <Badge variant="secondary" className="bg-accent text-accent-foreground">
                            {itemKind}
                        </Badge>
                        <Badge variant="outline">Editando</Badge>
                    </div>
                    <h2>Editar</h2>
                    <p className="side-panel-kicker truncate" title={itemTitle}>
                        {itemTitle}
                    </p>
                </div>

                <div className="side-panel-section">
                    <p className="side-panel-section-label">Conteúdo</p>
                    <Title />
                    <Description />
                    {editPeriod ? (
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
                    <Check className="size-4" />
                    Salvar alterações
                </Button>
            </div>
        </form>
    );
};

export default SidePanelEditForm;
