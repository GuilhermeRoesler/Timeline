import { useSidePanelStore } from '@/store/sidePanelStore';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SidePanelImageType = () => {
    const imageSelectedType = useSidePanelStore((state) => state.imageSelectedType);

    return (
        <div className="space-y-2">
            <Label>Imagem</Label>
            <RadioGroup
                value={imageSelectedType}
                onValueChange={(value) =>
                    useSidePanelStore.setState({
                        imageSelectedType: value as 'link' | 'search' | 'upload',
                    })
                }
                className="flex flex-wrap gap-4"
            >
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="link" id="side-panel-link-type-id" />
                    <Label htmlFor="side-panel-link-type-id" className="font-normal">
                        Link
                    </Label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="search" id="side-panel-search-type-id" />
                    <Label htmlFor="side-panel-search-type-id" className="font-normal">
                        Busca
                    </Label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="upload" id="side-panel-upload-type-id" />
                    <Label htmlFor="side-panel-upload-type-id" className="font-normal">
                        Upload
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
};

export default SidePanelImageType;
