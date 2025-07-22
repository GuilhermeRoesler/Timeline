const Toolbar = () => {
    return (
        <div
            style={{
                position: "fixed",
                top: 20,
                left: 20,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                borderRadius: 8,
                padding: "12px 24px",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                gap: "16px",
                fontFamily: 'Poppins'
            }}
        >
            <span style={{ fontWeight: "bold", fontSize: 18, color: "#333" }}>Timeline</span>
            <button>Criar</button>
            <button>Salvar</button>
        </div>
    )
}

export default Toolbar