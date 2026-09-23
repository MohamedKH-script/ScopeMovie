import { useState } from "react"
import { NavLink , Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useAuth } from "../Context/AuthContext"
import Logo from "./Logo"
import MobileMenu from "./MobileMenu"
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'

function Header(){
    const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    const [menuOpen, setMenuOpen] = useState(false)
    const NAV=[
        {label: 'Home' , to:'/'},
        {label: 'Movies' , to:'/movies'},
        {label: 'TV Shows' , to:'/tv'},
        {label: 'My List' , to:'/my-list'},
    ];
    const {user , isLoading , logout}=useAuth()
    return(
        <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
            <div className={`${container} grid min-h-[72px] items-center grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr]`}>
            <Logo />
            <nav className="hidden items-center gap-8 lg:flex">
                {NAV.map(({label, to}) => (
                <NavLink
                    key={label}
                    to={to}
                    end={to === "/"}
                    className={({ isActive })=> `text-[13px] font-medium transition-colors hover:text-white ${
                    isActive ? "text-white" : "text-muted"
                    }`}
                >
                    {label}
                </NavLink>
                ))}
            </nav>
            <div className="hidden items-center justify-end gap-2 lg:flex">
                {isLoading ? null : user ? (
                    <>
                    <span className="text-[13px] text-muted">{user.email}</span>
                    <SecondaryButton name="Log out" onClick={logout} />
                    </>
                ) : (
                    <>
                    <Link to="/login"><SecondaryButton name="Sign In" /></Link>
                    <Link to="/signup"><PrimaryButton name="Sign Up" /></Link>
                    </>
                )}
            </div>
            <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                className="flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-white lg:hidden"
            >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            </div>
            {menuOpen && (
                <MobileMenu
                    nav={NAV}
                    user={user}
                    isLoading={isLoading}
                    logout={logout}
                    onNavigate={() => setMenuOpen(false)}
                />
            )}
        </header>
    )
}
export default Header;