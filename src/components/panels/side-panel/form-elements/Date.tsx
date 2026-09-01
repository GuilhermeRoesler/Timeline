import { useSidePanelStore } from "../../../../store/sidePanelStore"

const Date = () => {
    const dateValue = useSidePanelStore(state => state.dateValue)

    return (
        <>
            <label htmlFor="side-panel-date-id">Ano</label>
            <input type="date" name="date" id="side-panel-date-id" spellCheck={false} required max="9999-12-31"
                value={dateValue} onChange={(e) => useSidePanelStore.setState({ dateValue: e.target.value })} />
        </>
    )
}

export default Date;