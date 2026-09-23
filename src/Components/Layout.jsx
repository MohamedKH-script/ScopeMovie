import { Outlet , useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout(){
    const { pathname } = useLocation()
    const theme = pathname.startsWith("/tv") ? "tv" : "default"
    return(
        <div data-theme={theme}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout;