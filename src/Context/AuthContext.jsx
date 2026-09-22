import { createContext, useContext, useEffect, useState } from "react"
const AuthContext = createContext(null)

export function AuthProvider({children}){
    const [user, setUser] = useState(null)       // null = logged out, object = logged in
    const [isLoading, setIsLoading] = useState(true)

    // On first load, ask the server if we already have a valid session
    useEffect(() => {
        fetch("/api/me")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => setUser(data))
        .finally(() => setIsLoading(false))
    }, [])

    const logout = async () => {
        await fetch("/api/logout", { method: "POST" })
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
  return useContext(AuthContext)
}