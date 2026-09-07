import { Calendar, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getResponsiveImageProps } from '@/utils/responsiveImage';

const InfoCardContent = ({
    title,
    date,
    description,
    image,
    color,
    kind,
    onClose,
    onDelete,
}: {
    title: string;
    date: string;
    description: string;
    image: string;
    color: string;
    kind: 'period' | 'event';
    onClose: () => void;
    onDelete: () => void;
}) => {
    const imageProps = getResponsiveImageProps(image, {
        widths: [400, 800],
        sizes: '(max-width: 640px) 90vw, 280px',
    });

    return (
        <>
            <div className="accent-bar" style={{ backgroundColor: color }} />
            <div className="content">
                <div className="meta">
                    <Badge
                        variant="secondary"
                        className="bg-accent text-accent-foreground"
                        style={{
                            backgroundColor: `${color}22`,
                            color: color,
                            borderColor: `${color}44`,
                        }}
                    >
                        {kind === 'period' ? 'Período' : 'Evento'}
                    </Badge>
                    <p className="date flex items-center gap-1">
                        <Calendar className="size-3 opacity-70" />
                        {date}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={onClose}
                    className="absolute top-3 right-2"
                    aria-label="Fechar"
                >
                    <X className="h-4 w-4 text-muted-foreground" />
                </Button>
                <h3 className="title">{title}</h3>
                <p className="description">
                    {description || 'Adicione uma descrição no painel de edição.'}
                </p>
                {image && <img {...imageProps} alt={title} loading="lazy" decoding="async" />}
                <div className="footer">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={onDelete}
                    >
                        Excluir
                    </Button>
                </div>
            </div>
        </>
    );
};

export default InfoCardContent;
