import { useSettingsStore } from "../../../store/settingsStore"
import { themeNames } from "../../../data/theme"
import { colorize } from "../../../utils/colorUtils"

const SettingsBody = () => {
    const { settingsIndex, BASE_YEAR, EVENT_RADIUS, PERIOD_HEIGHT, LEVEL_SPACING, COLORIZE_ON_CREATE } = useSettingsStore(state => state)

    const switchTheme = (index: number) => {
        useSettingsStore.setState({ THEME_INDEX: index })
        colorize();
    }

    if (settingsIndex === 0)
        return (
            <div className="settings-body">
                <h3 className="group">General Settings</h3>
                <div className="setting-item">
                    <p className="title">Base Year:</p>
                    <input type="number"
                        value={BASE_YEAR}
                        onChange={(e) => useSettingsStore.setState({ BASE_YEAR: Number(e.target.value) })} />
                    <p className="description">Ano padrão para renderização da Timeline</p>
                </div>
            </div>
        )

    if (settingsIndex === 1)
        return (
            <div className="settings-body">
                <h3 className="group">Events</h3>
                <div className="setting-item">
                    <p className="title">Event Radius:</p>
                    <input type="range" min={5} max={40} step={5}
                        value={EVENT_RADIUS}
                        onChange={(e) => useSettingsStore.setState({ EVENT_RADIUS: Number(e.target.value) })} />
                    <p className="description">Tamanho do evento</p>
                </div>
            </div>
        )

    if (settingsIndex === 2)
        return (
            <div className="settings-body">
                <h3 className="group">Periods</h3>
                <div className="setting-item">
                    <p className="title">Period Height:</p>
                    <input type="range" min={40} max={140} step={5}
                        value={PERIOD_HEIGHT}
                        onChange={(e) => useSettingsStore.setState({ PERIOD_HEIGHT: Number(e.target.value) })} />
                    <p className="description">Tamanho dos períodos</p>
                </div>
                <div className="setting-item">
                    <p className="title">Level Spacing:</p>
                    <input type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={LEVEL_SPACING}
                        onChange={(e) => useSettingsStore.setState({ LEVEL_SPACING: Number(e.target.value) })}
                    />
                    <p className="description">Espaçamento entre os períodos</p>
                </div>
            </div>
        )

    if (settingsIndex === 3)
        return (
            <div className="settings-body">
                <h3 className="group">Color Settings</h3>
                <div className="setting-item">
                    <p className="title">Colorize on create:</p>
                    <div className="checkbox-wrapper">
                        <input id="cb1" type="checkbox"
                            checked={COLORIZE_ON_CREATE}
                            onChange={(e) => useSettingsStore.setState({ COLORIZE_ON_CREATE: e.target.checked })} />
                        <label htmlFor="cb1"></label>
                    </div>
                    <p className="description">Auto colorir ao criar períodos</p>
                </div>
                <div className="setting-item">
                    <p className="title">Theme:</p>
                    <select name="theme" id="settings-theme-id" onChange={(e) => switchTheme(e.target.selectedIndex)}
                        value={themeNames[useSettingsStore.getState().THEME_INDEX]}>
                        {themeNames.map((theme, index) => (
                            <option key={index} value={theme}>{theme}</option>
                        ))}
                    </select>
                    <p className="description">Tema aplicado aos períodos e eventos</p>
                </div>
            </div>
        )
}

export default SettingsBody