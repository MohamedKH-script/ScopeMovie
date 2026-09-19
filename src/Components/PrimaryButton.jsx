import React from "react";

function PrimaryButton({name}){
    return(
        <button className="h-9 rounded-lg bg-accent px-[18px] text-[13px] font-semibold text-white transition hover:bg-accent-hover hover:shadow-[0_0_20px_rgb(124_92_255/0.4)]">
            {name}
          </button>
    )
}
export default PrimaryButton