import { Sparkles } from 'lucide-react';
import { generateText } from '@/services/geminiService';
import { useSidePanelStore } from '@/store/sidePanelStore';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const Description = () => {
    const titleValue = useSidePanelStore((state) => state.titleValue);
    const descriptionValue = useSidePanelStore((state) => state.descriptionValue);

    const handleGenerate = async () => {
        useSidePanelStore.setState({ descriptionValue: 'Gerando, aguarde um momento...' });
        const generatedAnswer = await generateText(titleValue);
        useSidePanelStore.setState({ descriptionValue: generatedAnswer });
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor="side-panel-description-id">Descrição</Label>
                <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    onClick={handleGenerate}
                    title="Gerar com IA"
                >
                    <Sparkles className="h-4 w-4" />
                </Button>
            </div>
            <Textarea
                name="description"
                id="side-panel-description-id"
                placeholder="Descrição (opcional)"
                value={descriptionValue}
                onChange={(e) => useSidePanelStore.setState({ descriptionValue: e.target.value })}
            />
        </div>
    );
};

export default Description;
