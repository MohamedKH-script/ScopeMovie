
function SecondaryGenreButton({ name , onClick}) {
  return (
    <button
      className=" mr-3 h-9 shrink-0 rounded-full border border-line bg-surface/85 px-5 text-[13px] font-medium text-white transition-colors hover:border-accent"
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default SecondaryGenreButton