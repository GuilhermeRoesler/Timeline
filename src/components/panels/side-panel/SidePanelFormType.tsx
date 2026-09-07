import { useSidePanelStore } from '@/store/sidePanelStore';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SidePanelFormType = () => {
    const selectedType = useSidePanelStore((state) => state.selectedType);

    return (
        <Tabs
            value={selectedType}
            onValueChange={(value) => {
                if (value === 'period' || value === 'event') {
                    useSidePanelStore.setState({ selectedType: value });
                }
            }}
            className="w-full gap-0"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="period">Período</TabsTrigger>
                <TabsTrigger value="event">Evento</TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default SidePanelFormType;
