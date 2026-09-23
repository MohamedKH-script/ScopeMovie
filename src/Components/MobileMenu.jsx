import { NavLink, Link } from "react-router-dom"
import SecondaryButton from "./SecondaryButton"
import PrimaryButton from "./PrimaryButton"

function MobileMenu({ nav, user, isLoading, logout, onNavigate }) {
  return (
    <div className="border-t border-line lg:hidden">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-1 px-4 py-3 sm:px-6">
        {nav.map(({ label, to }) => (
          <NavLink
            key={label}
            to={to}
            end={to === "/"}
            onClick={onNavigate}
            className={({ isActive }) => `rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-surface hover:text-white ${
              isActive ? "bg-surface text-white" : "text-muted"
            }`}
          >
            {label}
          </NavLink>
        ))}
        {!isLoading && (
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-line pt-3">
            {user ? (
              <>
                <span className="min-w-0 flex-1 truncate px-3 text-sm text-muted">{user.email}</span>
                <SecondaryButton name="Log out" onClick={logout} />
              </>
            ) : (
              <>
                <Link to="/login" onClick={onNavigate}>
                  <SecondaryButton name="Sign In" />
                </Link>
                <Link to="/signup" onClick={onNavigate}>
                  <PrimaryButton name="Sign Up" />
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileMenu
