import { Link } from "react-router-dom"

const navigationLinks = [
  { label: "Home", to: "/" },
  { label: "Movies", to: "/movies" },
  { label: "TV Shows", to: "/tv" },
]

const legalLinks = [
  { label: "Terms of use", to: "/terms-of-use" },
  { label: "Privacy policy", to: "/privacy-policy" },
  { label: "Cookie Choices", to: "/cookie-choices" },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-16 border-t border-line bg-surface/40">
      <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="max-w-md">
          <h2 className="text-xl font-bold tracking-tight">Scope Movie</h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Your gateway to infinite cinematic worlds. Experience personalized movie and television show recommendations powered by elite streaming metadata.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-sm font-semibold text-white">Navigation</h3>
          <div className="mt-4 flex flex-col items-start gap-3">
            {navigationLinks.map(({ label, to }) => (
              <Link key={label} to={to} className="text-sm text-muted transition-colors hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Legal navigation">
          <h3 className="text-sm font-semibold text-white">Legal</h3>
          <div className="mt-4 flex flex-col items-start gap-3">
            {legalLinks.map(({ label, to }) => (
              <Link key={label} to={to} className="text-sm text-muted transition-colors hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto w-full max-w-[1240px] px-4 py-5 text-xs text-dim sm:px-6">
          © {currentYear} ScopeMovie Inc. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
