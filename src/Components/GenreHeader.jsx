import { ChevronRight } from "lucide-react"

function GenreHeader({ name, onSeeAll }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="h-7 w-1 rounded-full bg-accent shadow-[0_0_12px_rgb(124_92_255/0.6)]" />

      <h2 className="text-2xl font-bold tracking-tight">{name}</h2>

      <div className="h-px flex-1 bg-linear-to-r from-line to-transparent" />
      {onSeeAll && (
        <button
          onClick={onSeeAll}
          className="group inline-flex items-center gap-1 text-[13px] font-medium text-muted transition-colors hover:text-white"
        >
          See all
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      )}
    </div>
  )
}

export default GenreHeader