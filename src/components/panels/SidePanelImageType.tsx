import { useSidePanelStore } from "../../store/sidePanelStore";

const SidePanelImageType = () => {
    const imageSelectedType = useSidePanelStore(state => state.imageSelectedType)
    const setImageSelectedType = useSidePanelStore(state => state.setImageSelectedType)

    return (
        <div>
            <input
                type="radio"
                name="imageType"
                value="link"
                id="side-panel-link-type-id"
                checked={imageSelectedType === "link"}
                onChange={() => setImageSelectedType("link")} />
            <label htmlFor="side-panel-link-type-id">Link</label>
            <input
                type="radio"
                name="imageType"
                value="search"
                id="side-panel-search-type-id"
                checked={imageSelectedType === "search"}
                onChange={() => setImageSelectedType("search")} />
            <label htmlFor="side-panel-search-type-id">Search</label>
            <input
                type="radio"
                name="imageType"
                value="upload"
                id="side-panel-upload-type-id"
                checked={imageSelectedType === "upload"}
                onChange={() => setImageSelectedType("upload")} />
            <label htmlFor="side-panel-upload-type-id">Upload</label>
        </div>
    )
}

export default SidePanelImageType