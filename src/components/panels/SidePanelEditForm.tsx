import { usePeriodEventHandler } from "../../hooks/usePeriodEventHandler";
import { useSidePanelStore } from "../../store/sidePanelStore";

import SidePanelImageType from "./SidePanelImageType";
import { SidePanelColor, SidePanelDescription, SidePanelEnd, SidePanelStart, SidePanelTitle, SidePanelDate } from "./SidePanelUtils";
import ImageSection from "./ImageSection";

const SidePanelEditForm = () => {
    const editPeriod = useSidePanelStore(state => state.editPeriod)
    const editEvent = useSidePanelStore(state => state.editEvent)
    const { updatePeriod, addEvent } = usePeriodEventHandler();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editPeriod) {
            updatePeriod(e);
        } else if (editEvent) {
            addEvent(e);
        }

        e.currentTarget.reset(); // Clear the form after submission
        useSidePanelStore.getState().setIsSidePanelOpen(false);
        useSidePanelStore.setState({ editPeriod: null, editEvent: null });
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Editar</h2>

            <SidePanelTitle />
            <SidePanelDescription />
            {editPeriod ? (
                <>
                    <SidePanelStart />
                    <SidePanelEnd />
                </>
            ) : (
                <SidePanelDate />
            )}
            <SidePanelColor />
            <SidePanelImageType />
            <ImageSection />

            <button>Atualizar</button>
        </form>
    )
}

export default SidePanelEditForm