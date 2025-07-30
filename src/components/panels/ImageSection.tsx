import { useRef } from "react";
import { useSidePanelStore } from "../../store/sidePanelStore";
import ImageDisplay from "./ImageDisplay";
import ImageMiniBrowse from "./ImageMiniBrowse";
import { fetchImages } from "../../services/unsplashService";

const ImageSection = () => {
    const { imageSelectedType, titleValue, linkValue } = useSidePanelStore(state => state)
    const searchRef = useRef<HTMLInputElement>(null)

    const handleSendSearch = async (e: React.MouseEvent) => {
        e.preventDefault()

        if (!searchRef.current) return

        const links = await fetchImages(searchRef.current?.value)
        useSidePanelStore.setState({ links })
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
                    <input ref={searchRef} type="search" name="image" id="side-panel-image-id" placeholder="Pesquise aqui..."
                        defaultValue={titleValue} />
                    <button onClick={e => handleSendSearch(e)}><i className="material-symbols-outlined">send</i></button>
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