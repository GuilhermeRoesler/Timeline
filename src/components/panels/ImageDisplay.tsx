import { useState } from "react"
import { useSidePanelStore } from "../../store/sidePanelStore";

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
                <i onClick={handleBackwards} className="fa-solid fa-chevron-left"></i>
                <img src={links[linkIndex % links.length]} alt="Image display"
                    style={{ animation: animation }} />
                <i onClick={handleForward} className="fa-solid fa-chevron-right"></i>
                {!animation && <button onClick={handleClick}>Selecionar</button>}
            </div>
        )
    }
}

export default ImageDisplay