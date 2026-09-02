import { useSidePanelStore } from '@/store/sidePanelStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Date = () => {
    const dateValue = useSidePanelStore((state) => state.dateValue);

    return (
        <div className="space-y-2">
            <Label htmlFor="side-panel-date-id">Ano</Label>
            <Input
                type="date"
                name="date"
                id="side-panel-date-id"
                spellCheck={false}
                required
                max="9999-12-31"
                value={dateValue}
                onChange={(e) => useSidePanelStore.setState({ dateValue: e.target.value })}
            />
        </div>
    );
};

export default Date;
