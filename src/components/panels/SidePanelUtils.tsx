import { useEffect } from "react"
import { useSidePanelStore } from "../../store/sidePanelStore"

export const SidePanelTitle = () => {
    const titleValue = useSidePanelStore(state => state.titleValue)
    const editPeriod = useSidePanelStore(state => state.editPeriod)
    const editEvent = useSidePanelStore(state => state.editEvent)

    useEffect(() => {
        if (editPeriod) {
            useSidePanelStore.setState({ titleValue: editPeriod.title });
        } else if (editEvent) {
            useSidePanelStore.setState({ titleValue: editEvent.title });
        }
    }, [editPeriod, editEvent])

    return (
        <>
            <label htmlFor="side-panel-title-id">Título</label>
            <input type="text" name="title" id="side-panel-title-id" placeholder="Título" spellCheck={false} required
                value={titleValue} onChange={(e) => useSidePanelStore.setState({ titleValue: e.target.value })} />
        </>
    )
}

export const SidePanelDescription = () => {
    const descriptionValue = useSidePanelStore(state => state.descriptionValue)
    const editPeriod = useSidePanelStore(state => state.editPeriod)
    const editEvent = useSidePanelStore(state => state.editEvent)

    useEffect(() => {
        if (editPeriod) {
            useSidePanelStore.setState({ descriptionValue: editPeriod.description });
        } else if (editEvent) {
            useSidePanelStore.setState({ descriptionValue: editEvent.description });
        }
    }, [editPeriod, editEvent])

    return (
        <>
            <label htmlFor="side-panel-description-id">Descrição</label>
            <textarea name="description" id="side-panel-description-id" placeholder="Descrição (opcional)"
                value={descriptionValue} onChange={(e) => useSidePanelStore.setState({ descriptionValue: e.target.value })}></textarea>
        </>
    )
}

export const SidePanelStart = () => {
    const startValue = useSidePanelStore(state => state.startValue)
    const editPeriod = useSidePanelStore(state => state.editPeriod)

    useEffect(() => {
        if (editPeriod)
            useSidePanelStore.setState({ startValue: editPeriod.start.toString() });
    }, [editPeriod])

    return (
        <>
            <label htmlFor="side-panel-start-id">Começo</label>
            <input type="date" name="start" id="side-panel-start-id" spellCheck={false} required
                value={startValue} onChange={(e) => useSidePanelStore.setState({ startValue: e.target.value })} />
        </>
    )
}

export const SidePanelEnd = () => {
    const endValue = useSidePanelStore(state => state.endValue)
    const editPeriod = useSidePanelStore(state => state.editPeriod)

    useEffect(() => {
        if (editPeriod)
            useSidePanelStore.setState({ endValue: editPeriod.end.toString() });
    }, [editPeriod])

    return (
        <>
            <label htmlFor="side-panel-end-id">Fim</label>
            <input type="date" name="end" id="side-panel-end-id" spellCheck={false} required
                value={endValue} onChange={(e) => useSidePanelStore.setState({ endValue: e.target.value })} />
        </>
    )
}

export const SidePanelDate = () => {
    const dateValue = useSidePanelStore(state => state.dateValue)
    const editEvent = useSidePanelStore(state => state.editEvent)

    useEffect(() => {
        if (editEvent)
            useSidePanelStore.setState({ dateValue: editEvent.date.toString() });
    }, [editEvent])

    return (
        <>
            <label htmlFor="side-panel-date-id">Ano</label>
            <input type="date" name="date" id="side-panel-date-id" spellCheck={false} required
                value={dateValue} onChange={(e) => useSidePanelStore.setState({ dateValue: e.target.value })} />
        </>
    )
}

export const SidePanelColor = () => {
    const colorValue = useSidePanelStore(state => state.colorValue)
    const editPeriod = useSidePanelStore(state => state.editPeriod)
    const editEvent = useSidePanelStore(state => state.editEvent)

    useEffect(() => {
        if (editPeriod)
            useSidePanelStore.setState({ colorValue: editPeriod.color });
        else if (editEvent)
            useSidePanelStore.setState({ colorValue: editEvent.color });
    }, [editPeriod, editEvent])

    return (
        <>
            <label htmlFor="side-panel-color-id">Cor</label>
            <input type="color" name="color" id="side-panel-color-id"
                value={colorValue} onChange={(e) => useSidePanelStore.setState({ colorValue: e.target.value })} />
        </>
    )
}