import { useEffect, useState } from "react"
import { Clapperboard, Tv, Info } from "lucide-react"
import { useAuth } from "../Context/AuthContext"
import ListLogIn from "../Components/ListLogIn"
import SavedItemCard from "../Components/SavedItemCard"
import GenreHeader from "../Components/GenreHeader"
import PrimaryGenreButton from "../Components/PrimaryGenreButton"
import SecondaryGenreButton from "../Components/SecondaryGenreButton"
import Spinner from "../Components/Spinner"

function MyList() {
  const { user } = useAuth()
  const container = "mx-auto w-full max-w-[1240px] px-4 sm:px-6"

  const [favorites, setFavorites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [filter, setFilter] = useState("all") // "all" | "movie" | "tv"

  useEffect(() => {
    if (!user) return // don't fetch until we know someone's logged in

    const load = async () => {
      setIsLoading(true)
      try {
        const res = await fetch("/api/favorites")
        if (!res.ok) throw new Error("Failed to load your list")
        setFavorites(await res.json())
      } catch (err) {
        setErrorMessage("Couldn't load your list. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [user])

  const removeItem = async (item) => {
    // update the screen immediately, then tell the server
    setFavorites((prev) =>
      prev.filter((f) => !(f.tmdb_id === item.tmdb_id && f.media_type === item.media_type))
    )
    await fetch(`/api/favorites/${item.media_type}/${item.tmdb_id}`, { method: "DELETE" })
  }

  if (!user) return <ListLogIn />
  if (isLoading) return <Spinner />

  const movies = favorites.filter((f) => f.media_type === "movie")
  const tvShows = favorites.filter((f) => f.media_type === "tv")
  const visible =
    filter === "movie" ? movies : filter === "tv" ? tvShows : favorites

  const grid = (items) => (
    <div className="grid grid-cols-1 gap-x-3 gap-y-8 min-[400px]:grid-cols-2 sm:gap-x-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {items.map((item) => (
        <SavedItemCard key={`${item.media_type}-${item.tmdb_id}`} item={item} onRemove={removeItem} />
      ))}
    </div>
  )

  return (
    <main className={`${container} py-10`}>
      {/* Title + tabs */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">My List</h1>
          <p className="mt-1 text-sm text-muted">Your saved movies and TV shows</p>
        </div>

        <div className="flex gap-2">
          {[
            { key: "all", label: `All (${favorites.length})` },
            { key: "movie", label: `Movies (${movies.length})` },
            { key: "tv", label: `TV Shows (${tvShows.length})` },
          ].map(({ key, label }) =>
            filter === key ? (
              <PrimaryGenreButton key={key} name={label} onClick={() => setFilter(key)} />
            ) : (
              <SecondaryGenreButton key={key} name={label} onClick={() => setFilter(key)} />
            )
          )}
        </div>
      </div>

      {errorMessage && <p className="mb-6 text-red-500">{errorMessage}</p>}

      {favorites.length === 0 ? (
        <div className="flex items-center gap-2 rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-muted">
          <Info className="size-4 shrink-0 text-accent" />
          Tip: Browse movies and shows to add to your list.{" "}
          <a href="/movies" className="font-semibold text-accent hover:underline">
            Explore Movies →
          </a>
        </div>
      ) : filter === "all" ? (
        <>
          {movies.length > 0 && (
            <div className="mb-12">
              <GenreHeader name="Saved Movies" icon={Clapperboard} />
              {grid(movies)}
            </div>
          )}
          {tvShows.length > 0 && (
            <div>
              <GenreHeader name="Saved TV Shows" icon={Tv} />
              {grid(tvShows)}
            </div>
          )}
        </>
      ) : (
        grid(visible)
      )}
    </main>
  )
}

export default MyList