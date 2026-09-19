import React from "react";
function NoPoster(){ 
    return (
    <div className="flex size-full flex-col items-center justify-center gap-3 bg-linear-to-br from-accent/20 via-surface to-bg p-4 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-10 text-accent/70"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4" />
      </svg>
      <span className="text-[10px] uppercase tracking-wider text-dim">No poster</span>
    </div>
  )
}
export default NoPoster