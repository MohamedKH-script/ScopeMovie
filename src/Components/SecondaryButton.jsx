import React from "react";

function SecondaryButton({ name, onClick }) {
  return (
    <button
      onClick={onClick}
      className="h-9 rounded-lg px-4 text-[13px] font-semibold transition-colors hover:text-accent-hover border-line bg-surface/85 hover:border-accent"
    >
      {name}
    </button>
  )
}
export default SecondaryButton