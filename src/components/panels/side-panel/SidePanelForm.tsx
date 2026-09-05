import { usePeriodEventHandler } from '@/hooks/usePeriodEventHandler';
import { useSidePanelStore } from '@/store/sidePanelStore';
import { Button } from '@/components/ui/button';

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="font-heading text-2xl tracking-tight text-ink">Adicionar</h2>
            <SidePanelFormType />

            <Title />
            <Description />
            {selectedType === 'period' ? (
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
                Criar
            </Button>
        </form>
    );
};

export default SidePanelForm;
