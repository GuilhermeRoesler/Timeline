import { useSidePanelStore } from '@/store/sidePanelStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Title = () => {
    const titleValue = useSidePanelStore((state) => state.titleValue);

    return (
        <div className="space-y-2">
            <Label htmlFor="side-panel-title-id">Título</Label>
            <Input
                type="text"
                name="title"
                id="side-panel-title-id"
                placeholder="Título"
                spellCheck={false}
                required
                value={titleValue}
                onChange={(e) => useSidePanelStore.setState({ titleValue: e.target.value })}
            />
        </div>
    );
};

export default Title;
