import { useSidePanelStore } from '@/store/sidePanelStore';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const SidePanelFormType = () => {
    const selectedType = useSidePanelStore((state) => state.selectedType);

    return (
        <div className="space-y-2">
            <Label>Tipo</Label>
            <RadioGroup
                value={selectedType}
                onValueChange={(value) =>
                    useSidePanelStore.setState({ selectedType: value as 'period' | 'event' })
                }
                className="flex gap-4"
            >
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="period" id="side-panel-period-id" />
                    <Label htmlFor="side-panel-period-id" className="font-normal">
                        Período
                    </Label>
                </div>
                <div className="flex items-center gap-2">
                    <RadioGroupItem value="event" id="side-panel-event-id" />
                    <Label htmlFor="side-panel-event-id" className="font-normal">
                        Evento
                    </Label>
                </div>
            </RadioGroup>
        </div>
    );
};

export default SidePanelFormType;
