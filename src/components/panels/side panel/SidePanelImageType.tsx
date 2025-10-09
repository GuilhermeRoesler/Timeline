import { useSidePanelStore } from "../../../store/sidePanelStore";

const SidePanelImageType = () => {
    const imageSelectedType = useSidePanelStore(state => state.imageSelectedType)

    return (
        <div>
            <input
                type="radio"
                name="imageType"
                value="link"
                id="side-panel-link-type-id"
                checked={imageSelectedType === "link"}
                onChange={() => useSidePanelStore.setState({ imageSelectedType: "link" })} />
            <label htmlFor="side-panel-link-type-id">Link</label>
            <input
                type="radio"
                name="imageType"
                value="search"
                id="side-panel-search-type-id"
                checked={imageSelectedType === "search"}
                onChange={() => useSidePanelStore.setState({ imageSelectedType: "search" })} />
            <label htmlFor="side-panel-search-type-id">Search</label>
            <input
                type="radio"
                name="imageType"
                value="upload"
                id="side-panel-upload-type-id"
                checked={imageSelectedType === "upload"}
                onChange={() => useSidePanelStore.setState({ imageSelectedType: "upload" })} />
            <label htmlFor="side-panel-upload-type-id">Upload</label>
        </div>
    )
}

export default SidePanelImageType