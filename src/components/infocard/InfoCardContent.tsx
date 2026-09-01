
const InfoCardContent = ({ title, date, description, image, onClose, onDelete }:
    { title: string, date: string, description: string, image: string, onClose: () => void, onDelete: () => void }) => {

    return (
        <div className="content">
            <h3 className="title">{title}</h3>
            <i className="fa-solid fa-xmark" onClick={onClose}></i>
            <p className="date">{date}</p>
            <p className="description">{description || "Add a description here..."}</p>
            {image && <img src={image} alt={title} />}
            <button className="delete" onClick={onDelete}>Delete</button>
        </div>
    )
}

export default InfoCardContent