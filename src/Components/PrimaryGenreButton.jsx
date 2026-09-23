
function PrimaryGenreButton({ name , onClick}) {
  return (
    <button
      className="h-9 shrink-0 whitespace-nowrap rounded-full bg-accent px-3 text-xs font-semibold text-on-accent transition hover:bg-accent-hover hover:shadow-[0_0_20px_rgb(124_92_255/0.4)] sm:px-5 sm:text-[13px]"
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default PrimaryGenreButton