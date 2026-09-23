import { useState } from "react"
import NoPoster from "./NoPoster"
import { addFavorite, removeFavorite } from "../api/favorites"

const IMG_BASE = "https://image.tmdb.org/t/p/w500"
const MEDIA_TYPE = "movie"

function HeartIcon({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s-6.7-4.35-9.3-8.1C.8 9.9 1.6 6.4 4.6 5.1c2.1-.9 4.3-.1 5.6 1.7l1.8 2.4 1.8-2.4c1.3-1.8 3.5-2.6 5.6-1.7 3 1.3 3.8 4.8 1.9 7.8C18.7 16.65 12 21 12 21z"
      />
    </svg>
  )
}

function MovieCard({
  movie: { id, title, vote_average, poster_path, release_date, original_language, is_favorite },
  className = "",
}) {
  const [liked, setLiked] = useState(!!is_favorite)
  const [pending, setPending] = useState(false)
  const year = release_date ? new Date(release_date).getFullYear() : "N/A"

  const toggleLike = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (pending) return

    const next = !liked
    setLiked(next) 
    setPending(true)

    try {
      if (next) {
        await addFavorite(MEDIA_TYPE, { id, title, poster_path, vote_average, release_date, original_language })
      } else {
        await removeFavorite(MEDIA_TYPE, id)
      }
    } catch (err) {
      setLiked(!next) 
      console.error(err)
    } finally {
      setPending(false)
    }
  }

  return (
    <article className={`group min-w-0 ${className}`}>
      
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-surface">
        {poster_path ? (
          <img
            src={`${IMG_BASE}${poster_path}`}
            alt={title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <NoPoster title={title} />
        )}

        
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={toggleLike}
            disabled={pending}
            aria-label={liked ? "Unlike" : "Like"}
            className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-sm transition-transform duration-200 hover:scale-110 active:scale-95 disabled:opacity-60 ${
              liked ? "bg-red-500 text-white" : "bg-white/15 text-white hover:bg-white/25"
            }`}
          >
            <HeartIcon filled={liked} />
          </button>
        </div>

        {liked && (
          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white">
            <HeartIcon filled />
          </span>
        )}
      </div>

      
      <div className="mt-3 flex items-center justify-between gap-2 text-xs">
        <span className="inline-flex items-center gap-1 font-semibold">
          <img src="/star.svg" alt="" className="size-3" />
          {vote_average ? vote_average.toFixed(1) : "N/A"}
        </span>
        <span className="uppercase text-muted">{original_language}</span>
      </div>

      <h3 className="mt-1.5 truncate text-sm font-bold text-white">{title}</h3>
      <p className="mt-0.5 text-xs text-dim">{year}</p>
    </article>
  )
}

export default MovieCard