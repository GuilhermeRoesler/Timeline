import { usePeriodEventHandler } from "../../../hooks/usePeriodEventHandler";
import { useSidePanelStore } from "../../../store/sidePanelStore";

import SidePanelImageType from "./SidePanelImageType";
import Title from "./form-elements/Title";
import Description from "./form-elements/Description";
import Start from "./form-elements/Start";
import End from "./form-elements/End";
import Date from "./form-elements/Date";
import Color from "./form-elements/Color";
import ImageSection from "./ImageSection";

const SidePanelEditForm = () => {
    const { editPeriod, editEvent } = useSidePanelStore(state => state)
    const { updatePeriod, updateEvent } = usePeriodEventHandler();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editPeriod) {
            updatePeriod(e);
        } else if (editEvent) {
            updateEvent(e);
        }

        e.currentTarget.reset(); // Clear the form after submission
        useSidePanelStore.getState().resetFields();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar</h2>

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

            <button>Atualizar</button>
        </form>
    )
}

export default SidePanelEditForm