// Components/SavedItemCard.jsx
function SavedItemCard({ item, onRemove }) {
  const IMG_BASE = "https://image.tmdb.org/t/p/w500"
  const year = item.release_date ? new Date(item.release_date).getFullYear() : "N/A"

  return (
    <article className="group min-w-0">
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-surface">
        <span className="absolute left-2.5 top-2.5 z-20 rounded-md bg-bg/75 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-sm">
          {item.media_type === "tv" ? "TV Show" : "Movie"}
        </span>

        {item.poster_path && (
          <img
            src={`${IMG_BASE}${item.poster_path}`}
            alt={item.title}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <button
          onClick={() => onRemove(item)}
          className="absolute inset-0 z-10 flex items-center justify-center bg-bg/70 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <span className="rounded-lg bg-red-500/90 px-4 py-2 text-xs font-semibold text-white">
            Remove
          </span>
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 text-xs">
        <span className="inline-flex items-center gap-1 font-semibold">
          <img src="/star.svg" alt="" className="size-3" />
          {item.vote_average ? Number(item.vote_average).toFixed(1) : "N/A"}
        </span>
        <span className="uppercase text-muted">{item.original_language}</span>
      </div>

      <h3 className="mt-1.5 truncate text-sm font-bold text-white">{item.title}</h3>
      <p className="mt-0.5 text-xs text-dim">{year}</p>
    </article>
  )
}

export default SavedItemCard