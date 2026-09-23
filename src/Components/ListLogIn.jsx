import { Link } from "react-router-dom"
function ListLogIn(){
    const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6"
    return(
        <section className="relative min-h-[560px] overflow-hidden bg-[radial-gradient(ellipse_at_70%_20%,#2a2050_0%,#12101f_45%,#0b0b10_100%)]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/login-bg.png)" }} />
            <div className="absolute inset-0 bg-linear-to-b from-bg/25 via-bg/55 to-bg" />
            <div className={`${container} relative py-12 sm:py-[72px]`}>
                <div className="mx-auto w-full max-w-[416px] rounded-2xl border border-white/5 bg-[#101014] px-8 py-10 shadow-2xl shadow-black/60">
                <h1 className="text-center font-[Outfit,sans-serif] text-4xl font-bold tracking-tight text-white">Sign In Required</h1>
                <p className="mt-2 mb-2 text-center text-sm text-zinc-400">Please <Link to="/login" className="font-semibold text-[#a178ff] hover:underline">Sign In</Link> to view your list</p>
                </div>
            </div>
        </section>
    )
}

export default ListLogIn;