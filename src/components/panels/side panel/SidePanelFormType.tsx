import { useSidePanelStore } from "../../../store/sidePanelStore"

const SidePanelFormType = () => {
    const selectedType = useSidePanelStore(state => state.selectedType)

    return (
        <div>
            <input
                type="radio"
                name="type"
                value="period"
                id="side-panel-period-id"
                checked={selectedType === "period"}
                onChange={() => useSidePanelStore.setState({ selectedType: "period" })} />
            <label htmlFor="side-panel-period-id">Período</label>
            <input
                type="radio"
                name="type"
                value="event"
                id="side-panel-event-id"
                checked={selectedType === "event"}
                onChange={() => useSidePanelStore.setState({ selectedType: "event" })} />
            <label htmlFor="side-panel-event-id">Evento</label>
        </div>
    )
}

export default SidePanelFormType