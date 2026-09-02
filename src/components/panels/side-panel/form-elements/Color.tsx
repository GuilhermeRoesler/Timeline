import { useSidePanelStore } from '@/store/sidePanelStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Color = () => {
    const colorValue = useSidePanelStore((state) => state.colorValue);

    return (
        <div className="space-y-2">
            <Label htmlFor="side-panel-color-id">Cor</Label>
            <Input
                type="color"
                name="color"
                id="side-panel-color-id"
                value={colorValue}
                onChange={(e) => useSidePanelStore.setState({ colorValue: e.target.value })}
                className="h-10 w-full cursor-pointer p-1"
            />
        </div>
    );
};

export default Color;
