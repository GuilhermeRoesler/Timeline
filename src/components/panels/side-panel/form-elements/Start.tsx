import { useSidePanelStore } from "../../../../store/sidePanelStore"

const Start = () => {
    const startValue = useSidePanelStore(state => state.startValue)

    return (
        <>
            <label htmlFor="side-panel-start-id">Começo</label>
            <input type="date" name="start" id="side-panel-start-id" spellCheck={false} required max="9999-12-31"
                value={startValue} onChange={(e) => useSidePanelStore.setState({ startValue: e.target.value })} />
        </>
    )
}

export default Start;