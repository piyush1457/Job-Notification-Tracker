
import { useTestChecklist } from '../hooks/useTestChecklist'

export function TestPage() {
    const {
        testItems,
        checkedItems,
        toggleCheck,
        resetChecklist,
        checkedCount,
        totalCount,
        isComplete,
    } = useTestChecklist()

    return (
        <section className="kn-test-page">
            <header className="kn-test-header">
                <h1>System Verification</h1>
                <div className="kn-test-status">
                    <span
                        className={`kn-test-count ${isComplete ? 'kn-test-count--success' : 'kn-test-count--warning'
                            }`}
                    >
                        Tests Passed: {checkedCount} / {totalCount}
                    </span>
                    <button onClick={resetChecklist} className="kn-btn kn-btn-secondary">
                        Reset Test Status
                    </button>
                </div>
                {!isComplete && (
                    <div className="kn-test-warning">
                        Resolve all issues before shipping.
                    </div>
                )}
            </header>

            <div className="kn-checklist">
                {testItems.map((item) => (
                    <label key={item.id} className="kn-checklist-item">
                        <input
                            type="checkbox"
                            checked={!!checkedItems[item.id]}
                            onChange={() => toggleCheck(item.id)}
                        />
                        <div className="kn-checklist-content">
                            <span className="kn-checklist-label">{item.label}</span>
                            {item.tooltip && (
                                <span className="kn-checklist-tooltip">{item.tooltip}</span>
                            )}
                        </div>
                    </label>
                ))}
            </div>
        </section>
    )
}
