import { useRef } from 'react';
import { useSidePanelStore } from '@/store/sidePanelStore';
import ImageDisplay from './ImageDisplay';
import ImageMiniBrowse from './ImageMiniBrowse';
import { fetchImages } from '@/services/unsplashService';
import { compressImageFile } from '@/utils/compressImage';
import { getResponsiveImageProps } from '@/utils/responsiveImage';
import { Search, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ImageSection = () => {
    const { imageSelectedType, titleValue, linkValue } = useSidePanelStore((state) => state);
    const searchRef = useRef<HTMLInputElement>(null);
    const previewProps = getResponsiveImageProps(linkValue, {
        widths: [400, 800],
        sizes: '100%',
    });

    const handleSendSearch = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!searchRef.current) return;

        const links = await fetchImages(searchRef.current?.value);
        useSidePanelStore.setState({ links: links ?? [], linkIndex: 0 });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        void compressImageFile(file)
            .then((dataUrl) => {
                useSidePanelStore.setState({ linkValue: dataUrl });
            })
            .catch((erro) => {
                console.error(erro);
            });
    };

    if (imageSelectedType === 'link') {
        return (
            <div className="space-y-2">
                <Label htmlFor="side-panel-image-id">URL da imagem</Label>
                <div className="flex gap-0">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-r-none border-r-0"
                        onClick={() => useSidePanelStore.setState({ imageSelectedType: 'search' })}
                        title="Buscar imagem"
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                    <Input
                        type="text"
                        name="imageLink"
                        id="side-panel-image-id"
                        placeholder="https://..."
                        value={linkValue}
                        onChange={(e) => useSidePanelStore.setState({ linkValue: e.target.value })}
                        className="rounded-l-none"
                    />
                </div>
                {linkValue && (
                    <img
                        {...previewProps}
                        alt="Pré-visualização"
                        loading="lazy"
                        decoding="async"
                        className="mt-1 max-h-40 w-full rounded-lg border border-border object-cover"
                    />
                )}
            </div>
        );
    }

    if (imageSelectedType === 'search') {
        return (
            <div className="space-y-2">
                <Label htmlFor="side-panel-image-search-id">Buscar no Unsplash</Label>
                <div className="flex gap-0">
                    <Input
                        ref={searchRef}
                        type="search"
                        name="image"
                        id="side-panel-image-search-id"
                        placeholder="Ex: revolução industrial"
                        defaultValue={titleValue}
                        className="rounded-r-none"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-l-none border-l-0"
                        onClick={(e) => void handleSendSearch(e)}
                        title="Buscar"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
                <ImageDisplay />
                <ImageMiniBrowse />
            </div>
        );
    }

    if (imageSelectedType === 'upload') {
        return (
            <div className="space-y-2">
                <div className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                    Upload é redimensionado (máx. 1200px) e comprimido em WebP, mas ainda ocupa
                    espaço no armazenamento local. Prefira link ou busca quando possível.
                </div>
                <Label htmlFor="side-panel-image-upload-id">Arquivo de imagem</Label>
                <Input
                    type="file"
                    name="image"
                    id="side-panel-image-upload-id"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                />
                {linkValue.startsWith('data:') && (
                    <img
                        src={linkValue}
                        alt="Pré-visualização do upload"
                        loading="lazy"
                        decoding="async"
                        className="mt-1 max-h-40 w-full rounded-lg border border-border object-cover"
                    />
                )}
            </div>
        );
    }
};

export default ImageSection;
