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
                <button onClick={handleBackwards} className="absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-black/50 opacity-[0.8] text-white p-1 rounded-full hover:scale-110 transition-transform transition duration-300">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <img src={links[linkIndex % links.length]} alt="Image display"
                    style={{ animation: animation }} />
                <button onClick={handleForward} className="absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-black/50 opacity-[0.8] text-white p-1 rounded-full hover:scale-110 transition-transform transition duration-300">
                    <ChevronRight className="w-5 h-5" />
                </button>
                {!animation && <button onClick={handleClick} className="absolute px-4 py-2 bottom-0 left-50 -translate-y-1 hover:-translate-y-2 translate-x-1/2 bg-black/50 opacity-[0.8] z-5 transition duration-300">Selecionar</button>}
            </div>
        )
    }
}

export default ImageDisplay