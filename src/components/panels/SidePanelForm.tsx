import { usePeriodEventHandler } from "../../hooks/usePeriodEventHandler";
import { useSidePanelStore } from "../../store/sidePanelStore";

import SidePanelFormType from "./SidePanelFormType";
import { SidePanelColor, SidePanelDescription, SidePanelEnd, SidePanelStart, SidePanelTitle, SidePanelYear } from "./SidePanelUtils";

const SidePanelForm = () => {
    const selectedType = useSidePanelStore(state => state.selectedType)
    const imageSelectedType = useSidePanelStore(state => state.imageSelectedType)
    const setImageSelectedType = useSidePanelStore(state => state.setImageSelectedType)
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
                <SidePanelYear />
            )}
            <SidePanelColor />

            <div>
                <input
                    type="radio"
                    name="imageType"
                    value="search"
                    id="side-panel-search-type-id"
                    checked={imageSelectedType === "search"}
                    onChange={() => setImageSelectedType("search")} />
                <label htmlFor="side-panel-search-type-id">Search</label>
                <input
                    type="radio"
                    name="imageType"
                    value="upload"
                    id="side-panel-upload-type-id"
                    checked={imageSelectedType === "upload"}
                    onChange={() => setImageSelectedType("upload")} />
                <label htmlFor="side-panel-upload-type-id">Upload</label>
            </div>

            <label htmlFor="side-panel-image-id">Imagem</label>
            {imageSelectedType === "search" ? (
                <input type="text" name="imageSearch" id="side-panel-image-id" placeholder="Pesquisar imagem" />
            ) : (
                <input type="file" name="image" id="side-panel-image-id" accept="image/*" />
            )}

            <button>Criar</button>
        </form>
    )
}

export default SidePanelForm