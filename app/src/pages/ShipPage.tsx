
import { Link } from 'react-router-dom'
import { Lock, Rocket } from 'lucide-react'
import { useTestChecklist } from '../hooks/useTestChecklist'

export function ShipPage() {
    const { isComplete } = useTestChecklist()

    if (!isComplete) {
        return (
            <section className="kn-ship-page">
                <div className="kn-ship-lock">
                    <span className="kn-ship-lock-icon">
                        <Lock size={64} color="var(--kn-accent)" />
                    </span>
                    <h1>Shipment Locked</h1>
                    <p className="kn-text-block" style={{ margin: '0 auto 24px' }}>
                        You cannot proceed to shipping until all verification tests have passed.
                        Please verify the system logic.
                    </p>
                    <Link to="/jt/07-test" className="kn-btn kn-btn-primary">
                        Go to Verification Checklist
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="kn-ship-page">
            <div className="kn-ship-success">
                <span className="kn-ship-lock-icon">
                    <Rocket size={64} color="var(--kn-success)" />
                </span>
                <h1>Ready to Ship! 🚀</h1>
                <p className="kn-text-block" style={{ margin: '0 auto 24px' }}>
                    All systems operational. The Job Notification Tracker is ready for deployment.
                </p>
                <div className="kn-prompt-actions" style={{ justifyContent: 'center' }}>
                    <button className="kn-btn kn-btn-primary" onClick={() => alert('Shipping sequence initiated... (Demo)')}>Start Deployment</button>
                </div>
            </div>
        </section>
    )
}
