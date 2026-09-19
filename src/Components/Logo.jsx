import React from "react";

function Logo(){
    return(
        <div className='logo'>
            <a href="/" className="inline-flex items-center gap-2.5">
            <img src="./logo.svg" alt="" className=' size-[30px]'/>
            <span className="text-xl font-bold tracking-tight">ScopeMovie</span>
            </a>
        </div>
    )
}
export default Logo