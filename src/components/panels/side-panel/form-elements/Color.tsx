import { useSidePanelStore } from '@/store/sidePanelStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Color = () => {
    const colorValue = useSidePanelStore((state) => state.colorValue);

    return (
        <div className="space-y-2">
            <Label htmlFor="side-panel-color-id">Cor</Label>
            <div className="flex items-center gap-2 rounded-lg border border-input bg-transparent p-1.5 pr-2.5">
                <label
                    htmlFor="side-panel-color-id"
                    className="relative h-7 w-10 shrink-0 cursor-pointer overflow-hidden rounded-md border border-border"
                    style={{ backgroundColor: colorValue }}
                    title="Escolher cor"
                >
                    <Input
                        type="color"
                        name="color"
                        id="side-panel-color-id"
                        value={colorValue}
                        onChange={(e) => useSidePanelStore.setState({ colorValue: e.target.value })}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                </label>
                <span className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                    {colorValue}
                </span>
            </div>
        </div>
    );
};

export default Color;
