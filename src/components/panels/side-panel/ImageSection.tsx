import { useRef } from 'react';
import { useSidePanelStore } from '@/store/sidePanelStore';
import ImageDisplay from './ImageDisplay';
import ImageMiniBrowse from './ImageMiniBrowse';
import { fetchImages } from '@/services/unsplashService';
import { Search, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ImageSection = () => {
    const { imageSelectedType, titleValue, linkValue } = useSidePanelStore((state) => state);
    const searchRef = useRef<HTMLInputElement>(null);

    const handleSendSearch = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (!searchRef.current) return;

        const links = await fetchImages(searchRef.current?.value);
        useSidePanelStore.setState({ links });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const dataUrl = reader.result as string;
            useSidePanelStore.setState({ linkValue: dataUrl });
        };

        reader.readAsDataURL(file);
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
                    >
                        <Search className="h-4 w-4" />
                    </Button>
                    <Input
                        type="text"
                        name="imageLink"
                        id="side-panel-image-id"
                        placeholder="URL da imagem aqui"
                        value={linkValue}
                        onChange={(e) => useSidePanelStore.setState({ linkValue: e.target.value })}
                        className="rounded-l-none"
                    />
                </div>
                {linkValue && (
                    <img
                        src={linkValue}
                        alt="Link digitado incorretamente..."
                        className="rounded-lg"
                    />
                )}
            </div>
        );
    }

    if (imageSelectedType === 'search') {
        return (
            <div className="space-y-2">
                <Label htmlFor="side-panel-image-search-id">Buscar imagem</Label>
                <div className="flex gap-0">
                    <Input
                        ref={searchRef}
                        type="search"
                        name="image"
                        id="side-panel-image-search-id"
                        placeholder="Pesquise aqui..."
                        defaultValue={titleValue}
                        className="rounded-r-none"
                    />
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="rounded-l-none border-l-0"
                        onClick={(e) => void handleSendSearch(e)}
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
                <p className="text-xs text-destructive">
                    Não recomendado por ocupar espaço no localStorage
                </p>
                <Label htmlFor="side-panel-image-upload-id">Upload de imagem</Label>
                <Input
                    type="file"
                    name="image"
                    id="side-panel-image-upload-id"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                />
            </div>
        );
    }
};

export default ImageSection;
