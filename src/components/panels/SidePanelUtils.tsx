export const SidePanelTitle = () => {
    return (
        <>
            <label htmlFor="side-panel-title-id">Título</label>
            <input type="text" name="title" id="side-panel-title-id" placeholder="Título" spellCheck={false} required />
        </>
    )
}

export const SidePanelDescription = () => {
    return (
        <>
            <label htmlFor="side-panel-description-id">Descrição</label>
            <textarea name="description" id="side-panel-description-id" placeholder="Descrição (opcional)"></textarea>
        </>
    )
}

export const SidePanelStart = () => {
    return (
        <>
            <label htmlFor="side-panel-start-id">Começo</label>
            <input type="date" name="start" id="side-panel-start-id" spellCheck={false} required defaultValue={"2010-01-01"} />
        </>
    )
}

export const SidePanelEnd = () => {
    return (
        <>
            <label htmlFor="side-panel-end-id">Fim</label>
            <input type="date" name="end" id="side-panel-end-id" spellCheck={false} required defaultValue={"2010-01-01"} />
        </>
    )
}

export const SidePanelYear = () => {
    return (
        <>
            <label htmlFor="side-panel-year-id">Ano</label>
            <input type="date" name="year" id="side-panel-year-id" spellCheck={false} required defaultValue={"2010-01-01"} />
        </>
    )
}

export const SidePanelColor = () => {
    return (
        <>
            <label htmlFor="side-panel-color-id">Cor</label>
            <input type="color" name="color" id="side-panel-color-id" defaultValue={"#8ecae6"} />
        </>
    )
}