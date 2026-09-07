import { useSidePanelStore } from '@/store/sidePanelStore';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link2, Search, Upload } from 'lucide-react';

const SidePanelImageType = () => {
    const imageSelectedType = useSidePanelStore((state) => state.imageSelectedType);

    return (
        <Tabs
            value={imageSelectedType}
            onValueChange={(value) => {
                if (value === 'link' || value === 'search' || value === 'upload') {
                    useSidePanelStore.setState({ imageSelectedType: value });
                }
            }}
            className="w-full gap-0"
        >
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="link" className="gap-1.5">
                    <Link2 className="size-3.5" />
                    Link
                </TabsTrigger>
                <TabsTrigger value="search" className="gap-1.5">
                    <Search className="size-3.5" />
                    Busca
                </TabsTrigger>
                <TabsTrigger value="upload" className="gap-1.5">
                    <Upload className="size-3.5" />
                    Upload
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default SidePanelImageType;
