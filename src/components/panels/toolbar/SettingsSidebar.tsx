import { useSettingsStore } from "../../../store/settingsStore"

const SettingsSidebar = () => {
    const settings = useSettingsStore(state => state.settings)

    return (
        <div className="settings-sidebar">
            {settings.map((s, i) => <p key={i} onClick={() => useSettingsStore.setState({ settingsIndex: i })}>{s}</p>)}
            <button onClick={() => useSettingsStore.getState().resetSettings()}>Reset settings</button>
        </div>
    )
}

export default SettingsSidebar