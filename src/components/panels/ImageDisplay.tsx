import { useState } from "react"
import { useSidePanelStore } from "../../store/sidePanelStore";
const links = [
    'https://plus.unsplash.com/premium_photo-1667509349063-5540d95c4325?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

const ImageDisplay = () => {
    const linkIndex = useSidePanelStore(state => state.linkIndex)
    const setLinkIndex = useSidePanelStore(state => state.setLinkIndex)
    const setImageSelectedType = useSidePanelStore(state => state.setImageSelectedType)
    const [animation, setAnimation] = useState('')

    const handleForward = () => {
        if (animation === '') {
            setAnimation('sidePanelSwitchImage 1s ease forwards')
            setTimeout(() => {
                setLinkIndex(linkIndex + 1);
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
                setLinkIndex(linkIndex - 1);
            }, 500);
            setTimeout(() => {
                setAnimation('')
            }, 1000);
        }
    }

    const handleClick = () => {
        useSidePanelStore.setState({ linkValue: links[linkIndex % links.length] })
        setImageSelectedType("link")
    }

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

export default ImageDisplay