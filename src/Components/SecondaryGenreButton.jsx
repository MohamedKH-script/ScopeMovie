
function SecondaryGenreButton({ name , onClick}) {
  return (
    <button
      className="h-9 shrink-0 whitespace-nowrap rounded-full border border-line bg-surface/85 px-3 text-xs font-medium text-white transition-colors hover:border-accent sm:px-5 sm:text-[13px]"
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default SecondaryGenreButton