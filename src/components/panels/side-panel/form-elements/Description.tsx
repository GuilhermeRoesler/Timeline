import { Sparkles } from "lucide-react";
import { generateText } from "../../../../services/cohereService"
import { useSidePanelStore } from "../../../../store/sidePanelStore"

const Description = () => {
    const titleValue = useSidePanelStore(state => state.titleValue)
    const descriptionValue = useSidePanelStore(state => state.descriptionValue)

    const handleGenerate = async () => {
        useSidePanelStore.setState({ descriptionValue: "Gerando, aguarde um momento..." })
        const generatedAnswer = await generateText(titleValue)
        useSidePanelStore.setState({ descriptionValue: generatedAnswer })
    }

    return (
        <>
            <div>
                <label htmlFor="side-panel-description-id">Descrição</label>
                <button type="button" onClick={handleGenerate} className="ml-2 p-1 border rounded-md hover:bg-gray-200 transition-colors -translate-y-0.5">
                    <Sparkles className="w-4 h-4" />
                </button>
            </div>
            <textarea name="description" id="side-panel-description-id" placeholder="Descrição (opcional)"
                value={descriptionValue} onChange={(e) => useSidePanelStore.setState({ descriptionValue: e.target.value })}></textarea>
        </>
    )
}

export default Description;