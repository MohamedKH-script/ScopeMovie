import { NavLink } from "react-router-dom"
import Logo from "./Logo"
import SecondaryButton from './SecondaryButton'
import PrimaryButton from './PrimaryButton'

function Header(){
    const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    const NAV=[
        {label: 'Home' , to:'/'},
        {label: 'Movies' , to:'/movies'},
        {label: 'TV Shows' , to:'/tv'},
        {label: 'My List' , to:'/my-list'},
    ];
    return(
        <header className="sticky mt-4 top-0 z-50 h-[72px] border-b border-line bg-bg/80 backdrop-blur-xl">
            <div className={`${container} grid h-full grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_auto_1fr]`}>
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
            <div className="flex items-center justify-end gap-2">
                <SecondaryButton name="Sign In"/>
                <PrimaryButton name="Sign Up"/>
            </div>
            </div>
        </header>
    )
}
export default Header;