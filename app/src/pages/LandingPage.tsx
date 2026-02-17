import { Link } from 'react-router-dom'

export function LandingPage() {
  return (
    <section className="kn-landing">
      <h1 className="kn-landing-headline">Stop Missing The Right Jobs.</h1>
      <p className="kn-landing-subtext">
        Precision-matched job discovery delivered daily at 9AM.
      </p>
      <Link to="/settings" className="kn-btn kn-btn-primary">
        Start Tracking
      </Link>
    </section>
  )
}
