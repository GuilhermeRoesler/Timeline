import { useSidePanelStore } from "../../../../store/sidePanelStore"

const Color = () => {
    const colorValue = useSidePanelStore(state => state.colorValue)

    return (
        <>
            <label htmlFor="side-panel-color-id">Cor</label>
            <input type="color" name="color" id="side-panel-color-id"
                value={colorValue} onChange={(e) => useSidePanelStore.setState({ colorValue: e.target.value })} />
        </>
    )
}

export default Color;