const SidePanel = ({ isSidePanelOpen, setIsSidePanelOpen }: { isSidePanelOpen: boolean, setIsSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const periods = localStorage.getItem('periods');
        const newPeriod = {
            title: (e.currentTarget.elements.namedItem('title') as HTMLInputElement).value,
            description: (e.currentTarget.elements.namedItem('description') as HTMLInputElement).value,
            start: Number((e.currentTarget.elements.namedItem('start') as HTMLInputElement).value),
            end: Number((e.currentTarget.elements.namedItem('end') as HTMLInputElement).value),
            color: (e.currentTarget.elements.namedItem('color') as HTMLInputElement).value,
        }

        if (periods) {
            const periodsArray = JSON.parse(periods);
            periodsArray.push(newPeriod);
            localStorage.setItem('periods', JSON.stringify(periodsArray));
        } else {
            localStorage.setItem('periods', JSON.stringify([newPeriod]));
        }
        e.currentTarget.reset();
        alert('Período adicionado com sucesso!');

        setIsSidePanelOpen(false);
    }

    return (
        <div className="side-panel"
            style={{ translate: isSidePanelOpen ? "0" : "100%" }}
        >
            <div className="open-close-area" onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
                <i className={`fa-solid fa-chevron-${isSidePanelOpen ? 'right' : 'left'}`}></i>
            </div>
            <i className="fa-solid fa-xmark"></i>
            <form onSubmit={handleSubmit}>
                <h2>Adicionar</h2>
                <label>Título</label>
                <input type="text" name="title" placeholder="Título" spellCheck={false} required />
                <label>Descrição</label>
                <textarea name="description" placeholder="Descrição"></textarea>
                <label>Começo</label>
                <input type="number" name="start" spellCheck={false} required />
                <label>Fim</label>
                <input type="number" name="end" spellCheck={false} required />
                <label>Cor</label>
                <input type="color" name="color" />
                <button>Criar</button>
            </form>
        </div>
    )
}

export default SidePanel