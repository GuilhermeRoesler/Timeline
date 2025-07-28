import { useSidePanelStore } from "../../store/sidePanelStore"
const links = [
    'https://plus.unsplash.com/premium_photo-1667509349063-5540d95c4325?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // 'https://plus.unsplash.com/premium_photo-1661476090700-b19017477c85?q=80&w=1278&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // 'https://plus.unsplash.com/premium_photo-1661476090700-b19017477c85?q=80&w=1278&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // 'https://plus.unsplash.com/premium_photo-1661476090700-b19017477c85?q=80&w=1278&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    // 'https://plus.unsplash.com/premium_photo-1661476090700-b19017477c85?q=80&w=1278&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
]

const ImageMiniBrowse = () => {
    return (
        <div className='image-mini-browse'>
            {links.map((link, index) => <img key={index} src={link} alt={`image-${index}`}
                onClick={() => useSidePanelStore.setState({ linkIndex: index })} />)}
        </div>
    )
}

export default ImageMiniBrowse