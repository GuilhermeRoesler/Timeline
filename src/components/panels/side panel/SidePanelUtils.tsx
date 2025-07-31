import { generateText } from "../../../services/cohereService"
import { useSidePanelStore } from "../../../store/sidePanelStore"

export const SidePanelTitle = () => {
    const titleValue = useSidePanelStore(state => state.titleValue)

    return (
        <>
            <label htmlFor="side-panel-title-id">Título</label>
            <input type="text" name="title" id="side-panel-title-id" placeholder="Título" spellCheck={false} required
                value={titleValue} onChange={(e) => useSidePanelStore.setState({ titleValue: e.target.value })} />
        </>
    )
}

export const SidePanelDescription = () => {
    const titleValue = useSidePanelStore(state => state.titleValue)
    const descriptionValue = useSidePanelStore(state => state.descriptionValue)

    const handleGenerate = async () => {
        useSidePanelStore.setState({ descriptionValue: "Gerando, aguarde um momento..." })
        const generatedAnswer = await generateText(titleValue)
        useSidePanelStore.setState({ descriptionValue: generatedAnswer })
    }

    return (
        <>
            <div>
                <label htmlFor="side-panel-description-id">Descrição</label>
                <span className="material-symbols-outlined" onClick={handleGenerate}>flare</span>
            </div>
            <textarea name="description" id="side-panel-description-id" placeholder="Descrição (opcional)"
                value={descriptionValue} onChange={(e) => useSidePanelStore.setState({ descriptionValue: e.target.value })}></textarea>
        </>
    )
}

export const SidePanelStart = () => {
    const startValue = useSidePanelStore(state => state.startValue)

    return (
        <>
            <label htmlFor="side-panel-start-id">Começo</label>
            <input type="date" name="start" id="side-panel-start-id" spellCheck={false} required max="9999-12-31"
                value={startValue} onChange={(e) => useSidePanelStore.setState({ startValue: e.target.value })} />
        </>
    )
}

export const SidePanelEnd = () => {
    const endValue = useSidePanelStore(state => state.endValue)

    return (
        <>
            <label htmlFor="side-panel-end-id">Fim</label>
            <input type="date" name="end" id="side-panel-end-id" spellCheck={false} required max="9999-12-31"
                value={endValue} onChange={(e) => useSidePanelStore.setState({ endValue: e.target.value })} />
        </>
    )
}

export const SidePanelDate = () => {
    const dateValue = useSidePanelStore(state => state.dateValue)

    return (
        <>
            <label htmlFor="side-panel-date-id">Ano</label>
            <input type="date" name="date" id="side-panel-date-id" spellCheck={false} required max="9999-12-31"
                value={dateValue} onChange={(e) => useSidePanelStore.setState({ dateValue: e.target.value })} />
        </>
    )
}

export const SidePanelColor = () => {
    const colorValue = useSidePanelStore(state => state.colorValue)

    return (
        <>
            <label htmlFor="side-panel-color-id">Cor</label>
            <input type="color" name="color" id="side-panel-color-id"
                value={colorValue} onChange={(e) => useSidePanelStore.setState({ colorValue: e.target.value })} />
        </>
    )
}