import { X } from "lucide-react";

const InfoCardContent = ({ title, date, description, image, onClose, onDelete }:
    { title: string, date: string, description: string, image: string, onClose: () => void, onDelete: () => void }) => {

    return (
        <div className="content">
            <h3 className="title">{title}</h3>
            <button onClick={onClose} className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-600" />
            </button>
            <p className="date">{date}</p>
            <p className="description">{description || "Add a description here..."}</p>
            {image && <img src={image} alt={title} />}
            <button className="delete" onClick={onDelete}>Delete</button>
        </div>
    )
}

export default InfoCardContent