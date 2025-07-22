const Toolbar = ({ setIsSidePanelOpen }: { setIsSidePanelOpen: (isSidePanelOpen: boolean) => void }) => {
    return (
        <div className="toolbar">
            <span style={{ fontWeight: "bold", fontSize: 24, color: "#333" }}>Timeline</span>
            <button onClick={() => setIsSidePanelOpen(true)}>Criar</button>
            <button>Salvar</button>
        </div>
    )
}

export default Toolbar