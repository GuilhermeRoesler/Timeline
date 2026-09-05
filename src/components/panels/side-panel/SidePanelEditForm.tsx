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

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="font-heading text-2xl tracking-tight text-ink">Editar</h2>

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
            <SidePanelImageType />
            <ImageSection />

            <Button type="submit" className="w-full">
                Atualizar
            </Button>
        </form>
    );
};

export default SidePanelEditForm;
