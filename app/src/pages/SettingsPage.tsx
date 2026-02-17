export function SettingsPage() {
  return (
    <section className="kn-settings-page">
      <h1>Settings</h1>
      <p className="kn-placeholder-subtext" style={{ marginBottom: 'var(--kn-space-lg)' }}>
        Configure your job preferences. Logic will be added in the next step.
      </p>

      <div className="kn-settings-form">
        <div className="kn-form-field">
          <label className="kn-form-label">Role keywords</label>
          <input
            className="kn-input"
            type="text"
            placeholder="e.g. Frontend, React, Product Manager"
          />
        </div>

        <div className="kn-form-field">
          <label className="kn-form-label">Preferred locations</label>
          <input
            className="kn-input"
            type="text"
            placeholder="e.g. San Francisco, Remote"
          />
        </div>

        <div className="kn-form-field">
          <label className="kn-form-label">Mode</label>
          <select className="kn-input kn-select">
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Onsite</option>
          </select>
        </div>

        <div className="kn-form-field">
          <label className="kn-form-label">Experience level</label>
          <input
            className="kn-input"
            type="text"
            placeholder="e.g. Mid-level, Senior"
          />
        </div>
      </div>
    </section>
  )
}
