import { useRef } from "react";
import { useSidePanelStore } from "../../../store/sidePanelStore";
import ImageDisplay from "./ImageDisplay";
import ImageMiniBrowse from "./ImageMiniBrowse";
import { fetchImages } from "../../../services/unsplashService";
import { Search, Send } from "lucide-react";

const ImageSection = () => {
    const { imageSelectedType, titleValue, linkValue } = useSidePanelStore(state => state)
    const searchRef = useRef<HTMLInputElement>(null)

    const handleSendSearch = async (e: React.MouseEvent) => {
        e.preventDefault()

        if (!searchRef.current) return

        const links = await fetchImages(searchRef.current?.value)
        useSidePanelStore.setState({ links })
    }

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const dataUrl = reader.result as string;
            useSidePanelStore.setState({ linkValue: dataUrl })
        };

        reader.readAsDataURL(file);
    }

    if (imageSelectedType === "link") {
        return (
            <>
                <label htmlFor="side-panel-image-id">Imagem</label>
                <div className="link">
                    <button onClick={() => useSidePanelStore.setState({ imageSelectedType: "search" })}><Search className="w-5 h-5" /></button>
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
                    <button onClick={e => handleSendSearch(e)}><Send className="w-5 h-5" /></button>
                </div>
                <ImageDisplay />
                <ImageMiniBrowse />
            </>
        )
    }

    if (imageSelectedType === "upload") {
        return (
            <>
                <span style={{ fontSize: 12, color: "red" }}>Not recomended because of space in localStorage</span>
                <label htmlFor="side-panel-image-id">Imagem</label>
                <input type="file" name="image" id="side-panel-image-id" accept="image/*" onChange={e => handleFileUpload(e)} />
            </>
        )
    }
}

export default ImageSection