import { usePeriodEventHandler } from "../../hooks/usePeriodEventHandler";
import { useSidePanelStore } from "../../store/sidePanelStore";

import SidePanelFormType from "./SidePanelFormType";
import SidePanelImageType from "./SidePanelImageType";
import { SidePanelColor, SidePanelDescription, SidePanelEnd, SidePanelStart, SidePanelTitle, SidePanelDate } from "./SidePanelUtils";
import ImageSection from "./ImageSection";

const SidePanelForm = () => {
    const selectedType = useSidePanelStore(state => state.selectedType)
    const { addPeriod, addEvent } = usePeriodEventHandler();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedType === "period") {
            addPeriod(e);
        } else if (selectedType === "event") {
            addEvent(e);
        }

        e.currentTarget.reset(); // Clear the form after submission
        useSidePanelStore.getState().setIsSidePanelOpen(false);
        useSidePanelStore.getState().titleValue = "";
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Adicionar</h2>
            <SidePanelFormType />

            <SidePanelTitle />
            <SidePanelDescription />
            {selectedType === "period" ? (
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

            <button>Criar</button>
        </form>
    )
}

export default SidePanelForm