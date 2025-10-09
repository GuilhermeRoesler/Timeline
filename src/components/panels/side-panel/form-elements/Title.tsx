import { useSidePanelStore } from "../../../../store/sidePanelStore"

const Title = () => {
    const titleValue = useSidePanelStore(state => state.titleValue)

    return (
        <>
            <label htmlFor="side-panel-title-id">Título</label>
            <input type="text" name="title" id="side-panel-title-id" placeholder="Título" spellCheck={false} required
                value={titleValue} onChange={(e) => useSidePanelStore.setState({ titleValue: e.target.value })} />
        </>
    )
}

export default Title;