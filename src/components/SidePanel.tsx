const SidePanel = ({ isSidePanelOpen, setIsSidePanelOpen }: { isSidePanelOpen: boolean, setIsSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                <input type="text" placeholder="Título" spellCheck />
                <label>Descrição</label>
                <textarea placeholder="Descrição"></textarea>
                <label>Começo</label>
                <input type="date" spellCheck />
                <label>Fim</label>
                <input type="date" spellCheck />
                <button>Criar</button>
            </form>
        </div>
    )
}

export default SidePanel