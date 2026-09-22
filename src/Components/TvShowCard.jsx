import NoPoster from "./NoPoster"

const IMG_BASE = "https://image.tmdb.org/t/p/w500"

function TvShowCard({
  tvShow: { name, vote_average, poster_path, first_air_date, original_language },
  className = "",
}) {
  const year = first_air_date ? new Date(first_air_date).getFullYear() : "N/A"

  return (
    <article className={`group min-w-0 ${className}`}>
      {/* Poster only */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-surface">
        {poster_path ? (
          <img
            src={`${IMG_BASE}${poster_path}`}
            alt={name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <NoPoster title={name} />
        )}
      </div>

      {/* Info goes OUTSIDE the poster div */}
      <div className="mt-3 flex items-center justify-between gap-2 text-xs">
        <span className="inline-flex items-center gap-1 font-semibold">
          <img src="/star.svg" alt="" className="size-3" />
          {vote_average ? vote_average.toFixed(1) : "N/A"}
        </span>
        <span className="uppercase text-muted">{original_language}</span>
      </div>

      <h3 className="mt-1.5 truncate text-sm font-bold text-white">{name}</h3>
      <p className="mt-0.5 text-xs text-dim">{year}</p>
    </article>
  )
}

export default TvShowCard