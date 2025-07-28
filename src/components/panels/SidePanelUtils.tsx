import { useEffect } from "react"
import { useSidePanelStore } from "../../store/sidePanelStore"

export const SidePanelTitle = () => {
    const titleValue = useSidePanelStore(state => state.titleValue)
    const editPeriod = useSidePanelStore(state => state.editPeriod)

    useEffect(() => {
        if (editPeriod) {
            useSidePanelStore.setState({ titleValue: editPeriod.title });
        }
    }, [editPeriod])

    return (
        <>
            <label htmlFor="side-panel-title-id">Título</label>
            <input type="text" name="title" id="side-panel-title-id" placeholder="Título" spellCheck={false} required
                value={titleValue} onChange={(e) => useSidePanelStore.setState({ titleValue: e.target.value })} />
        </>
    )
}

export const SidePanelDescription = () => {
    const editPeriod = useSidePanelStore(state => state.editPeriod)

    return (
        <>
            <label htmlFor="side-panel-description-id">Descrição</label>
            <textarea name="description" id="side-panel-description-id" placeholder="Descrição (opcional)"
                defaultValue={editPeriod ? editPeriod.description : ""}></textarea>
        </>
    )
}

export const SidePanelStart = () => {
    const editPeriod = useSidePanelStore(state => state.editPeriod)
    // console.log(editPeriod)

    return (
        <>
            <label htmlFor="side-panel-start-id">Começo</label>
            <input type="date" name="start" id="side-panel-start-id" spellCheck={false} required
                defaultValue={editPeriod ? editPeriod.start.toString() : "2010-01-01"} />
        </>
    )
}

export const SidePanelEnd = () => {
    const editPeriod = useSidePanelStore(state => state.editPeriod)

    return (
        <>
            <label htmlFor="side-panel-end-id">Fim</label>
            <input type="date" name="end" id="side-panel-end-id" spellCheck={false} required
                defaultValue={editPeriod ? editPeriod.end.toString() : "2010-01-01"} />
        </>
    )
}

export const SidePanelDate = () => {
    const editEvent = useSidePanelStore(state => state.editEvent)

    return (
        <>
            <label htmlFor="side-panel-date-id">Ano</label>
            <input type="date" name="date" id="side-panel-date-id" spellCheck={false} required
                defaultValue={editEvent ? editEvent.date.toString() : "2010-01-01"} />
        </>
    )
}

export const SidePanelColor = () => {
    const editPeriod = useSidePanelStore(state => state.editPeriod)

    return (
        <>
            <label htmlFor="side-panel-color-id">Cor</label>
            <input type="color" name="color" id="side-panel-color-id"
                defaultValue={editPeriod ? editPeriod.color : "#8ecae6"} />
        </>
    )
}