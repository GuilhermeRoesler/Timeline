import { useSidePanelStore } from '@/store/sidePanelStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const End = () => {
    const endValue = useSidePanelStore((state) => state.endValue);

    return (
        <div className="space-y-2">
            <Label htmlFor="side-panel-end-id">Fim</Label>
            <Input
                type="date"
                name="end"
                id="side-panel-end-id"
                spellCheck={false}
                required
                max="9999-12-31"
                value={endValue}
                onChange={(e) => useSidePanelStore.setState({ endValue: e.target.value })}
            />
        </div>
    );
};

export default End;
