import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../Context/AuthContext"
import Input from "../Components/Input"
import FormButton from "../Components/FormButton"

function SignUp() {
  const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6"
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setUser } = useAuth()
  const handleSubmit = async (e) => {
    e.preventDefault() // stops the browser from reloading the page
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error) // e.g. "That email is already registered"
        return
      }
      setUser(data)
      navigate("/") // signup logs you in, so go straight to the site
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-[560px] overflow-hidden bg-[radial-gradient(ellipse_at_70%_20%,#2a2050_0%,#12101f_45%,#0b0b10_100%)]">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/login-bg.png)" }} />
      <div className="absolute inset-0 bg-linear-to-b from-bg/25 via-bg/55 to-bg" />
      <div className={`${container} relative py-12 sm:py-[72px]`}>
        <div className="mx-auto w-full max-w-[416px] rounded-2xl border border-white/5 bg-[#101014] px-8 py-10 shadow-2xl shadow-black/60">
          <h1 className="text-center font-[Outfit,sans-serif] text-4xl font-bold tracking-tight text-white">Create Account</h1>
          <p className="mt-2 mb-2 text-center text-sm text-zinc-400">Join us to stream unlimited worlds</p>

          <form onSubmit={handleSubmit}>
            <Input type="email" name="email" label="EMAIL ADDRESS" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" name="password" label="PASSWORD" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" name="confirmPassword" label="CONFIRM PASSWORD" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

            <FormButton name={isSubmitting ? "Creating account..." : "Sign Up"} disabled={isSubmitting} />
          </form>

          <p className="mt-5 text-center text-sm text-zinc-400">
            Already have an account? <a href="/login" className="font-semibold text-[#a178ff] hover:underline">Sign in now</a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp