import { useState } from "react";

const SidePanel = ({ isSidePanelOpen, setIsSidePanelOpen }: { isSidePanelOpen: boolean, setIsSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [selectedType, setSelectedType] = useState("period");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const periods = localStorage.getItem('periods');
        const newPeriod = {
            title: (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value,
            description: (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value,
            start: Number((e.currentTarget.elements.namedItem('start') as HTMLInputElement).value),
            end: Number((e.currentTarget.elements.namedItem('end') as HTMLInputElement).value),
            color: (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value,
        }

        if (periods) {
            const periodsArray = JSON.parse(periods);
            periodsArray.push(newPeriod);
            localStorage.setItem('periods', JSON.stringify(periodsArray));
        } else {
            localStorage.setItem('periods', JSON.stringify([newPeriod]));
        }
        e.currentTarget.reset();
        alert('Período adicionado com sucesso!');

        setIsSidePanelOpen(false);
    }

    return (
        <div className="side-panel" style={{ translate: isSidePanelOpen ? "0" : "100%" }}>
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

                <button>Criar</button>
            </form>
        </div>
    )
}

export default SidePanel