import { useSidePanelStore } from "../../../store/sidePanelStore"

const ImageMiniBrowse = () => {
    const links = useSidePanelStore(state => state.links)

    if (!links.every(valor => valor === "")) {
        return (
            <div className='image-mini-browse'>
                {links.map((link, index) => <img key={index} src={link} alt={`image-${index}`}
                    onClick={() => useSidePanelStore.setState({ linkIndex: index })} />)}
            </div>
        )
    }
}

export default ImageMiniBrowse