
const ToggleSwitch = ({ id, checked, onChange }: { id: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="toggle-switch">
            <input id={`cb-${id}`} type="checkbox"
                checked={checked}
                onChange={onChange} />
            <label htmlFor={`cb-${id}`}></label>
        </div>
    )
}

export default ToggleSwitch