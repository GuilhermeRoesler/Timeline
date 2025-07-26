import { useState } from "react";
import { usePeriodEventHandler } from "../../hooks/usePeriodEventHandler";

const SidePanel = ({ isSidePanelOpen, setIsSidePanelOpen }: { isSidePanelOpen: boolean, setIsSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [selectedType, setSelectedType] = useState("period");
    const { addPeriod, addEvent } = usePeriodEventHandler();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (selectedType === "period") {
            addPeriod(e);
        } else if (selectedType === "event") {
            addEvent(e);
        }

        setIsSidePanelOpen(false);
    }

    return (
        <div className="side-panel" style={{ translate: isSidePanelOpen ? "0 -50%" : "100% -50%" }}>
            <div className="open-close-area" onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
                <i className={`fa-solid fa-chevron-${isSidePanelOpen ? 'right' : 'left'}`}></i>
            </div>
            <i className="fa-solid fa-xmark" onClick={() => setIsSidePanelOpen(false)}></i>

            <form onSubmit={handleSubmit}>
                <h2>Adicionar</h2>
                <div>
                    <input
                        type="radio"
                        name="type"
                        value="period"
                        id="side-panel-period-id"
                        checked={selectedType === "period"}
                        onChange={() => setSelectedType("period")} />
                    <label htmlFor="side-panel-period-id">Período</label>
                    <input
                        type="radio"
                        name="type"
                        value="event"
                        id="side-panel-event-id"
                        checked={selectedType === "event"}
                        onChange={() => setSelectedType("event")} />
                    <label htmlFor="side-panel-event-id">Evento</label>
                </div>

                <label htmlFor="side-panel-title-id">Título</label>
                <input type="text" name="title" id="side-panel-title-id" placeholder="Título" spellCheck={false} required />

                <label htmlFor="side-panel-description-id">Descrição</label>
                <textarea name="description" id="side-panel-description-id" placeholder="Descrição (opcional)"></textarea>

                {selectedType === "period" ? (
                    <>
                        <label htmlFor="side-panel-start-id">Começo</label>
                        <input type="number" name="start" id="side-panel-start-id" spellCheck={false} required />

                        <label htmlFor="side-panel-end-id">Fim</label>
                        <input type="number" name="end" id="side-panel-end-id" spellCheck={false} required />
                    </>
                ) : (
                    <>
                        <label htmlFor="side-panel-year-id">Ano</label>
                        <input type="number" name="year" id="side-panel-year-id" spellCheck={false} required />
                    </>
                )}

                <label htmlFor="side-panel-color-id">Cor</label>
                <input type="color" name="color" id="side-panel-color-id" defaultValue={"#8ecae6"} />

                <label htmlFor="side-panel-image-id">Imagem</label>
                <input type="file" name="image" id="side-panel-image-id" accept="image/*" />

                <button>Criar</button>
            </form>
        </div>
    )
}

export default SidePanel