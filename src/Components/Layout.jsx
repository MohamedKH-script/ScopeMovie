import { Outlet , useLocation } from "react-router-dom";
import Header from "./Header";

function Layout(){
    const { pathname } = useLocation()
    const theme = pathname.startsWith("/tv") ? "tv" : "default"
    return(
        <div data-theme={theme}>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout;