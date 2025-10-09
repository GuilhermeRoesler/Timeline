import { useState } from "react"
import { useSidePanelStore } from "../../../store/sidePanelStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageDisplay = () => {
    const { links, linkIndex } = useSidePanelStore(state => state)
    const [animation, setAnimation] = useState('')

    const handleForward = () => {
        if (animation === '') {
            setAnimation('sidePanelSwitchImage 1s ease forwards')
            setTimeout(() => {
                useSidePanelStore.setState({ linkIndex: linkIndex + 1 })
            }, 500);
            setTimeout(() => {
                setAnimation('')
            }, 1000);
        }
    }

    const handleBackwards = () => {
        if (animation === '') {
            setAnimation('sidePanelSwitchImage 1s ease forwards reverse')
            setTimeout(() => {
                useSidePanelStore.setState({ linkIndex: linkIndex - 1 })
            }, 500);
            setTimeout(() => {
                setAnimation('')
            }, 1000);
        }
    }

    const handleClick = () => {
        useSidePanelStore.setState({ linkValue: links[linkIndex % links.length] })
        useSidePanelStore.setState({ imageSelectedType: "link" })
    }
    if (!links.every(valor => valor === "")) {
        return (
            <div className="image-display">
                <button onClick={handleBackwards} className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-black/30 text-white p-1 rounded-full hover:scale-110 transition-transform">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <img src={links[linkIndex % links.length]} alt="Image display"
                    style={{ animation: animation }} />
                <button onClick={handleForward} className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-black/30 text-white p-1 rounded-full hover:scale-110 transition-transform">
                    <ChevronRight className="w-5 h-5" />
                </button>
                {!animation && <button onClick={handleClick}>Selecionar</button>}
            </div>
        )
    }
}

export default ImageDisplay