export function App() {
  return (
    <div className="kn-app-shell">
      <header className="kn-top-bar">
        <div className="kn-top-bar-left">KodNest — Dashboard Builder</div>
        <div className="kn-top-bar-center">Step 2 / 5</div>
        <div className="kn-top-bar-right">
          <span className="kn-status-badge kn-status-badge--progress">In Progress</span>
        </div>
      </header>

      <section className="kn-context-header">
        <h1>Define your data model</h1>
        <p className="kn-text-block">
          Add the fields and relationships your dashboard needs. Start with the core entities.
        </p>
      </section>

      <main className="kn-workspace-layout">
        <div className="kn-workspace-primary">
          <div className="kn-card" style={{ marginBottom: 'var(--kn-space-sm)' }}>
            <h3 style={{ margin: '0 0 var(--kn-space-sm)' }}>Schema</h3>
            <input
              className="kn-input"
              type="text"
              placeholder="Entity name (e.g. Customer, Order)"
              style={{ marginBottom: 'var(--kn-space-sm)' }}
            />
            <p style={{ margin: 0, fontSize: 'var(--kn-size-caption)', color: 'var(--kn-text-muted)' }}>
              Add fields and relationships in the panel to the right.
            </p>
          </div>
        </div>

        <div className="kn-workspace-secondary">
          <div className="kn-panel">
            <div className="kn-panel-title">Prompt for Lovable</div>
            <p style={{ margin: '0 0 var(--kn-space-sm)', fontSize: 'var(--kn-size-caption)' }}>
              Copy and paste this into Lovable to generate your schema.
            </p>
            <div className="kn-prompt-box">{`Create a data model for:
- Customer (id, name, email)
- Order (id, customerId, total)`}</div>
            <div className="kn-prompt-actions">
              <button className="kn-btn kn-btn-primary">Copy</button>
              <button className="kn-btn kn-btn-secondary">Build in Lovable</button>
              <button className="kn-btn kn-btn-secondary">It Worked</button>
              <button className="kn-btn kn-btn-secondary">Error</button>
              <button className="kn-btn kn-btn-secondary">Add Screenshot</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="kn-proof-footer">
        <label className="kn-proof-item">
          <input type="checkbox" /> UI Built
        </label>
        <label className="kn-proof-item">
          <input type="checkbox" /> Logic Working
        </label>
        <label className="kn-proof-item">
          <input type="checkbox" /> Test Passed
        </label>
        <label className="kn-proof-item">
          <input type="checkbox" /> Deployed
        </label>
      </footer>
    </div>
  )
}
