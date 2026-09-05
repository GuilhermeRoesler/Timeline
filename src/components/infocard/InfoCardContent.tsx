import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const InfoCardContent = ({
    title,
    date,
    description,
    image,
    onClose,
    onDelete,
}: {
    title: string;
    date: string;
    description: string;
    image: string;
    onClose: () => void;
    onDelete: () => void;
}) => {
    return (
        <div className="content">
            <h3 className="title">{title}</h3>
            <Button
                variant="ghost"
                size="icon-sm"
                onClick={onClose}
                className="absolute top-2 right-2"
                aria-label="Fechar"
            >
                <X className="h-5 w-5 text-muted-foreground" />
            </Button>
            <p className="date">{date}</p>
            <p className="description">{description || 'Adicione uma descrição aqui...'}</p>
            {image && <img src={image} alt={title} />}
            <Button
                variant="outline"
                size="sm"
                className="delete text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={onDelete}
            >
                Excluir
            </Button>
        </div>
    );
};

export default InfoCardContent;
