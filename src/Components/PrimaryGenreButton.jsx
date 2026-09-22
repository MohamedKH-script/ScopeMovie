
function PrimaryGenreButton({ name , onClick}) {
  return (
    <button
      className=" mr-3 h-9 shrink-0 rounded-full bg-accent px-5 text-[13px] font-semibold text-on-accent transition hover:bg-accent-hover hover:shadow-[0_0_20px_rgb(124_92_255/0.4)]"
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default PrimaryGenreButton