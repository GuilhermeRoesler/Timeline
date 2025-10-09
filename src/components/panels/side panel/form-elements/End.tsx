import { useSidePanelStore } from "../../../../store/sidePanelStore"

const End = () => {
    const endValue = useSidePanelStore(state => state.endValue)

    return (
        <>
            <label htmlFor="side-panel-end-id">Fim</label>
            <input type="date" name="end" id="side-panel-end-id" spellCheck={false} required max="9999-12-31"
                value={endValue} onChange={(e) => useSidePanelStore.setState({ endValue: e.target.value })} />
        </>
    )
}

export default End;