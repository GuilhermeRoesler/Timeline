import { useSidePanelStore } from "../../store/sidePanelStore";
import ImageDisplay from "./ImageDisplay";
import ImageMiniBrowse from "./ImageMiniBrowse";

const ImageSection = () => {
    const imageSelectedType = useSidePanelStore(state => state.imageSelectedType)
    const titleValue = useSidePanelStore(state => state.titleValue)
    const linkValue = useSidePanelStore(state => state.linkValue)

    const handleSendSearch = () => {

    }

    if (imageSelectedType === "link") {
        return (
            <>
                <label htmlFor="side-panel-image-id">Imagem</label>
                <div className="link">
                    <button onClick={() => useSidePanelStore.setState({ imageSelectedType: "search" })}><i className="fa-solid fa-magnifying-glass"></i></button>
                    <input type="text" name="imageLink" id="side-panel-image-id" placeholder="URL da imagem aqui"
                        value={linkValue} onChange={(e) => useSidePanelStore.setState({ linkValue: e.target.value })} />
                </div>
                {linkValue && <img src={linkValue} alt="Link digitado incorretamente..." />}
            </>
        )
    }

    if (imageSelectedType === "search") {
        return (
            <>
                <label htmlFor="side-panel-image-id">Imagem</label>
                <div className="search">
                    <input type="search" name="image" id="side-panel-image-id" placeholder="Pesquise aqui..."
                        value={titleValue} onChange={(e) => useSidePanelStore.setState({ titleValue: e.target.value })} />
                    <button onClick={handleSendSearch}><i className="material-symbols-outlined">send</i></button>
                </div>
                <ImageDisplay />
                <ImageMiniBrowse />
            </>
        )
    }

    if (imageSelectedType === "upload") {
        return (
            <>
                <label htmlFor="side-panel-image-id">Imagem</label>
                <input type="file" name="image" id="side-panel-image-id" accept="image/*" />
            </>
        )
    }
}

export default ImageSection