import { useRef } from "react";
import { useSidePanelStore } from "../../store/sidePanelStore";
import ImageDisplay from "./ImageDisplay";
import ImageMiniBrowse from "./ImageMiniBrowse";
import axios from "axios";

const ImageSection = () => {
    const { imageSelectedType, titleValue, linkValue } = useSidePanelStore(state => state)
    const searchRef = useRef<HTMLInputElement>(null)

    const handleSendSearch = async (e: React.MouseEvent) => {
        e.preventDefault()

        try {
            const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
            const answer = await axios.get("https://api.unsplash.com/search/photos", {
                params: {
                    query: searchRef.current?.value,
                    client_id: apiKey
                }
            })
            const results = answer.data.results
            useSidePanelStore.setState({ links: results.map((result: any) => result.urls.small) })
        } catch (erro) {
            console.error(erro)
        }
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
                        value={titleValue} onChange={(e) => useSidePanelStore.setState({ titleValue: e.target.value })} />
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