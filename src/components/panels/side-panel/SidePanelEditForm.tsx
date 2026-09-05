import { usePeriodEventHandler } from '@/hooks/usePeriodEventHandler';
import { useSidePanelStore } from '@/store/sidePanelStore';
import { Button } from '@/components/ui/button';

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

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar</h2>
            <p className="side-panel-kicker truncate">{itemTitle}</p>

            <div className="side-panel-section">
                <p className="side-panel-section-label">Conteúdo</p>
                <Title />
                <Description />
                {editPeriod ? (
                    <>
                        <Start />
                        <End />
                    </>
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

            <Button type="submit" className="mt-1 w-full">
                Atualizar
            </Button>
        </form>
    );
};

export default SidePanelEditForm;
