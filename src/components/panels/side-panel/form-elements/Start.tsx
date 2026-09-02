import { useSidePanelStore } from '@/store/sidePanelStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Start = () => {
    const startValue = useSidePanelStore((state) => state.startValue);

    return (
        <div className="space-y-2">
            <Label htmlFor="side-panel-start-id">Começo</Label>
            <Input
                type="date"
                name="start"
                id="side-panel-start-id"
                spellCheck={false}
                required
                max="9999-12-31"
                value={startValue}
                onChange={(e) => useSidePanelStore.setState({ startValue: e.target.value })}
            />
        </div>
    );
};

export default Start;
