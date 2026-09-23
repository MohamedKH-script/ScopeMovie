import { Link, useLocation } from "react-router-dom"

const legalTabs = [
  { label: "Terms of use", path: "/terms-of-use" },
  { label: "Privacy policy", path: "/privacy-policy" },
  { label: "Cookie Choices", path: "/cookie-choices" },
]

const legalContent = {
  "/terms-of-use": {
    title: "Terms of use",
    paragraphs: [
      "These terms describe the rules for using ScopeMovie and its recommendation features.",
      "By using ScopeMovie, you agree to use the service responsibly and respect the rights of the content providers and other users.",
    ],
  },
  "/privacy-policy": {
    title: "Privacy policy",
    paragraphs: [
      "We value your privacy and only use account and preference information to provide and improve your ScopeMovie experience.",
      "We do not sell your personal information. You can contact us with questions about your data or account at any time.",
    ],
  },
  "/cookie-choices": {
    title: "Cookie Choices",
    paragraphs: [
      "ScopeMovie uses essential cookies to keep you signed in and remember your preferences.",
      "You can manage optional cookie preferences through your browser settings. Disabling essential cookies may affect parts of the service.",
    ],
  },
}

function LegalPage() {
  const { pathname } = useLocation()
  const content = legalContent[pathname] || legalContent["/terms-of-use"]
  const currentYear = new Date().getFullYear()

  return (
    <main className="mx-auto min-h-[560px] w-full max-w-[1240px] px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">ScopeMovie</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{content.title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated {currentYear}</p>

        <nav aria-label="Legal pages" className="mt-8 flex flex-wrap gap-2 border-b border-line pb-3">
          {legalTabs.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                path === pathname ? "bg-accent text-on-accent" : "text-muted hover:bg-surface hover:text-white"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <section className="mt-8 space-y-5 text-sm leading-7 text-muted">
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      </div>
    </main>
  )
}

export default LegalPage
